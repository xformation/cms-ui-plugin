import * as React from 'react';

import {withRouter, RouteComponentProps, Link} from 'react-router-dom';
import {graphql, QueryProps} from 'react-apollo';

import * as StudentListQueryGql from './StudentListQuery.graphql';
import {StudentListQuery, StudentSummaryFragment} from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';

const w180 = {
  width: '180px',
  marginRight: '10px',
};

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
  <div>
    <div className="student-flex">
      <div>
        <label htmlFor="">Department</label>
        <select>
          <option value="">Computer Science</option>
          <option value="">Electric Engineering</option>
          <option value="">Petroleum Engineering</option>
          <option value="">Electronic Engineering</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Year</label>
        <select>
          <option value="">First Year</option>
          <option value="">Second Year</option>
          <option value="">Third Year</option>
          <option value="">Fourth Year</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Section</label>
        <select>
          <option value="">A</option>
          <option value="">B</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Branch</label>
        <select>
          <option value="">Hyderabad</option>
          <option value="">Secunderabad</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Gender</label>
        <select>
          <option value="">Male</option>
          <option value="">Female</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Student Type</label>
        <select>
          <option value="">Scholarship</option>
          <option value="">Management</option>
        </select>
      </div>
      <div className="margin-bott">
        <label htmlFor="">Search</label>
        <input type="search" name="" id="" />
      </div>
    </div>

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
  </div>
);

type StudentListPageOwnProps = RouteComponentProps<{}>;
type StudentListPageProps = {
  data: QueryProps & StudentListQuery;
};

const StudentListPage = ({data: {students}}: StudentListPageProps) => (
  <section className="customCss">
    <div className="m-b-1 dflex bg-heading">
      <h4 className="ptl-06">Class Setup</h4>
      <div>
        <a className="btn btn-primary" style={w180}>
          Create New Student
        </a>
        <a className="btn btn-primary">Save</a>
      </div>
    </div>
    <StudentsTable students={students} />
    {/* <StudentsTable students={students} /> */}
  </section>
);

export default graphql<StudentListQuery, StudentListPageOwnProps, StudentListPageProps>(
  StudentListQueryGql
)(withLoadingHandler(StudentListPage));
