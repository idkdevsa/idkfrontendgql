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
import { BottomBar, MainLayout } from "./VsCodeSkin/VsCodeComponents";

import { Layout } from "antd";

const App = (props) => {
  return (
    // <Layout className="vscodemain">
    <MainLayout>
      <VsCodeTopBar />
      <Layout>
        <VsCodeSidebarIcons />
        <Layout.Content className="vscodecontent">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/page/:slug" component={Page} />
            <Route exact path="/post/:slug" component={Post} />
            <Route exact path="/category/:slug" component={Category} />
          </Switch>
        </Layout.Content>
      </Layout>
      {/* <VsCodeBottomBar /> */}
      <BottomBar />
    </MainLayout>
    // </Layout>
  );
};

export default App;
