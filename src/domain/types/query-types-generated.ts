export type AddFeeInput = {
  id?: number | null;
  feeParticularsName?: number | null;
  feeParticularDesc?: number | null;
  studentType?: number | null;
  gender?: number | null;
  amount?: number | null;
  feeCategory?: number | null;
  batch?: number | null;
  facility?: number | null;
  transportRoute?: number | null;
  college?: number | null;
  department?: number | null;
  branch?: number | null;
  academicYear?: number | null;
};

export type AddFeeMutationVariables = {
  input: AddFeeInput;
};

export type AddFeeMutation = {
  addFee: {
    fee: {
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
  };
};

export type FeeListQuery = {
  fees: Array<{
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
  }>;
};

export type FeeQueryVariables = {
  feeId: number;
};

export type FeeQuery = {
  fee: {
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
};

export type FeeFragment = {
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

export type FeeDetailsFragment = {
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

export type FeeSummaryFragment = {
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

export type UpdateFeeInput = {
  id?: number | null;
  feeParticularsName?: number | null;
  feeParticularDesc?: number | null;
  studentType?: number | null;
  gender?: number | null;
  amount?: number | null;
  feeCategory?: number | null;
  batch?: number | null;
  facility?: number | null;
  transportRoute?: number | null;
  college?: number | null;
  department?: number | null;
  branch?: number | null;
  academicYear?: number | null;
};

export type UpdateFeeMutationVariables = {
  input: UpdateFeeInput;
};

export type UpdateFeeMutation = {
  updateFee: {
    fee: {
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
  };
};

/* tslint:enable */
// Invoice
export type InvoiceQuery = {
  invoice: {
    id: number;
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
};

export type InvoiceSummaryFragment = {
  id: number;
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

export type InvoiceDetailsFragment = {
  id: number;
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
export type InvoiceFragment = {
  id: number;
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

export type InvoiceQueryVariables = {
  invoiceId: number;
};
export type InvoiceListQuery = {
  invoices: Array<{
    id: number;
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
  }>;
};
// Invoice
