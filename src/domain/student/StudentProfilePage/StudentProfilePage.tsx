import * as React from 'react';

import {withRouter, RouteComponentProps, Link} from 'react-router-dom';
import {graphql, QueryProps} from 'react-apollo';

import * as StudentListQueryGql from './StudentListQuery.graphql';
import {StudentListQuery, StudentSummaryFragment} from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';

const StudentRow = ({student}: {student: StudentSummaryFragment}) => (
  <tr key={student.id}>
    <td>{student.studentName}</td>
    <td className="hidden-sm hidden-xs">{student.fatherName}</td>
    <td className="hidden-sm hidden-xs">{student.fatherMiddleName}</td>
    <td className="hidden-sm hidden-xs">{student.fatherLastName}</td>
  </tr>
);

const StudentsTable = ({students}: {students: StudentSummaryFragment[]}) => (
  <table className="striped-table">
    <thead>
      <tr>
        <th>Student Name</th>
        <th>Attendance</th>
        <th>Attendance</th>
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

const StudentProfilePage = ({data: {students}}: StudentListPageProps) => (
  // <section className="customCss">
  //   <h2 className="heading">
  //     {students.length}
  //     Students found
  //   </h2>
  //   <StudentsTable students={students} />
  //   <Link to={`/plugins/xformation-cms-panel/page/addstudent`} className="btn customButton">
  //     Add Student
  //     </Link>
  // </section>
  <section className="plugin-bg-white p-1">
    <h3 className="bg-heading p-1">
      <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" /> Admin
      - Student Overview
    </h3>
    <div className="b-1 m-1">
      <div className="main-grid p-2">
        <div className="left-grid">
          <img src="/public/img/cubes.png" alt="" />
        </div>
        <div className="righ-grid">
          <div className="heading-flex">
            <h3>Jeremy Andrew Rose</h3>
            <h5 className="hflex-h5">
              Contact No: <span>878545625</span>
            </h5>
            <h5>
              Primary Contact No: <span>878545625</span>
            </h5>
          </div>
          <div className="next-div">
            <span>
              Admission No: <span>55951426</span>
            </span>
            <span>
              Roll No: <span>2019-521</span>
            </span>
            <span>
              Class: <span>First Year</span>
            </span>
            <span>
              Student Id: <span>951426</span>
            </span>
            <span>
              Department: <span>Computer Science</span>
            </span>
            <span>
              Section: <span>C</span>
            </span>
          </div>
          <div className="buttons">
            <a className="btn btn-primary">Profile</a>
            <a href="" className="btn btn-disable">
              Details
            </a>
            <a href="" className="btn btn-disable">
              Academic
            </a>
            <a href="" className="btn btn-disable">
              Fee
            </a>
            <a href="" className="btn btn-disable">
              Reports
            </a>
            <a href="" className="btn btn-disable">
              ID Card
            </a>
            <a href="" className="btn btn-disable">
              Documents
            </a>
            <a href="" className="btn btn-disable">
              Transport
            </a>
          </div>
        </div>
      </div>
      <div className="main-details m-1 p-2 b-1">
        <div className="family-details">
          <h5>
            Fathers Name: <input type="text" placeholder="Fathers Full Name" />
          </h5>
          <h5>
            Fathers Contact: <input type="text" placeholder="895865854" />
          </h5>
          <h5>
            Email Address:<input type="text" placeholder="student@father.com" />
          </h5>
          <h5>
            Mothers Name: <input type="text" placeholder="Mothers Full Name" />
          </h5>
          <h5>
            Mothers Contact: <input type="text" placeholder="843545156" />
          </h5>
          <h5>
            Email Address: <input type="text" placeholder="student@mother.com" />
          </h5>
        </div>
        <div className="contact-details">
          <h5>
            Address Line 1: <input type="text" placeholder="Address" />
          </h5>
          <h5>
            Address Line 2: <input type="text" placeholder="Address" />
          </h5>
          <h5>
            Town:<input type="text" placeholder="Town" />
          </h5>
          <h5>
            State: <input type="text" placeholder="State" />
          </h5>
          <h5>
            Country: <input type="text" placeholder="Country" />
          </h5>
          <h5>
            Pin Code: <input type="text" placeholder="500008" />
          </h5>
        </div>
        <div className="id-details">
          <h5>
            Adhar No: <input type="text" placeholder="Adhar No" />
          </h5>
          <h5>
            Date Of Birth: <input type="text" placeholder="1/1/2000" />
          </h5>
          <h5>
            Place Of Birth:<input type="text" placeholder="Hyderabad" />
          </h5>
          <h5>
            Religion: <input type="text" placeholder="Religion" />
          </h5>
          <h5>
            Cast: <input type="text" placeholder="Cast" />
          </h5>
          <h5>
            Sub Cast: <input type="text" placeholder="Sub Cast" />
          </h5>
          <h5>
            Blood Group: <input type="text" placeholder="Blood Group" />
          </h5>
          <h5>
            Sex: <input type="text" placeholder="Male/Female" />
          </h5>
          <h5>
            Student Type: <input type="text" placeholder="Student Type" />
          </h5>
        </div>
      </div>
    </div>
  </section>
);
export default graphql<StudentListQuery, StudentListPageOwnProps, StudentListPageProps>(
  StudentListQueryGql
)(withLoadingHandler(StudentProfilePage));
