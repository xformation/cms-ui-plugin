import * as React from "react";
import { gql, graphql, QueryProps, MutationFunc } from "react-apollo";
import { withRouter, RouteComponentProps } from "react-router-dom";
import * as UpdateInstituteMutationGql from "./UpdateInstituteMutation.graphql";
import { UpdateInstituteMutation, UpdateInstituteInput, UpdateInstituteMutationVariables, InstituteDetailsFragment } from "../../types";

import InstituteEditForm from "../InstituteEditForm";
import withInstituteFromRouteParams from "../withInstituteFromRouteParams";

var queryString = require('query-string');

type UpdateInstitutePageRouteParams = {
    instituteId: any;
};

type UpdateInstitutePageProps = RouteComponentProps<UpdateInstitutePageRouteParams> & {
    institute: InstituteDetailsFragment;
};

type UpdateInstituteFullPageProps = UpdateInstitutePageProps & {
    mutate: MutationFunc<UpdateInstituteMutation>;
};

// The 'actual' component that receives all the props
const UpdateInstitutePage = ({
    institute, // from withInstituteFromRouteParams HOC
    history, // from withRouter HOC
    match,
    mutate // from graphql HOC
}: UpdateInstituteFullPageProps) =>
    <InstituteEditForm
        initialInstitute={institute}
        formTitle="Update Institute"
        onFormSubmit={institute => {
            return mutate({
                variables: {
                    input: {
                        instituteId: queryString.parse(location.search).id,
                        ...institute
                    }
                }
            })
                .then(({ data }) => {
                    // history.push(`/plugins/xformation-petclinic-panel/page/institute?id=${data.updateInstitute.institute.id}`);
                    // history.push(`/plugins/xformation-petclinic-panel/page/institutes`);
                    location.href = `${location.origin}/plugins/xformation-petclinic-panel/page/institute?id=${data.updateInstitute.institute.id}`;
                    // location.pathname = `/plugins/xformation-petclinic-panel/page/institute?id=${data.updateInstitute.institute.id}`;
                })
                .catch(error => {
                    console.log("there was an error sending the update mutation", error);
                    return Promise.reject(`Could not save institute: ${error}`);
                });
        }}
    />;

export default // load the institute that is specified in the URL (.../:instituteId) via Graphql and add it to props
    // (until the institute is fetched from the GraphQL backend a 'Loading...' component is shown)
    withInstituteFromRouteParams(
        // add 'history' object from the Router to the props
        withRouter(
            // add GraphQL 'mutate' function (for running the UpdateInstituteMutation) to props
            graphql<UpdateInstituteMutation, UpdateInstitutePageProps, UpdateInstituteFullPageProps>(UpdateInstituteMutationGql)(
                // ... and finally the 'actual' components that receives all the props
                UpdateInstitutePage
            )
        )
    );
