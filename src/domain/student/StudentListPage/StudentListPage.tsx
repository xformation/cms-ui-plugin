import * as React from 'react';

import {withRouter, RouteComponentProps, Link} from 'react-router-dom';
import {graphql, QueryProps} from 'react-apollo';

import * as StudentListQueryGql from './StudentListQuery.graphql';
import {StudentListQuery, StudentSummaryFragment} from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';

const StudentRow = ({student}: {student: StudentSummaryFragment}) => (
  <tr key={student.id}>
    <td>
      <input type="checkbox" name="" id="" />
    </td>

    <td>
      <Link
        className="table-link"
        to={`/plugins/xformation-petclinic-panel/page/student?id=${student.id}`}
      >
        {student.studentName}
      </Link>
    </td>
    <td>{student.rollNo}</td>
    <td>{student.id}</td>
    <td>{student.department.name}</td>
    <td>{student.batch.batch}</td>
    <td>{student.section.section}</td>
    <td>{student.sex}</td>
    <td>{student.studentType}</td>
    <td>{student.contactNo}</td>
  </tr>
);

const StudentsTable = ({students}: {students: StudentSummaryFragment[]}) => (
  <table id="studentlistpage" className="striped-table fwidth bg-white">
    <thead>
      <tr>
        <th>
          <input type="checkbox" name="" id="" />
        </th>
        <th>Student Name</th>
        <th>Roll No</th>
        <th>Student Id</th>
        <th>Department</th>
        <th>Year</th>
        <th>Section</th>
        <th>Gender</th>
        <th>Type</th>
        <th>Primary Contact</th>
      </tr>
    </thead>
    <tbody>
      {students.map(student => <StudentRow key={student.id} student={student} />)}
    </tbody>
  </table>
);

type StudentListPageOwnProps = RouteComponentProps<{}>;
type StudentListPageProps = {
  data: QueryProps & StudentListQuery;
};

const StudentListPage = ({data: {students}}: StudentListPageProps) => (
  <section className="customCss">
    <h2 className="bg-heading">Student Details</h2>
    <StudentsTable students={students} />
    {/* <StudentsTable students={students} /> */}
  </section>
);

export default graphql<StudentListQuery, StudentListPageOwnProps, StudentListPageProps>(
  StudentListQueryGql
)(withLoadingHandler(StudentListPage));
