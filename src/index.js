import React from "react";
import ReactDOM from "react-dom";
import "tachyons/css/tachyons.min.css";
import "./styles/style.scss";
import { Router } from "react-router-dom";
import App from "./components/App";
import history from "./history";

import useApolloProvider from "./CustomHooks/ApolloHooksWP/useApolloProvider";

// Apollo GraphQL client
const [client, ApolloProvider] = useApolloProvider();

ReactDOM.render(
  <Router history={history}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById("root")
);
