import * as React from 'react';

import {MutationFunc} from 'react-apollo';
import EditForm from '../../components/form/EditForm';
import {InputFactory} from '../../components/form/FormElements';
import {NotEmpty} from '../../components/form/Constraints';
import {StudentData} from '../types';

const copyStudent = (student: StudentData): StudentData => ({
  id: student.id,
  studentName: student.studentName,
  fatherName: student.fatherName,
  fatherMiddleName: student.fatherMiddleName,
  fatherLastName: student.fatherLastName,
});

const studentFormElements = [
  {
    name: 'id',
    label: 'Id',
    constraint: NotEmpty,
    elementComponentFactory: InputFactory,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'sName',
    label: 'Name',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'attendance',
    label: 'Attendance',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'attendance',
    label: 'Attendance',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'attendance',
    label: 'Attendance',
    constraint: NotEmpty,
  },
];

type StudentEditFormProps = {
  initialStudent: StudentData;
  formTitle: string;
  onFormSubmit: (student: StudentData) => void | Promise<string | void>;
};

const StudentEditForm = <M, MI>({
  formTitle,
  initialStudent,
  onFormSubmit,
}: StudentEditFormProps) => {
  return (
    <EditForm
      formTitle={formTitle}
      copyModel={copyStudent}
      formElements={studentFormElements}
      initialModel={initialStudent}
      onFormSubmit={onFormSubmit}
    />
  );
};

export default StudentEditForm;
