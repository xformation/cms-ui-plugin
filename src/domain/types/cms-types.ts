// ------------------------------------ REACT ------------------------------------
export type ReactFunctionOrComponentClass<P> =
  | React.ComponentClass<P>
  | React.StatelessComponent<P>;

// --------------------------------------

export type StudentData = {
  // id: string;
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
  emergencyContactName: string;
  emergencyContactMiddleName: string;
  emergencyContactLastName: string;
  emergencyContactNo: string;
  emergencyContactEmailAddress: string;
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
    branchName: any;
  };
  department: {
    name: any;
  };
};

export type InvoiceData = {
  // id: number;
  invoiceNumber: any;
  amountPaid: number;
  paymentDate: number;
  nextPaymentDate: number;
  outStandingAmount: number;
  modeOfPayment: string;
  chequeNumber: number;
  demandDraftNumber: number;
  onlineTxnRefNumber: number;
  paymentStatus: string;
  comments: string;
  updatedBy: string;
  feeCategory: {
    id: any;
  };
  feeDetails: {
    id: any;
  };

  dueDate: {
    id: any;
  };
  paymentRemainder: {
    id: any;
  };

  college: {
    id: any;
  };
  branch: {
    id: any;
  };
  student: {
    id: any;
  };
  academicYear: {
    id: any;
  };
};
export type FeeData = {
  id: number;
  feeParticularsName: number;
  feeParticularDesc: number;
  studentType: number;
  gender: number;
  amount: number;
  feeCategory: number;
  batch: number;
  facility: number;
  transportRoute: number;
  college: number;
  department: number;
  branch: number;
  academicYear: number;
};
