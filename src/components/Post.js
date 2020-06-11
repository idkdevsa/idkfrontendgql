import React, { useState, useEffect } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import useLoadingSpinner from "./useLoadingSpinner";
import { PostLayout, RenderHtml } from "./VsCodeSkin/VsCodeComponents";

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
    featuredImage: {
      id: "",
      sourceUrl: "",
      altText: "",
    },
  });

  const [{ isLoading }, renderSpin, handleLoading] = useLoadingSpinner();

  /**
   * Execute post query, process the response and set the state
   */

  useEffect(() => {
    const executePostQuery = async () => {
      handleLoading(true);

      const { match, client } = props;
      const filter = match.params.slug;
      try {
        const result = await client.query({
          query: POST_QUERY,
          variables: { filter },
        });
        setPost(result.data.postBy);
        handleLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    executePostQuery();
  }, [props]);

  return (
    <PostLayout
      featuredImage={post.featuredImage.sourceUrl}
      title={post.title}
      subtitle={`Last updated ${post.date.split("T")}`}
      author={`By ${post.author.name}`}
      content={RenderHtml(post.content)}
    />
  );
};

export default withApollo(Post);
