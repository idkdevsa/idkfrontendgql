import React, { Component, useState, useEffect } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

import { Card, Avatar, Layout } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  PostCardLayout,
  PostCard,
  RenderHtml,
} from "./VsCodeSkin/VsCodeComponents";

/**
 * GraphQL tag query that takes a tag slug as a filter
 * Returns the posts belonging to the tag and the tag name and ID
 */
const TAG_QUERY = gql`
  query TagQuery($filter: [String]) {
    tags(where: { slug: $filter }) {
      edges {
        node {
          id
          tagId
          name
          posts {
            nodes {
              id
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
      }
    }
  }
`;

/**
 * Fetch and display a Tag
 */
const Tags = (props) => {
  const [tags, setTags] = useState({ tags: [], posts: [] });

  /**
   * Execute the tag query, parse the result and set the state
   */

  useEffect(() => {
    const executeTagQuery = async () => {
      const { match } = props;
      const filter = match.params.slug;
      try {
        const result = await props.client.query({
          query: TAG_QUERY,
          variables: { filter },
        });
        let tags = result.data.tags.edges;
        let posts = tags.map((tag) => tag.node.posts.nodes);
        setTags({ tags, posts } || { tags: [], posts: [] });
      } catch (error) {
        console.log(error);
      }
    };
    executeTagQuery();
  }, [props]);

  return (
    <>
      <PostCardLayout title={props.match.params.slug}>
        {console.log(tags)}
        {tags.posts.map((post) =>
          post.map((p, index) => (
            <PostCard
              key={p.slug}
              title={p.title}
              titleLink={p.slug}
              description={RenderHtml(p.excerpt)}
              imgSrc={p.featuredImage.sourceUrl}
              alt={p.title}
              // tags={RenderTags(TagArray(post.node.tags))}
            />
          ))
        )}
      </PostCardLayout>
    </>
  );
};

export default withApollo(Tags);
