import React from 'react';
import ReactDOM from 'react-dom';
import 'tachyons/css/tachyons.min.css';
import './styles/style.scss';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

import useApolloProvider from './CustomHooks/ApolloHooksWP/useApolloProvider';

// Apollo GraphQL client
const [client, ApolloProvider] = useApolloProvider();

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
