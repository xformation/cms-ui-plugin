import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { ApolloProvider } from "react-apollo";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { createGraphQLClient } from "../../../createGraphQLClient";
import FacultyListPage from "./FacultyListPage";
import '../../../css/dark.css';

const graphQLClient = createGraphQLClient();

export default function init() {
    setTimeout(function () {
        ReactDOM.render(
            <ApolloProvider client={graphQLClient}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/plugins/xformation-petclinic-panel/page/faculties" component={FacultyListPage} />
                    </Switch>
                </BrowserRouter>
            </ApolloProvider>,
            document.getElementById("mountFacultyList"));
    }, 100);
}