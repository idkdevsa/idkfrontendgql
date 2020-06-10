import React, { Component, useState, useEffect } from 'react';
import { withApollo, useApolloClient } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

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
        }
      }
    }
    categories(where: { slug: [$filter] }) {
      edges {
        node {
          name
          categoryId
        }
      }
    }
  }
`;

const useCategory = props => {
  const [category, setCategory] = useState({
    category: { name: '', posts: [] },
  });

  console.log(props);

  useEffect(() => {
    const executeCategoryQuery = async () => {
      try {
        const { match, client } = props;
        const filter = match.params.slug;
        const result = await client.query({
          query: CATEGORY_QUERY,
          variables: { filter },
        });
        console.log(result);
        const { name } = result.data.categories.edges[0].node;
        let posts = result.data.posts.edges;
        posts = posts.map(post => {
          const finalLink = `/post/${post.node.slug}`;
          const modifiedPost = { ...post };
          modifiedPost.node.link = finalLink;
          return modifiedPost;
        });
        const category = {
          name,
          posts,
        };
        setCategory({ category });
      } catch (error) {
        console.log(error);
      }
    };
    executeCategoryQuery();
  }, [props]);

  return [{ category }];
};

export default useCategory;
