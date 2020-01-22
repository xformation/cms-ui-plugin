import gql from 'graphql-tag';

export const GET_STUDENT_LIST = gql`
  mutation getStudentList($filter: StudentListFilterInput!) {
    getStudentList(filter: $filter) {
      id
      studentName
      studentMiddleName
      studentLastName
      fatherName
      fatherMiddleName
      fatherLastName
      motherName
      motherMiddleName
      motherLastName
      dateOfBirth
      strDateOfBirth
      placeOfBirth
      religion
      caste
      subCaste
      age
      sex
      bloodGroup
      state
      country
      studentContactNumber
      relationWithStudent
      emergencyContactName
      emergencyContactMiddleName
      emergencyContactLastName
      admissionNo
      rollNo
      studentType
      batch {
        batch
      }
      section {
        section
      }
      branch {
        branchName
      }
      department {
        name
      }
    }
  }
`;
