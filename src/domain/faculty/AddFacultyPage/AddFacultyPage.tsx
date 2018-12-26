import * as React from "react";
import { graphql, MutationFunc } from "react-apollo";
import { withRouter, RouteComponentProps } from "react-router-dom";
import * as AddFacultyMutationGql from "./AddFacultyMutation.graphql";
import { AddFacultyMutation, AddFacultyInput, AddFacultyMutationVariables, FacultyData } from "../../types";

import FacultyEditForm from "../FacultyEditForm";
import withLoadingHandler from "../../../components/withLoadingHandler";

// import 'bootstrap/dist/css/bootstrap.min.css';
import { number } from "prop-types";

const emptyFaculty = (): FacultyData => ({
  name: "",
  lastName: "",
  address: "",
  mail: "",
  designation: "",
  mobile: "",
  status: "",
});


type AddFacultyPageOwnProps = RouteComponentProps<{}>;
type AddFacultyPageProps = AddFacultyPageOwnProps & {
  mutate: MutationFunc<AddFacultyMutation>;
};

const AddFacultyPage: any = ({ mutate, history }: AddFacultyPageProps) =>
  <section className="container mt-5">
    <FacultyEditForm
      initialFaculty={emptyFaculty()}
      formTitle="Add Faculty"
      onFormSubmit={(faculty: FacultyData) => {
        return mutate({
          variables: { input: faculty }
        })
          .then(({ data }) => {
            history.push(`/faculties/${data.addFaculty.faculty.id}`);
            location.href = `${location.origin}/plugins/xformation-petclinic-panel/page/faculties`;
          })
          .catch(error => {
            console.log("there was an error sending the query", error);
            return Promise.reject(`Could not save faculty: ${error}`);
          });
      }}
    />
  </section>;

export default withRouter(graphql<AddFacultyMutation, AddFacultyPageOwnProps>(AddFacultyMutationGql)(AddFacultyPage));