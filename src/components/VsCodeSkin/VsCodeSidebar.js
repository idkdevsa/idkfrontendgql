import React, { useState, useEffect } from "react";
import gql from "graphql-tag";

import { Menu } from "antd";
import { withApollo } from "react-apollo";
import { Link } from "react-router-dom";

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

const VsCodeSidebar = (props) => {
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

  const renderSidebar = () => {
    const curMenu = menus.reduce(
      (acc, el) =>
        el.url.includes(props.curMenu)
          ? acc.concat({
              url: el.url,
              label: el.label,
              type: el.type,
              __typename: el.__typename,
            })
          : acc,
      []
    );
    return (
      <Menu
        className="vscodesidebarmenuitem"
        selectable={false}
        onClick={props.setMenuCollapse}
      >
        {curMenu.map((item, index) => {
          return (
            <Menu.Item className="" key={item.label}>
              <Link to={item.url}>{item.label}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  };

  return <>{renderSidebar()}</>;
};

export default withApollo(VsCodeSidebar);
