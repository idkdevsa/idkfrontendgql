import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Search from "./Search";
import Page from "./Page";
import Post from "./Post";
import Category from "./Category";
import VsCodeSidebarIcons from "./VsCodeSkin/VsCodeSidebarIcons";
import {
  BottomBar,
  MainLayout,
  TopBar,
  ContentLayout,
} from "./VsCodeSkin/VsCodeComponents";

import { Layout } from "antd";

const App = (props) => {
  return (
    // <Layout className="vscodemain">
    <MainLayout>
      <TopBar />
      <Layout>
        <VsCodeSidebarIcons />
        {/* <Layout.Content className="vscodecontent"> */}
        <ContentLayout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/page/:slug" component={Page} />
            <Route exact path="/post/:slug" component={Post} />
            <Route exact path="/category/:slug" component={Category} />
          </Switch>
        </ContentLayout>
        {/* </Layout.Content> */}
      </Layout>
      <BottomBar />
    </MainLayout>
    // </Layout>
  );
};

export default App;
