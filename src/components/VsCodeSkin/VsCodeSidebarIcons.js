import React, { useState, useCallback } from "react";
import { Button, Menu, Layout } from "antd";
import { CommentOutlined, UserOutlined } from "@ant-design/icons";
import VsCodeSidebar from "./VsCodeSidebar";

const VsCodeSidebarIcons = () => {
  const [menuCollapse, setMenuCollapse] = useState(true);
  const [curMenu, setCurMenu] = useState("blog");

  // Handle behavior of main sidebar and set current menu
  const handleMenuCollapse = useCallback(
    (curMenuSelection) => {
      setMenuCollapse(
        curMenuSelection !== curMenu && menuCollapse === false
          ? false
          : curMenuSelection !== curMenu && menuCollapse === true
          ? false
          : curMenuSelection === curMenu && menuCollapse === false
          ? true
          : false
      );
      setCurMenu(curMenuSelection);
    },
    [curMenu, menuCollapse]
  );

  // define side bar menu icon keys

  const menuItems = {
    Blog: "blog",
    Projects: "projects",
  };

  return (
    <>
      <Layout.Sider className="vscodesidebaricons" width="4rem" trigger={null}>
        <Menu
          className="vscodesidebariconsmenuitem"
          selectable={false}
          onClick={({ key }) => handleMenuCollapse(key)}
        >
          <Menu.Item key={menuItems.Blog}>
            <Button
              type="link"
              ghost
              icon={<CommentOutlined style={{ fontSize: "2rem" }} />}
            />
          </Menu.Item>
          <Menu.Item key={menuItems.Projects}>
            <Button
              type="link"
              ghost
              icon={<UserOutlined style={{ fontSize: "2rem" }} />}
            />
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout.Sider
        className="vscodesidebar"
        collapsible
        collapsed={menuCollapse}
        trigger={null}
        collapsedWidth={0}
      >
        <VsCodeSidebar setMenuCollapse={setMenuCollapse} curMenu={curMenu} />
      </Layout.Sider>
    </>
  );
};

export default VsCodeSidebarIcons;
