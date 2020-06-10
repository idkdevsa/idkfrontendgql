import React, { Component, useState, useEffect } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, Row, Col, Divider } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import useLoadingSpinner from './useLoadingSpinner';

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
const Post = props => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    date: '',
    author: {
      name: '',
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

  const renderPost = () => {
    return (
      <Card className="card-post">
        {renderSpin()}
        <h1>{post.title}</h1>
        <span className="author">{`By ${post.author.name} | `}</span>
        <span className="date-style"> {post.date.split('T').join(' @ ')}</span>
        <Divider />
        <Row>
          <Col xs={24} sm={24} md={{ span: 16, push: 4 }}>
            <div // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            />
          </Col>
        </Row>
      </Card>
    );
  };

  return renderPost();
};

export default withApollo(Post);
