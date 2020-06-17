import React, { useState, useEffect } from "react";
import { withApollo, useQuery } from "react-apollo";
import gql from "graphql-tag";
import {
  PostCardLayout,
  PostCard,
  RenderTags,
  RenderLoader,
} from "./VsCodeSkin/VsCodeComponents";

/**
 * GraphQL category query that takes a category slug as a filter
 * Returns the posts belonging to the category and the category name and ID
 */
const CATEGORY_QUERY = gql`
  query CategoryQuery($filter: String!) {
    posts(where: { categoryName: $filter }) {
      edges {
        node {
          title
          slug
          excerpt
          featuredImage {
            id
            sourceUrl
            altText
          }
          tags {
            edges {
              node {
                tagId
                name
              }
            }
          }
        }
      }
    }
    categories(where: { slug: [$filter] }) {
      edges {
        node {
          name
          categoryId
          children {
            nodes {
              id
              name
              children {
                nodes {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Fetch and display a Category
 */
const Category = (props) => {
  const [category, setCategory] = useState({ name: "", posts: [] });

  /**
   * Execute the category query, parse the result and set the state
   */
  const { match } = props;
  const filter = match.params.slug;
  const { data, loading, error } = useQuery(CATEGORY_QUERY, {
    variables: { filter },
  });

  useEffect(() => {
    if (!loading && data) {
      let name = data.categories.edges[0].node.name;
      let posts = data.posts.edges;
      posts = posts.map((post) => {
        const finalLink = `/post/${post.node.slug}`;
        const modifiedPost = { ...post };
        modifiedPost.node.link = finalLink;
        return modifiedPost;
      });
      setCategory({ name, posts } || { name: "", posts: [] });
    }
  }, [loading, data]);

  // get the current posts tags in an array
  const TagArray = (tags) => {
    const tagNodes = tags.edges.map((edge) => edge.node);
    return tagNodes.map((tag) => tag.name);
  };

  const RenderData = () => {
    if (loading) return <RenderLoader />;
    if (error) return <p>{console.log(error)}</p>;
    if (!data) return <p>Not found</p>;

    return (
      <>
        <PostCardLayout title={category.name}>
          {category.posts.map((post, index) => (
            <PostCard
              key={post.node.slug}
              title={post.node.title}
              titleLink={post.node.link}
              description={post.node.excerpt}
              imgSrc={post.node.featuredImage.sourceUrl}
              alt={post.node.title}
              tags={RenderTags(TagArray(post.node.tags))}
            />
          ))}
        </PostCardLayout>
      </>
    );
  };

  return RenderData();
};

export default withApollo(Category);
