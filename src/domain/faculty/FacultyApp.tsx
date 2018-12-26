import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { ApolloProvider } from "react-apollo";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { createGraphQLClient } from "../../createGraphQLClient";
import FacultyListPage from "./FacultyListPage";
import AddFacultyPage from "./AddFacultyPage";
import FacultyPage from "./FacultyPage";

const graphQLClient = createGraphQLClient();

export default function init() {
  setTimeout(function () {
    ReactDOM.render(
      <ApolloProvider client={graphQLClient}>
        <BrowserRouter>
          <Switch>
            <Route path="/plugins/xformation-petclinic-panel/page/faculties" component={FacultyListPage} />
            <Route path="/plugins/xformation-petclinic-panel/page/addfaculty" component={AddFacultyPage} />
            <Route path="/plugins/xformation-petclinic-panel/page/faculty" component={FacultyPage} />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>,
      document.getElementById("mount"));
  }, 100);
}