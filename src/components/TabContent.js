import React from 'react';
import { Layout, Tabs, Row, Col } from 'antd';
import { withRouter } from 'react-router';
import { withApollo } from 'react-apollo';
import VsCodeBreadcrumb from './VsCodeBreadcrumb';

const TabContent = props => {
  //   const tabArr = props.children.props.children.map((child, index) => (
  //     <div key={index}>{child}</div>
  //   ));

  return (
    <Tabs type="card">
      <Tabs.TabPane tab={<VsCodeBreadcrumb />}>
        <Row>
          <Col md={{ span: 16, push: 4 }}>{props.children}</Col>
        </Row>
      </Tabs.TabPane>
    </Tabs>
  );
};

export default withRouter(TabContent);
