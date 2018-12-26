import * as React from "react";

import { MutationFunc } from "react-apollo";
import EditForm from "../../components/form/EditForm";
import { InputFactory } from "../../components/form/FormElements";
import { NotEmpty } from "../../components/form/Constraints";
import { InstituteData } from "../types";

const copyInstitute = (institute: InstituteData): InstituteData => ({
  name: institute.name,
  code: institute.code,
  year: institute.year
});

const instituteFormElements = [
  {
    name: "name",
    label: "Name",
    constraint: NotEmpty,
    elementComponentFactory: InputFactory
  },
  {
    elementComponentFactory: InputFactory,
    name: "code",
    label: "Code",
    constraint: NotEmpty
  },
  {
    elementComponentFactory: InputFactory,
    name: "year",
    label: "Year",
    constraint: NotEmpty
  }
];

type InstituteEditFormProps = {
  initialInstitute: InstituteData;
  formTitle: string;
  onFormSubmit: (institute: InstituteData) => void | Promise<string | void>;
};

const InstituteEditForm = <M, MI>({ formTitle, initialInstitute, onFormSubmit }: InstituteEditFormProps) => {
  return (
    <EditForm
      formTitle={formTitle}
      copyModel={copyInstitute}
      formElements={instituteFormElements}
      initialModel={initialInstitute}
      onFormSubmit={onFormSubmit}
    />
  );
};

export default InstituteEditForm;
