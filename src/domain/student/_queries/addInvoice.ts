import gql from 'graphql-tag';

export const ADD_INVOICE = gql`
  mutation addInvoice($input: AddInvoiceInput) {
    addInvoice(input: $input) {
      invoice {
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
        student {
          id
        }
        academicYearId
      }
    }
  }
`;
