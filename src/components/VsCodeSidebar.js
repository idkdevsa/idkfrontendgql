import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';

import { Menu, Layout } from 'antd';
import { withRouter } from 'react-router';
import { withApollo } from 'react-apollo';
import { Link } from 'react-router-dom';

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
const GET_MENU_ITEM = `
 query MenuItemQuery($id: ID!) {
   menuItem(id: $id) {
    id
    menuItemId
    title
    url
    connectedObject {
      __typename
    }
    cssClasses
    description
    label
    linkRelationship
    target
  }
}`;

const VsCodeSidebar = props => {
  const [menus, setMenus] = useState([]);

  const curMenus = useEffect(() => {
    const executeMenu = async () => {
      try {
        const result = await props.client.query({
          query: MENU_QUERY,
        });
        setMenus(result.data.headerMenu);
        console.log(result.data);
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
      [],
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
