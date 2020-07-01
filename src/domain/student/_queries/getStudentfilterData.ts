import gql from 'graphql-tag';

export const GET_STUDENT_FILTER_DATA = gql`
  query createStudentFilterDataCache {
    createStudentFilterDataCache {
      branches {
        id
        branchName
      }
      departments {
        id
        name
        branch {
          id
        }
        academicYear {
          id
        }
      }
      batches {
        id
        batch
        department {
          id
        }
      }
      sections {
        id
        section
        batch {
          id
        }
      }
    }
  }
`;
