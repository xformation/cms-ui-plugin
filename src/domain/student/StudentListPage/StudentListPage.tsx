import * as React from 'react';

import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { graphql, QueryProps } from 'react-apollo';

import * as StudentListQueryGql from './StudentListQuery.graphql';
import { StudentListQuery, StudentSummaryFragment } from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';

const StudentRow = ({ student }: { student: StudentSummaryFragment }) => (
  <tr key={student.id}>
    <td>{student.sName}</td>
    <td className="hidden-sm hidden-xs">{student.attendance}</td>
  </tr>
);

const StudentsTable = ({ students }: { students: StudentSummaryFragment[] }) => (
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

const StudentListPage = ({ data: { students } }: StudentListPageProps) => (
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
    <div className="hflex bg-heading mt-3">
      <h4>Student Details</h4>
      <div className="hhflex">
        <a href="" className="btn btn-primary btn-width bt-radius">
          Create New Student
        </a>
        <a href="" className="btn btn-primary btn-width bt-radius mx-2">
          Export
        </a>
        <a href="" className="btn btn-primary btn-width bt-radius">
          Save
        </a>
      </div>
    </div>
    <div className="p-1">
      <div className="dflex j-start">
        <div className="fwidth pr-1">
          <label>Department</label>
          <select className="fwidth">
            <option value="">Computer Science</option>
            <option value="">Information Technology</option>
            <option value="">Electrical</option>
          </select>
        </div>
        <div className="fwidth pr-1">
          <label>Year</label>
          <select className="fwidth">
            <option value="">Year 1</option>
            <option value="">Year 2</option>
            <option value="">Year 3</option>
            <option value="">Year 4</option>
          </select>
          {/* <DatePickerComponent /> */}
          {/* <input type="date" name="" id="" value="12/06/19" /> */}
        </div>
        <div className="fwidth">
          <label>Semester</label>
          <select className="fwidth">
            <option value="">Div - 1</option>
            <option value="">Div - 2</option>
          </select>
        </div>
        <div className="fwidth pr-1">
          <label>Section</label>
          <select className="fwidth">
            <option value="">Div - 1</option>
            <option value="">Div - 2</option>
          </select>
        </div>
        <div className="fwidth pr-1">
          <label>Gender</label>
          <select className="fwidth">
            <option value="">Male</option>
            <option value="">Female</option>
          </select>
        </div>
        <div className="fwidth pr-1">
          <label>Student Type</label>
          <select className="fwidth">
            <option value="">Scholarship</option>
            <option value="">Management</option>
          </select>
        </div>
      </div>
      <h3 className="bg-heading mt-3 p-1 mb-0">Computer Science Sem 1</h3>
      <table className="fwidth">
        <thead>
          <th>
            <input type="checkbox" />
          </th>
          <th>Name</th>
          <th>Student</th>
          <th>Department</th>
          <th>Year</th>
          <th>Section</th>
          <th>Gender</th>
          <th>Type</th>
          <th>Primary</th>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="checkbox" />
            </td>
            <td>
              <a href="">Andrew Russel</a>
            </td>
            <td>2019-21</td>
            <td>Robotic Science</td>
            <td>Second</td>
            <td>C</td>
            <td>Male</td>
            <td>Scholarship</td>
            <td>0000-111-222</td>
          </tr>

          <tr>
            <td>
              <input type="checkbox" />
            </td>
            <td>
              <a href="">Jeremy Rose</a>
            </td>
            <td>2019-21</td>
            <td>Electronics Science</td>
            <td>Third</td>
            <td>C</td>
            <td>Male</td>
            <td>Scholarship</td>
            <td>0000-111-222</td>
          </tr>

        </tbody>
      </table>
    </div>

    <section className="plugin-bg-white">
      <h3 className="bg-heading p-1">
        <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" /> Admin
        - Student Management
    </h3>
      <div className="hflex bg-heading mt-3">
        <h4>Student Profile</h4>
        <div className="hhflex">
          <a href="" className="btn btn-primary btn-width bt-radius">
            Save
        </a>
        </div>
      </div>
      <div className="grid">
        <div className="leftbar">
          <img src="/public/img/cubes.png" alt="" />
          <div className="form-justify">
            <label htmlFor="">*Admission No:</label><input className="border-plugin input-width" type="text" />
          </div>
          <div className="form-justify">

            <label htmlFor="">*Student Id:</label><input className="border-plugin input-width" type="text" />
          </div>
          <div className="form-justify">
            <label htmlFor="">*Department:</label>
            <select name="" id="" className="input-width">
              <option value="">ECE</option>
              <option value="">EEE</option>
              <option value="">CSE</option>
            </select>
          </div>
          <div className="form-justify">
            <label htmlFor="">*Year:</label>
            <select name="" id="" className="input-width">
              <option value="">Year 1</option>
              <option value="">Year 2</option>
              <option value="">Year 3</option>
              <option value="">Year 4</option>
            </select>
          </div>
          <div className="form-justify">
            <label htmlFor="">*Semester:</label>
            <select name="" id="" className="input-width">
              <option value="">Sem 1</option>
              <option value="">Sem 2</option>
              <option value="">Sem 3</option>
              <option value="">Sem 4</option>
            </select>
          </div>
          <div className="form-justify">
            <label htmlFor="">*Section:</label>
            <select name="" id="" className="input-width">
              <option value="">Sec 1</option>
              <option value="">Sec 2</option>
              <option value="">Sec 3</option>
              <option value="">Sec 4</option>
            </select>
          </div>
          <div className="form-justify">
            <label htmlFor="">Student Type:<input type="text" className="input-width border-plugin" /></label>
          </div>
        </div>
        <div className="rightbar"><form action="" className="form-grid">
          <div>
            <label htmlFor="">Name*</label>
            <input className="border-plugin fwidth" type="text" />
          </div>
          <div>
            <label htmlFor="">Middle Name*</label>
            <input className="border-plugin fwidth" type="text" />
          </div>
          <div>
            <label htmlFor="">Last Name*</label>
            <input className="border-plugin fwidth" type="text" />
          </div>
          <div>
            <label htmlFor="">Father Name*</label>
            <input className="border-plugin fwidth" type="text" />
          </div>
          <div>
            <label htmlFor="">Father Middle Name*</label>
            <input className="border-plugin fwidth" type="text" />
          </div>
          <div>
            <label htmlFor="">Father Last Name*</label>
            <input className="border-plugin fwidth" type="text" />
          </div>
          <div>
            <label htmlFor="">Mother Name*</label>
            <input className="border-plugin fwidth" type="text" />
          </div>
          <div>
            <label htmlFor="">Mother Middle Name*</label>
            <input className="border-plugin fwidth" type="text" />
          </div>
          <div>
            <label htmlFor="">Mother Last Name*</label>
            <input className="border-plugin fwidth" type="text" />
          </div>

          <div>
            <label htmlFor="">Adhar No*</label>
            <input className="border-plugin fwidth" type="text" />
          </div>
          <div>
            <label htmlFor="">Date Of Birth*</label>
            <input className="border-plugin fwidth" type="text" />
          </div>
          <div>
            <label htmlFor="">Place Of Birth*</label>
            <input className="border-plugin fwidth" type="text" />
          </div>
          <div>
            <label htmlFor="">Religion*</label>
            <input className="border-plugin fwidth" type="text" />
          </div>
          <div>
            <label htmlFor="">Cast*</label>
            <input className="border-plugin fwidth" type="text" />
          </div>
          <div>
            <label htmlFor="">Subcasat*</label>
            <input className="border-plugin fwidth" type="text" />
          </div>
          <div>
            <label htmlFor="">Age*</label>
            <input className="border-plugin fwidth" type="text" />
          </div>
          <div>
            <label htmlFor="">Sex*</label>
            <input className="border-plugin fwidth" type="text" />
          </div>
          <div>
            <label htmlFor="">Blood Group*</label>
            <input className="border-plugin fwidth" type="text" />
          </div>

        </form></div>
      </div>
    </section>
  </section >
);
export default graphql<StudentListQuery, StudentListPageOwnProps, StudentListPageProps>(
  StudentListQueryGql
)(withLoadingHandler(StudentListPage));
