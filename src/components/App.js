import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Search from "./Search";
import Page from "./Page";
import Post from "./Post";
import Category from "./Category";
import {
  BottomBar,
  MainLayout,
  TopBar,
  ContentLayout,
  VsSidebar,
} from "./VsCodeSkin/VsCodeComponents";
import ErrorBoundary from "../ErrorBoundary";

import Tags from "./Tags";
import Menu from "./Menu";

const App = (props) => {
  return (
    <MainLayout>
      <TopBar />
      <Menu />
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
      <BottomBar />
    </MainLayout>
  );
};

export default App;
