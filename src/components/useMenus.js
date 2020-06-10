import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withApollo } from 'react-apollo';
import { compose } from 'recompose';
import gql from 'graphql-tag';
import { AUTH_TOKEN, USERNAME } from '../constants';
import { ReactComponent as Logo } from '../static/images/starter-kit-logo.svg';
import { ReactComponent as SearchIcon } from '../static/images/search.svg';

/**
 * GraphQL menu query
 * Gets the labels, types (internal or external) and URLs
 */
const MENU_QUERY = gql`
  query MenuQuery {
    headerMenu {
      url
      label
      type
    }
  }
`;

const useMenus = props => {
  const [menus, setMenus] = useState({ menus: [] });

  useEffect(() => {
    const executeMenu = async () => {
      const { client } = props;

      try {
        const result = await client.query({
          query: MENU_QUERY,
        });
        const menus = result.data.headerMenu;
        setMenus({ menus });
      } catch (error) {
        console.log(error);
      }
    };
    executeMenu();
  }, [props]);

  return [{ menus }];
};

export default useMenus;
