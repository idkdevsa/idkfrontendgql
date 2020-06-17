import React, { useState, useEffect } from "react";
import gql from "graphql-tag";

import { withApollo } from "react-apollo";
import { Link } from "react-router-dom";
import { VsSidebar } from "./VsCodeSkin/VsCodeComponents";

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

const Menu = (props) => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const executeMenu = async () => {
      try {
        const result = await props.client.query({
          query: MENU_QUERY,
        });

        setMenus(result.data.headerMenu);
      } catch (error) {
        console.log(error);
      }
    };
    executeMenu();
  }, [props.client]);

  return (
    <>
      <VsSidebar menus={menus} />
    </>
  );
};

export default withApollo(Menu);
