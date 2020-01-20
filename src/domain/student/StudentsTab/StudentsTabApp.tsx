import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ApolloProvider} from 'react-apollo';
import {gQLClient} from '../../../graphQLClient';
import StudentsTab from './StudentsTab';
import '../../../css/custom.css';
import '../../../css/dark.css';
import '../../../css/tabs.css';
import '../../../css/light.css';

export default function init() {
  setTimeout(function() {
    ReactDOM.render(
      <ApolloProvider client={gQLClient}>
        <StudentsTab />
      </ApolloProvider>,
      document.getElementById('mountStudentsTab')
    );
  }, 10);
}
