import * as React from "react";

import { MutationFunc } from "react-apollo";
import EditForm from "../../components/form/EditForm";
import { InputFactory } from "../../components/form/FormElements";
import { NotEmpty } from "../../components/form/Constraints";
import { FacultyData } from "../types";

const copyFaculty = (faculty: FacultyData): FacultyData => ({
  name: faculty.name,
  lastName: faculty.lastName,
  address: faculty.address,
  mail: faculty.mail,
  designation: faculty.designation,
  mobile: faculty.mobile,
  status: faculty.status
});

const facultyFormElements = [
  {
    elementComponentFactory: InputFactory,
    name: "name",
    label: "First Name",
    constraint: NotEmpty
  },
  {
    elementComponentFactory: InputFactory,
    name: "lastName",
    label: "Last Name",
    constraint: NotEmpty
  },
  {
    elementComponentFactory: InputFactory,
    name: "address",
    label: "Address",
    constraint: NotEmpty
  },
  {
    elementComponentFactory: InputFactory,
    name: "mail",
    label: "Email",
    constraint: NotEmpty
  },
  {
    elementComponentFactory: InputFactory,
    name: "designation",
    label: "Designation",
    constraint: NotEmpty
  },
  {
    elementComponentFactory: InputFactory,
    name: "mobile",
    label: "Mobile",
    constraint: NotEmpty
  },
  {
    elementComponentFactory: InputFactory,
    name: "status",
    label: "Status",
    constraint: NotEmpty
  }
];

type FacultyEditFormProps = {
  initialFaculty: FacultyData;
  formTitle: string;
  onFormSubmit: (faculty: FacultyData) => void | Promise<string | void>;
};

const FacultyEditForm = <M, MI>({ formTitle, initialFaculty, onFormSubmit }: FacultyEditFormProps) => {
  return (
    <EditForm
      formTitle={formTitle}
      copyModel={copyFaculty}
      formElements={facultyFormElements}
      initialModel={initialFaculty}
      onFormSubmit={onFormSubmit}
    />
  );
};

export default FacultyEditForm;
