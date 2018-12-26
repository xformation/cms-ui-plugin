import * as React from "react";
import { graphql, MutationFunc } from "react-apollo";
import { withRouter, RouteComponentProps } from "react-router-dom";
import * as AddInstituteMutationGql from "./AddInstituteMutation.graphql";
import { AddInstituteMutation, AddInstituteInput, AddInstituteMutationVariables, InstituteData } from "../../types";

import InstituteEditForm from "../InstituteEditForm";
import withLoadingHandler from "../../../components/withLoadingHandler";

// import 'bootstrap/dist/css/bootstrap.min.css';

const emptyInstitute = (): InstituteData => ({
  name: "",
  code: "",
  year: ""
});


type AddInstitutePageOwnProps = RouteComponentProps<{}>;
type AddInstitutePageProps = AddInstitutePageOwnProps & {
  mutate: MutationFunc<AddInstituteMutation>;
};

const AddInstitutePage: any = ({ mutate, history }: AddInstitutePageProps) =>
  <section className="container mt-5">
    <InstituteEditForm
      initialInstitute={emptyInstitute()}
      formTitle="Add Institute"
      onFormSubmit={(institute: InstituteData) => {
        return mutate({
          variables: { input: institute }
        })
          .then(({ data }) => {
            history.push(`/institutes/${data.addInstitute.institute.id}`);
            location.href = `${location.origin}/plugins/xformation-petclinic-panel/page/institutes`;
          })
          .catch(error => {
            console.log("there was an error sending the query", error);
            return Promise.reject(`Could not save institute: ${error}`);
          });
      }}
    />
  </section>;

export default withRouter(graphql<AddInstituteMutation, AddInstitutePageOwnProps>(AddInstituteMutationGql)(AddInstitutePage));