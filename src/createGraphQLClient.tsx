import { ApolloClient, createNetworkInterface } from 'react-apollo';


// 	http://dev.apollodata.com/react/initialization.html#creating-client
export const createGraphQLClient = () => {
  const networkInterface = createNetworkInterface({
<<<<<<< HEAD
    uri: 'http://100.81.3.25:8080/graphql'
=======
    uri: 'http://100.81.3.25:8080/graphql' //18.209.4.2
>>>>>>> 00c5b985f679d6b991bc56067ad2b447fd480de9
  });
  const client = new ApolloClient({
    networkInterface: networkInterface

  });

  return client;
};

