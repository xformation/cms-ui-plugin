import * as React from 'react'; 
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { gQLClient } from '../../../graphQLClient';
import StudentsTab from './StudentsTab';

export default function init() {
  setTimeout(function () {
    ReactDOM.render(
      <ApolloProvider client={gQLClient}>
        <StudentsTab />
      </ApolloProvider>,
      document.getElementById('mountStudentsTab')
    );
  }, 10);
}
