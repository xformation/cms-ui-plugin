import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { ApolloProvider } from "react-apollo";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { createGraphQLClient } from "../../createGraphQLClient";
import InstituteListPage from "./InstituteListPage";
import AddInstitutePage from "./AddInstitutePage";
import UpdateInstitutePage from "./UpdateInstitutePage";
import InstitutePage from "./InstitutePage";


const graphQLClient = createGraphQLClient();

export default function init() {
  setTimeout(function () {
    ReactDOM.render(
      <ApolloProvider client={graphQLClient}>
        <BrowserRouter>
          <Switch>
            <Route path="/plugins/xformation-petclinic-panel/page/institutes" component={InstituteListPage} />
            <Route path="/plugins/xformation-petclinic-panel/page/institutes/:instituteId" component={InstitutePage} />
            <Route path="/plugins/xformation-petclinic-panel/page/addinstitute" component={AddInstitutePage} />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>,
      document.getElementById("mount"));
  }, 10);
}