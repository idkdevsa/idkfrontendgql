import React from "react";
import { Row, Col, Menu, Layout } from "antd";

const VsCodeBottomBar = () => {
  /*
   * Render footer
   * TODO add button to change skin
   */

  return (
    <Layout.Footer className="vscodebottombar">
      <Row>
        <Col className="vscodebottombarleft" flex="2.5rem">
          VsCodeSkin
        </Col>
        <Col flex="auto">
          {/* <Menu className="vscodebottombarmenuitem" mode="horizontal">
            <Menu.Item key="2">Change Skin</Menu.Item>
            <Menu.Item key="3">Git</Menu.Item>
          </Menu> */}
        </Col>
      </Row>
    </Layout.Footer>
  );
};

export default VsCodeBottomBar;
