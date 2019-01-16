import * as React from 'react';

import {withRouter, RouteComponentProps, Link} from 'react-router-dom';
import {graphql, QueryProps} from 'react-apollo';

import * as StudentListQueryGql from './StudentListQuery.graphql';
import {StudentListQuery, StudentSummaryFragment} from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';

const StudentRow = ({student}: {student: StudentSummaryFragment}) => (
  <tr key={student.id}>
    <td>{student.sName}</td>
    <td className="hidden-sm hidden-xs">{student.attendance}</td>
  </tr>
);

const StudentsTable = ({students}: {students: StudentSummaryFragment[]}) => (
  <table className="striped-table">
    <thead>
      <tr>
        <th>Student Name</th>
        <th>Attendance</th>
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
  // <section className="customCss">
  //   <h2 className="heading">
  //     {/* {students.length}  */}
  //     Students found
  //   </h2>
  //   <StudentsTable students={students} />
  //   {/* <Link to={`/plugins/xformation-petclinic-panel/page/addstudent`} className="btn customButton">
  //     Add Student
  //     </Link> */}
  // </section>;
  <section className="plugin-bg-white">
    <h3 className="bg-heading p-1">
      <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" /> Admin
      - Student Overview
    </h3>
    <div className="p-1">
      <div className="dflex j-start">
        <div className="fwidth">
          <label>Year</label>
          <select className="fwidth">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
          </select>
          {/* <DatePickerComponent /> */}
          {/* <input type="date" name="" id="" value="12/06/19" /> */}
        </div>
        <div className="fwidth pr-1">
          <label>Filter By</label>
          <select className="fwidth">
            <option value="">Computer Science</option>
            <option value="">Information Technology</option>
            <option value="">Electrical</option>
          </select>
        </div>
        <div className="fwidth">
          <label>Semester</label>
          <select className="fwidth">
            <option value="">Sem - 1</option>
            <option value="">Sem - 2</option>
          </select>
        </div>
      </div>
      <h3 className="bg-heading mt-3 p-1 mb-0">Computer Science Sem 1</h3>
      <table className="fwidth">
        <thead>
          <th>Id</th>
          <th>Student Name</th>
          <th>Roll No</th>
        </thead>
        <tbody>
          <tr>
            <td>01</td>
            <td>Mustafa</td>
            <td>22</td>
          </tr>
          <tr>
            <td>02</td>
            <td>Mohammed</td>
            <td>11</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
);
export default graphql<StudentListQuery, StudentListPageOwnProps, StudentListPageProps>(
  StudentListQueryGql
)(withLoadingHandler(StudentListPage));
