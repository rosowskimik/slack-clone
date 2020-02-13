import 'semantic-ui-css/semantic.min.css';

import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from '@apollo/react-hooks';

import Routes from './routes';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:8080/graphql',
    credentials: 'include'
  }),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById('root')
);
