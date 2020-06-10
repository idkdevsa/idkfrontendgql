import React, { Component, useState, useEffect } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import { Card, Avatar, Layout } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';

/**
 * GraphQL tag query that takes a tag slug as a filter
 * Returns the posts belonging to the tag and the tag name and ID
 */
const TAG_QUERY = gql`
  query GET_TAGS {
    tags {
      edges {
        node {
          id
          tagId
          name
          tagIcon {
            url
          }
          posts {
            nodes {
              id
              title
              date
            }
          }
        }
      }
    }
  }
`;

/**
 * Fetch and display a Tag
 */
const Tags = props => {
  const [tags, setTags] = useState({ tags: [], posts: [] });

  /**
   * Execute the tag query, parse the result and set the state
   */

  useEffect(() => {
    const executeTagQuery = async () => {
      try {
        const result = await props.client.query({
          query: TAG_QUERY,
        });
        let tags = result.data.tags.edges;
        let posts = tags.map(tag => tag.node.posts.nodes);
        setTags({ tags, posts } || { tags: [], posts: [] });
      } catch (error) {
        console.log(error);
      }
    };
    executeTagQuery();
  }, [props]);

  return (
    <>
      {console.log(tags)}
      {/* <Card className="card-post">
        {console.log(tags)}
        {tags.posts.map((post, index) => (
          <Card.Grid key={index}>
            <Card
              className="card-block"
              key={post.node.id}
              cover={<img alt="" src="post.node.featuredImage.sourceUrl" />}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <h1>
                <Link to={post.node.link}> {post.node.title}</Link>
              </h1>

              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: post.node.excerpt,
                }}
              />
            </Card>
          </Card.Grid>
        ))}
      </Card> */}
    </>
  );
};

export default withApollo(Tags);
