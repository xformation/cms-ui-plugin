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
  motherName: student.motherName,
  motherMiddleName: student.motherMiddleName,
  motherLastName: student.motherLastName,
  aadharNo: student.aadharNo,
  dateOfBirth: student.dateOfBirth,
  placeOfBirth: student.placeOfBirth,
  religion: student.religion,
  caste: student.caste,
  subCaste: student.subCaste,
  age: student.age,
  sex: student.sex,
  bloodGroup: student.bloodGroup,
  addressLineOne: student.addressLineOne,
  addressLineTwo: student.addressLineTwo,
  addressLineThree: student.addressLineThree,
  town: student.town,
  state: student.state,
  country: student.country,
  pincode: student.pincode,
  studentContactNumber: student.studentContactNumber,
  alternateContactNumber: student.alternateContactNumber,
  studentEmailAddress: student.studentEmailAddress,
  alternateEmailAddress: student.alternateEmailAddress,
  relationWithStudent: student.relationWithStudent,
  name: student.name,
  middleName: student.middleName,
  lastName: student.lastName,
  contactNo: student.contactNo,
  emailAddress: student.emailAddress,
  uploadPhoto: student.uploadPhoto,
  admissionNo: student.admissionNo,
  rollNo: student.rollNo,
  studentType: student.studentType,
  batch: student.batch.batch,
  section: student.section.section,
  branch: student.branch.branchName,
  department: student.department.name,
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
    name: 'studentName',
    label: 'Student Name',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'fatherName',
    label: 'Father Name',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'fatherMiddleName',
    label: 'Father Middle Name',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'father Last Name',
    label: 'fatherLastName',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'motherName',
    label: 'Mother Name',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'motherMiddleName',
    label: 'Mother Middle Name',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'motherLastName',
    label: 'mother Last Name',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'aadharNo',
    label: 'Adhar No',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'dateOfBirth',
    label: 'Date Of Birth',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'placeOfBirth',
    label: 'Place Of Birth',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'religion',
    label: 'Religion',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'caste',
    label: 'Caste',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'subCaste',
    label: 'Sub Caste',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'age',
    label: 'Age',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'bloodGroup',
    label: 'Blood Group',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'addressLineOne',
    label: 'address One',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'addressLineTwo',
    label: 'address Two',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'addressLineThree',
    label: 'address Three',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'town',
    label: 'Town',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'state',
    label: 'State',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'country',
    label: 'Country',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'pincode',
    label: 'Pincode',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'studentContactNumber',
    label: 'student Contact Number',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'alternateContactNumber',
    label: 'alternateContactNumber',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'studentEmailAddress',
    label: 'student email',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'alternateEmailAddress',
    label: 'alternate email',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'relationWithStudent',
    label: 'relation student',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'name',
    label: 'Name',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'middleName',
    label: 'Middle Name',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'lastName',
    label: 'Last Name',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'contactNo',
    label: 'Contact',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'emailAddress',
    label: 'Email Id',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'uploadPhoto',
    label: 'Upload Photo',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'admissionNo',
    label: 'Admission No',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'rollNo',
    label: 'Roll No',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'studentType',
    label: 'Student Type',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'batch',
    label: 'Batch',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'section',
    label: 'Section',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'branch',
    label: 'Branch',
    constraint: NotEmpty,
  },
  {
    elementComponentFactory: InputFactory,
    name: 'department',
    label: 'Department',
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
