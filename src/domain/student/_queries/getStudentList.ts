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
      studentAadharNo
      studentPanNo
      dateOfBirth
      strDateOfBirth
      placeOfBirth
      religion
      caste
      subCaste
      age
      sex
      studentLocalAddress
      studentPermanentAddress
      city
      state
      country
      pinCode
      bloodGroup
      studentPrimaryCellNumber
      studentAlternateCellNumber
      studentPrimaryEmailId
      studentAlternateEmailId
      relationWithStudent
      emergencyContactName
      emergencyContactMiddleName
      emergencyContactLastName
      emergencyContactCellNumber
      emergencyContactEmailId
      admissionNo
      enrollmentNo
      rollNo
      studentType
      fatherCellNumber
      fatherEmailId
      motherCellNumber
      motherEmailId
      status
      comments
      department {
        id
        name
      }
      batch {
        id
        batch
      }
      section {
        id
        section
      }
    }
  }
`;
