import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ApolloProvider } from 'react-apollo';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { createGraphQLClient } from '../../createGraphQLClient';
import StudentListPage from './StudentListPage';
import AddStudentPage from './AddStudentPage';
import EditStudentPage from './EditStudentPage';

const graphQLClient = createGraphQLClient();

export default function init() {
  setTimeout(function () {
    ReactDOM.render(
      <ApolloProvider client={graphQLClient}>
        <BrowserRouter>
          <Switch>
            <Route
              path="/plugins/ems-student/page/students"
              component={StudentListPage}
            />
            <Route
              path="/plugins/ems-student/page/addstudent"
              component={AddStudentPage}
            />
            <Route
              path="/plugins/ems-student/page/editstudentpage"
              component={EditStudentPage}
            />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>,
      document.getElementById('mount')
    );
  }, 10);
}
