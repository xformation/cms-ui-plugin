import * as React from "react";
import { gql, graphql, QueryProps, MutationFunc } from "react-apollo";
import { withRouter, RouteComponentProps } from "react-router-dom";
import * as UpdateFacultyMutationGql from "./UpdateFacultyMutation.graphql";
import { UpdateFacultyMutation, UpdateFacultyInput, UpdateFacultyMutationVariables, FacultyDetailsFragment } from "../../types";

import FacultyEditForm from "../FacultyEditForm";
import withFacultyFromRouteParams from "../withFacultyFromRouteParams";

var queryString = require('query-string');

type UpdateFacultyPageRouteParams = {
    facultyId: any;
};

type UpdateFacultyPageProps = RouteComponentProps<UpdateFacultyPageRouteParams> & {
    faculty: FacultyDetailsFragment;
};

type UpdateFacultyFullPageProps = UpdateFacultyPageProps & {
    mutate: MutationFunc<UpdateFacultyMutation>;
};

// The 'actual' component that receives all the props
const UpdateFacultyPage = ({
    faculty, // from withFacultyFromRouteParams HOC
    history, // from withRouter HOC
    match,
    mutate // from graphql HOC
}: UpdateFacultyFullPageProps) =>
    <FacultyEditForm
        initialFaculty={faculty}
        formTitle="Update Faculty"
        onFormSubmit={faculty => {
            return mutate({
                variables: {
                    input: {
                        facultyId: queryString.parse(location.search).id,
                        ...faculty
                    }
                }
            })
                .then(({ data }) => {
                    // history.push(`/plugins/xformation-petclinic-panel/page/faculty?id=${data.updateFaculty.faculty.id}`);
                    // history.push(`/plugins/xformation-petclinic-panel/page/faculties`);
                    location.href = `${location.origin}/plugins/xformation-petclinic-panel/page/faculties`;
                    // location.pathname = `/plugins/xformation-petclinic-panel/page/faculty?id=${data.updateFaculty.faculty.id}`;
                })
                .catch(error => {
                    console.log("there was an error sending the update mutation", error);
                    return Promise.reject(`Could not save faculty: ${error}`);
                });
        }}
    />;

export default // load the faculty that is specified in the URL (.../:facultyId) via Graphql and add it to props
    // (until the faculty is fetched from the GraphQL backend a 'Loading...' component is shown)
    withFacultyFromRouteParams(
        // add 'history' object from the Router to the props
        withRouter(
            // add GraphQL 'mutate' function (for running the UpdateFacultyMutation) to props
            graphql<UpdateFacultyMutation, UpdateFacultyPageProps, UpdateFacultyFullPageProps>(UpdateFacultyMutationGql)(
                // ... and finally the 'actual' components that receives all the props
                UpdateFacultyPage
            )
        )
    );
