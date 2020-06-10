import React, { useState, useEffect } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import { Card, Row, Col, Divider } from 'antd';
import useLoadingSpinner from './useLoadingSpinner';

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
const Category = props => {
  const [category, setCategory] = useState({ name: '', posts: [] });

  const [{ isLoading }, renderSpin, handleLoading] = useLoadingSpinner();

  /**
   * Execute the category query, parse the result and set the state
   */

  useEffect(() => {
    const executeCategoryQuery = async () => {
      handleLoading(true);
      const { match, client } = props;
      const filter = match.params.slug;
      try {
        const result = await client.query({
          query: CATEGORY_QUERY,
          variables: { filter },
        });
        let name = result.data.categories.edges[0].node.name;
        let posts = result.data.posts.edges;
        posts = posts.map(post => {
          const finalLink = `/post/${post.node.slug}`;
          const modifiedPost = { ...post };
          modifiedPost.node.link = finalLink;
          return modifiedPost;
        });
        setCategory({ name, posts } || { name: '', posts: [] });
        handleLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    executeCategoryQuery();
  }, [props]);

  const renderCardTitle = ({ link, title }) => {
    return <Link to={link}>{title}</Link>;
  };

  return (
    <Card className="card-post-category">
      <h1>{category.name}</h1>
      <Divider style={{ border: 0 }} />
      {renderSpin()}
      <Row>
        <Col xs={24} sm={24} md={{ span: 20, push: 2 }}>
          <Row>
            {category.posts.map((post, index) => (
              <Col key={index} xs={24} sm={24} md={12}>
                <Card
                  title={renderCardTitle({
                    link: post.node.link,
                    title: post.node.title,
                  })}
                  className="card-block"
                  key={post.node.slug}
                  cover={<img alt="" src={post.node.featuredImage.sourceUrl} />}
                >
                  <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: post.node.excerpt,
                    }}
                  />
                  <Row>
                    <Col>
                      {post.node.tags.edges.map(tag => (
                        <div key={tag.node.tagId}>{tag.node.name}</div>
                      ))}
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default withApollo(Category);
