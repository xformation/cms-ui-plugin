import ApolloClient from 'apollo-boost';

export const gQLClient = new ApolloClient({
  uri: 'http://100.81.3.25/graphql',
});

