import {ApolloClient, createNetworkInterface} from 'react-apollo';
import {config} from './config';

const networkInterface = createNetworkInterface({
  uri: config.GRAPHQL_URL,
});
export const gQLClient = new ApolloClient({
  networkInterface: networkInterface,
});
