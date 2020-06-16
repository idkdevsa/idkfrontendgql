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
import ErrorBoundary from "../ErrorBoundary";

import { Layout } from "antd";
import Tags from "./Tags";

const App = (props) => {
  return (
    <MainLayout>
      <TopBar />
      <Layout>
        <VsCodeSidebarIcons />
        <ErrorBoundary>
          <ContentLayout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/page/:slug" component={Page} />
              <Route exact path="/post/:slug" component={Post} />
              <Route exact path="/category/:slug" component={Category} />
              <Route exact path="/tag/:slug" component={Tags} />
            </Switch>
          </ContentLayout>
        </ErrorBoundary>
      </Layout>
      <BottomBar />
    </MainLayout>
  );
};

export default App;
