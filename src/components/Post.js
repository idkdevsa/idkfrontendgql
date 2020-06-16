import React, { useState, useEffect } from "react";
import { withApollo, useQuery } from "react-apollo";
import gql from "graphql-tag";
import {
  PostLayout,
  RenderHtml,
  RenderTags,
  RenderLoader,
} from "./VsCodeSkin/VsCodeComponents";

/**
 * GraphQL post query that takes a post slug as a filter
 * Returns the title, content and author of the post
 */
const POST_QUERY = gql`
  query PostQuery($filter: String!) {
    postBy(slug: $filter) {
      title
      date
      content
      featuredImage {
        id
        sourceUrl
        altText
      }
      author {
        name
      }
      tags {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;

/**
 * Fetch and display a Post
 */
const Post = (props) => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    date: "",
    author: {
      name: "",
    },
    tags: {
      edges: [],
    },
    featuredImage: {
      id: "",
      sourceUrl: "",
      altText: "",
    },
  });

  /**
   * Execute post query, process the response and set the state
   */

  const { match } = props;
  const filter = match.params.slug;
  const { data, loading, error } = useQuery(POST_QUERY, {
    variables: { filter },
  });

  useEffect(() => {
    if (!loading && data) {
      setPost(data.postBy);
    }
  }, [loading, data]);

  const RenderData = () => {
    if (loading) return <RenderLoader />;
    if (error) return <p>{console.log(error)}</p>;
    if (!data) return <p>Not found</p>;

    return (
      <PostLayout
        featuredImage={post.featuredImage.sourceUrl}
        title={post.title}
        subtitle={`Last updated ${post.date.split("T")}`}
        author={`By ${post.author.name}`}
        content={RenderHtml(post.content)}
        tags={RenderTags(TagArray(post.tags))}
      />
    );
  };

  // get current posts tags in an array
  const TagArray = (tags) => {
    const tagNodes = tags.edges.map((edge) => edge.node);
    return tagNodes.map((tag) => tag.name);
  };

  return RenderData();
};

export default withApollo(Post);
