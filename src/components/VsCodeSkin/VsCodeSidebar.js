import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import { Link } from "react-router-dom";
import { Menu } from "antd";

const VsCodeSidebar = (props) => {

  const renderSidebar = () => {
    return (
      <Menu
        selectable={false}
        className="vscodesidebarmenuitem"
        onClick={props.setMenuCollapse}
      >
        <Menu.Item disabled className="bg-black-40 white" key={props.curMenu}>
          {props.curMenu.charAt(0).toUpperCase() + props.curMenu.slice(1)}
        </Menu.Item>
        {props.subMenu.map((item, index) => {
          return (
            <Menu.Item className="" key={item.title}>
              <Link to={item.url}>{item.title}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  };

  return <>{renderSidebar()}</>;
};

export default VsCodeSidebar;
