import React, { useState } from "react";
import { Menu, Row, Col, Layout, Button } from "antd";
import { QuestionCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { withRouter } from "react-router";
import ContactModal from "../ContactModal";
import { Link } from "react-router-dom";
import VsCodeBreadcrumb from "./VsCodeBreadcrumb";

const VsCodeTopBar = (props) => {
  return (
    <>
      <Layout.Header className="vscodetopbar">
        <Row>
          <Col flex="2.5rem">
            <Link to="/">
              <HomeOutlined />
            </Link>
          </Col>
          <Col flex="auto">
            Jason Bolton - Fullstack Developer
            <ContactModal />
          </Col>
          {/* <Col flex="auto">
            <VsCodeBreadcrumb />
          </Col> */}
        </Row>
      </Layout.Header>
    </>
  );
};

export default withRouter(VsCodeTopBar);
