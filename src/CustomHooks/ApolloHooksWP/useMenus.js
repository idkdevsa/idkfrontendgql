import { useState, useEffect } from 'react';

import gql from 'graphql-tag';

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
