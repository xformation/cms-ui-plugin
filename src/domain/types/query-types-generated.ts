/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type AddInstituteInput = {
  name?: string | null;
  code?: string | null;
  year?: any | null;
};

export type UpdateInstituteInput = {
  instituteId: number;
  name?: string | null;
  code?: string | null;
  year?: any | null;
};

export type AddInstituteMutationVariables = {
  input: AddInstituteInput;
};

export type AddInstituteMutation = {
  addInstitute: {
    institute: {
      id: number;
      name: string;
      code: string;
      year: any;
    };
  };
};

export type InstituteListQuery = {
  // Return all known Pet Institutes
  institutes: Array<{
    id: number;
    name: string;
    code: string;
    year: any;
  }>;
};

export type InstituteQueryVariables = {
  instituteId: number;
};

export type InstituteQuery = {
  institute: {
    id: number;
    name: string;
    code: string;
    year: any;
  };
};

export type UpdateInstituteMutationVariables = {
  input: UpdateInstituteInput;
};

export type UpdateInstituteMutation = {
  updateInstitute: {
    institute: {
      id: number;
      name: string;
      code: string;
      year: any;
    };
  };
};

export type InstituteFragment = {
  id: number;
  name: string;
  code: string;
  year: any;
};

export type InstituteDetailsFragment = {
  id: number;
  name: string;
  code: string;
  year: any;
};

export type InstituteSummaryFragment = {
  id: number;
  name: string;
  code: string;
  year: any;
};

export type FacultyListQuery = {
  // Return all known Pet Institutes
  faculties: Array<{
    id: number;
    name: string;
    lastName: string;
    address: string;
    mail: string;
    designation: string;
    mobile: any;
    status: string;
  }>;
};

export type FacultyQueryVariables = {
  facultyId: number;
};

export type FacultyQuery = {
  faculty: {
    id: number;
    name: string;
    lastName: string;
    address: string;
    mail: string;
    designation: string;
    mobile: any;
    status: string;
  };
};

export type FacultyFragment = {
  id: number;
  name: string;
  lastName: string;
  address: string;
  mail: string;
  designation: string;
  mobile: any;
  status: string;
};

export type FacultyDetailsFragment = {
  id: number;
  name: string;
  lastName: string;
  address: string;
  mail: string;
  designation: string;
  mobile: any;
  status: string;
};

export type FacultySummaryFragment = {
  id: number;
  name: string;
  lastName: string;
  address: string;
  mail: string;
  designation: string;
  mobile: any;
  status: string;
};

export type AddFacultyInput = {
  name?: string | null;
  lastName?: string | null;
  address?: string | null;
  mail?: string | null;
  designation?: string | null;
  mobile?: any | null;
  status?: string | null;
};

export type UpdateFacultyInput = {
  facultyId: number;
  name?: string | null;
  lastName?: string | null;
  address?: string | null;
  mail?: string | null;
  designation?: string | null;
  mobile?: any | null;
  status?: string | null;
};

export type AddFacultyMutationVariables = {
  input: AddFacultyInput;
};

export type AddFacultyMutation = {
  addFaculty: {
    faculty: {
      id: number;
      name: string;
      lastName: string;
      address: string;
      mail: string;
      designation: string;
      mobile: any;
      status: string;
    };
  };
};
export type AddStudentInput = {
  id?: string | null;
  sName?: string | null;
  attendance?: string | null;
};

export type AddStudentMutationVariables = {
  input: AddStudentInput;
};

export type AddStudentMutation = {
  addStudent: {
    student: {
      id: number;
      sName: string;
      attendance: boolean;
    };
  };
};

export type UpdateFacultyMutationVariables = {
  input: UpdateFacultyInput;
};

export type UpdateFacultyMutation = {
  updateFaculty: {
    faculty: {
      id: number;
      name: string;
      lastName: string;
      address: string;
      mail: string;
      designation: string;
      mobile: any;
      status: string;
    };
  };
};

export type RemoveFacultyInput = {
  facultyId: number;
};

export type RemoveFacultyMutationVariables = {
  input: RemoveFacultyInput;
};

export type RemoveFacultyMutation = {
  removeFaculty: {
    faculties: Array<{
      id: number;
      name: string;
      lastName: string;
      address: string;
      mail: string;
      designation: string;
      mobile: any;
      status: string;
    }>;
  };
};

/* Location */

export type locationListQuery = {
  locations: Array<{
    id: string;
    name: string;
    address: string;
    appliesTo: string;
  }>;
};

export type locationQueryVariables = {
  locationId: any;
};

export type locationQuery = {
  location: {
    id: any;
    name: string;
    address: string;
    appliesTo: string;
  };
};

export type locationDetailsFragment = {
  id: any;
  name: string;
  address: string;
  appliesTo: string;
};

export type locationSummaryFragment = {
  id: any;
  name: string;
  address: string;
  appliesTo: string;
};

/* Student */

export type StudentListQuery = {
  // Return all known Pet Institutes
  students: Array<{
    id: number;
    studentName: string;
    fatherName: string;
    fatherMiddleName: string;
    fatherLastName: string;
    motherName: string;
    motherMiddleName: string;
    motherLastName: string;
    aadharNo: number;
    dateOfBirth: number;
    placeOfBirth: string;
    religion: string;
    caste: string;
    subCaste: string;
    age: number;
    sex: string;
    bloodGroup: string;
    addressLineOne: string;
    addressLineTwo: string;
    addressLineThree: string;
    town: string;
    state: string;
    country: string;
    pincode: number;
    studentContactNumber: number;
    alternateContactNumber: number;
    studentEmailAddress: string;
    alternateEmailAddress: string;
    relationWithStudent: string;
    name: string;
    middleName: string;
    lastName: string;
    contactNo: number;
    emailAddress: string;
    uploadPhoto: string;
    admissionNo: number;
    rollNo: number;
    studentType: string;
    batch: {
      batch: any;
    };
    section: {
      section: any;
    };
    branch: {
      branchName: string;
    };
    department: {
      name: string;
    };
  }>;
};

export type StudentQueryVariables = {
  studentId: number;
};

export type StudentQuery = {
  student: {
    id: number;
    studentName: string;
    fatherName: string;
    fatherMiddleName: string;
    fatherLastName: string;
    motherName: string;
    motherMiddleName: string;
    motherLastName: string;
    aadharNo: number;
    dateOfBirth: number;
    placeOfBirth: string;
    religion: string;
    caste: string;
    subCaste: string;
    age: number;
    sex: string;
    bloodGroup: string;
    addressLineOne: string;
    addressLineTwo: string;
    addressLineThree: string;
    town: string;
    state: string;
    country: string;
    pincode: number;
    studentContactNumber: number;
    alternateContactNumber: number;
    studentEmailAddress: string;
    alternateEmailAddress: string;
    relationWithStudent: string;
    name: string;
    middleName: string;
    lastName: string;
    contactNo: number;
    emailAddress: string;
    uploadPhoto: string;
    admissionNo: number;
    rollNo: number;
    studentType: string;
    batch: {
      batch: any;
    };
    section: {
      section: any;
    };
    branch: {
      branchName: string;
    };
    department: {
      name: string;
    };
  };
};

export type StudentFragment = {
  id: number;
  studentName: string;
  fatherName: string;
  fatherMiddleName: string;
  fatherLastName: string;
  motherName: string;
  motherMiddleName: string;
  motherLastName: string;
  aadharNo: number;
  dateOfBirth: number;
  placeOfBirth: string;
  religion: string;
  caste: string;
  subCaste: string;
  age: number;
  sex: string;
  bloodGroup: string;
  addressLineOne: string;
  addressLineTwo: string;
  addressLineThree: string;
  town: string;
  state: string;
  country: string;
  pincode: number;
  studentContactNumber: number;
  alternateContactNumber: number;
  studentEmailAddress: string;
  alternateEmailAddress: string;
  relationWithStudent: string;
  name: string;
  middleName: string;
  lastName: string;
  contactNo: number;
  emailAddress: string;
  uploadPhoto: string;
  admissionNo: number;
  rollNo: number;
  studentType: string;
  batch: {
    batch: any;
  };
  section: {
    section: any;
  };
  branch: {
    branchName: string;
  };
  department: {
    name: string;
  };
};

export type StudentDetailsFragment = {
  id: number;
  studentName: string;
  fatherName: string;
  fatherMiddleName: string;
  fatherLastName: string;
  motherName: string;
  motherMiddleName: string;
  motherLastName: string;
  aadharNo: number;
  dateOfBirth: number;
  placeOfBirth: string;
  religion: string;
  caste: string;
  subCaste: string;
  age: number;
  sex: string;
  bloodGroup: string;
  addressLineOne: string;
  addressLineTwo: string;
  addressLineThree: string;
  town: string;
  state: string;
  country: string;
  pincode: number;
  studentContactNumber: number;
  alternateContactNumber: number;
  studentEmailAddress: string;
  alternateEmailAddress: string;
  relationWithStudent: string;
  name: string;
  middleName: string;
  lastName: string;
  contactNo: number;
  emailAddress: string;
  uploadPhoto: string;
  admissionNo: number;
  rollNo: number;
  studentType: string;
  batch: {
    batch: any;
  };
  section: {
    section: any;
  };
  branch: {
    branchName: string;
  };
  department: {
    name: string;
  };
};

export type StudentSummaryFragment = {
  id: number;
  studentName: string;
  fatherName: string;
  fatherMiddleName: string;
  fatherLastName: string;
  motherName: string;
  motherMiddleName: string;
  motherLastName: string;
  aadharNo: number;
  dateOfBirth: number;
  placeOfBirth: string;
  religion: string;
  caste: string;
  subCaste: string;
  age: number;
  sex: string;
  bloodGroup: string;
  addressLineOne: string;
  addressLineTwo: string;
  addressLineThree: string;
  town: string;
  state: string;
  country: string;
  pincode: number;
  studentContactNumber: number;
  alternateContactNumber: number;
  studentEmailAddress: string;
  alternateEmailAddress: string;
  relationWithStudent: string;
  name: string;
  middleName: string;
  lastName: string;
  contactNo: number;
  emailAddress: string;
  uploadPhoto: string;
  admissionNo: number;
  rollNo: number;
  studentType: string;
  batch: {
    batch: any;
  };
  section: {
    section: any;
  };
  branch: {
    branchName: string;
  };
  department: {
    name: string;
  };
};

/* tslint:enable */
