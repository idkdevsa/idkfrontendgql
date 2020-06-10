import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Search from "./Search";
import Page from "./Page";
import Post from "./Post";
import Category from "./Category";
import VsCodeTopBar from "./VsCodeSkin/VsCodeTopBar";
import VsCodeBottomBar from "./VsCodeSkin/VsCodeBottomBar";
import VsCodeSidebarIcons from "./VsCodeSkin/VsCodeSidebarIcons";

import TabContent from "./TabContent";
import { Layout } from "antd";
import VsCodeBreadcrumb from "./VsCodeSkin/VsCodeBreadcrumb";
// import Tags from './Tags';

const App = (props) => {
  return (
    <Layout className="vscodemain">
      <VsCodeTopBar />
      {/* <Tags /> */}
      <Layout>
        <VsCodeSidebarIcons />
        <Layout.Content className="vscodecontent">
          {/* <TabContent> */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/page/:slug" component={Page} />
            <Route exact path="/post/:slug" component={Post} />
            <Route exact path="/category/:slug" component={Category} />
          </Switch>
          {/* </TabContent> */}
        </Layout.Content>
      </Layout>
      <VsCodeBottomBar />
    </Layout>
  );
};

export default App;
