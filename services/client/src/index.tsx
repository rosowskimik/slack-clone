import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import 'semantic-ui-css/semantic.min.css';

import Routes from './routes';

const client = new ApolloClient({ uri: 'http://localhost:8080/graphql' });

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById('root')
);
