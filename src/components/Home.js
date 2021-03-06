import React, { useState, useEffect, useRef } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-boost";
import { AUTH_TOKEN } from "../constants";
import Config from "../CustomHooks/ApolloHooksWP/config";
import {
  HomeBlock,
  HomeBlockLayout,
  RenderTags,
} from "./VsCodeSkin/VsCodeComponents";

/**
 * GraphQL page query
 * Gets page's title and content using slug as uri
 */
const PAGE_QUERY = gql`
  query PageQuery($uri: String!) {
    pageBy(uri: $uri) {
      title
      content
    }
  }
`;

/**
 * GraphQL pages and categories query
 * Gets all available pages and posts titles and slugs
 */
const PAGES_AND_CATEGORIES_QUERY = gql`
  query PagesAndPostsQuery {
    posts {
      edges {
        node {
          title
          slug
          categories {
            nodes {
              id
              name
              slug
            }
          }
        }
      }
    }
    pages {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`;

/**
 * GraphQL protected query, an example of an authenticated query
 * If not authenticated it will return an error
 * If authenticated it will return the viewer's id and username
 */
const PROTECTED_QUERY = gql`
  query ProtectedQuery {
    viewer {
      userId
      username
    }
  }
`;

const Home = (props) => {
  const [userId, setUserId] = useState(null);
  const [page, setPage] = useState({ title: "", content: "" });
  const [pagesPosts, setPagesPosts] = useState({ pages: [], posts: [] });

  // used as a authenticated GraphQL client
  const authClient = useRef(null);

  useEffect(() => {
    executePageQuery();
    executePagesAndCategoriesQuery();

    // if localstorage contains a JWT token
    // initiate a authenticated client and execute a protected query
    const authToken = localStorage.getItem(AUTH_TOKEN);
    if (authToken) {
      authClient.current = new ApolloClient({
        link: createHttpLink({
          uri: Config.gqlUrl,
          headers: {
            Authorization: authToken ? `Bearer ${authToken}` : null,
          },
        }),
        cache: new InMemoryCache(),
      });
      executeProtectedQuery();
    }
  }, []);

  /**
   * Execute the protected query and update state
   */
  const executeProtectedQuery = async () => {
    let error = null;
    const result = await authClient
      .query({
        query: PROTECTED_QUERY,
      })
      .catch((err) => {
        error = err;
      });
    if (!error) {
      const { userId } = result.data.viewer;
      setUserId({ userId });
    } else {
      const { history } = props;
      localStorage.removeItem(AUTH_TOKEN);
      history.push(`/login`);
    }
  };

  /**
   * Execute the page query using uri and set the state
   */
  const executePageQuery = async () => {
    const { match, client } = props;
    let uri = match.params.slug;
    if (!uri) {
      uri = "welcome";
    }
    const result = await client.query({
      query: PAGE_QUERY,
      variables: { uri },
    });
    const page = result.data.pageBy;
    setPage({ page });
  };

  /**
   * Execute the pages and categories query and set the state
   */
  const executePagesAndCategoriesQuery = async () => {
    const { client } = props;
    const result = await client.query({
      query: PAGES_AND_CATEGORIES_QUERY,
    });
    let posts = result.data.posts.edges;
    posts = posts.map((post) => {
      const finalLink = `/post/${post.node.slug}`;
      const modifiedPost = { ...post };
      modifiedPost.node.link = finalLink;
      return modifiedPost;
    });
    let pages = result.data.pages.edges;
    pages = pages.map((page) => {
      const finalLink = `/page/${page.node.slug}`;
      const modifiedPage = { ...page };
      modifiedPage.node.link = finalLink;
      return modifiedPage;
    });

    setPagesPosts({ posts, pages });
  };

  // filter posts based on category name

  const postFilter = (val) => {
    let posts = pagesPosts.posts.map((post) => post.node);
    let result = posts.filter((a) =>
      a.categories.nodes.some((c) => c.slug.includes(val))
    );
    return result;
  };

  return (
    <HomeBlockLayout>
      <HomeBlock
        title={"Latest Posts"}
        content={postFilter("blog").map((post, index) => (
          <li key={post.slug}>
            <Link to={post.link}>{post.title}</Link>
          </li>
        ))}
      />
      <HomeBlock
        title={"Recent Projects"}
        content={postFilter("projects").map((post, index) => (
          <li key={post.slug}>
            <Link to={post.link}>{post.title}</Link>
          </li>
        ))}
      />
      <HomeBlock
        title={"Connect"}
        content={RenderTags(["github", "linkedin"])}
      />
    </HomeBlockLayout>
  );
};

export default withApollo(Home);
