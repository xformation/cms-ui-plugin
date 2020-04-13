import gql from 'graphql-tag';

export const GET_INVOICE_LIST = gql`
  query($studentId: Long, $branchId: Long) {
    getInvoices(studentId: $studentId, branchId: $branchId) {
      id
      invoiceNumber
      amountPaid
      outStandingAmount
      modeOfPayment
      chequeNumber
      demandDraftNumber
      onlineTxnRefNumber
      paymentStatus
      comments
      updatedBy
      branchId
      strPaymentDate
      strNextPaymentDate
      strUpdatedOn
      bank
    }
  }
`;
