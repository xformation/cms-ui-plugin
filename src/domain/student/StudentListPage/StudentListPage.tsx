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
        <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '}
        Admin - Student Management
      </h3>
      <div className="hflex bg-heading mt-3 mr-18 ml-18">
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
            <label htmlFor="">*Admission No:</label>
            <input className="border-plugin input-width" type="text" />
          </div>
          <div className="form-justify">
            <label htmlFor="">*Student Id:</label>
            <input className="border-plugin input-width" type="text" />
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
            <label htmlFor="">Student Type:</label>
            <input type="text" className="input-width border-plugin" />
          </div>
        </div>
        <div className="rightbar">
          <h3 className="bg-heading p-1 b-1">Personal Details</h3>
          <form action="" className="form-grid">
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
          </form>

          <h3 className="bg-heading p-1 b-1">Contact Details</h3>
          <form action="" className="form-grid">
            <div>
              <label htmlFor="">Address Line 1*</label>
              <input className="border-plugin fwidth" type="text" />
            </div>
            <div>
              <label htmlFor="">Address Line 2</label>
              <input className="border-plugin fwidth" type="text" />
            </div>
            <div>
              <label htmlFor="">Town*</label>
              <input className="border-plugin fwidth" type="text" />
            </div>
            <div>
              <label htmlFor="">State*</label>
              <input className="border-plugin fwidth" type="text" />
            </div>
            <div>
              <label htmlFor="">Country*</label>
              <input className="border-plugin fwidth" type="text" />
            </div>
            <div>
              <label htmlFor="">Pin Code*</label>
              <input className="border-plugin fwidth" type="text" />
            </div>
            <div>
              <label htmlFor="">Contact Number*</label>
              <input className="border-plugin fwidth" type="text" />
            </div>
            <div>
              <label htmlFor="">Alternate Contact Number 1</label>
              <input className="border-plugin fwidth" type="text" />
            </div>
            <br />
            <div>
              <label htmlFor="">Email Address*</label>
              <input className="border-plugin fwidth" type="text" />
            </div>

            <div>
              <label htmlFor="">Alternate Email Address</label>
              <input className="border-plugin fwidth" type="text" />
            </div>
          </form>

          <h3 className="bg-heading p-1 b-1">Primary And Emergency Contact Details</h3>
          <form action="">
            <div className="reln">
              <label htmlFor="">Relation with Student*</label>
              <select name="" id="">
                <option value="">Father</option>
                <option value="">Mother</option>
              </select>
            </div>
            <div className="form-grid">
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
                <label htmlFor="">Contact Number*</label>
                <input className="border-plugin fwidth" type="text" />
              </div>
              <div>
                <label htmlFor="">Email Address*</label>
                <input className="border-plugin fwidth" type="text" />
              </div>
              <div className="rel-radio">
                <label htmlFor="">Last Name*</label>
                <input className="border-plugin fwidth" type="radio" />
              </div>
            </div>
          </form>
          <hr />
          <form action="">
            <div className="reln">
              <label htmlFor="">Relation with Student*</label>
              <select name="" id="">
                <option value="">Father</option>
                <option value="">Mother</option>
              </select>
            </div>
            <div className="form-grid">
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
                <label htmlFor="">Contact Number*</label>
                <input className="border-plugin fwidth" type="text" />
              </div>
              <div>
                <label htmlFor="">Email Address*</label>
                <input className="border-plugin fwidth" type="text" />
              </div>
              <div className="rel-radio">
                <label htmlFor="">Last Name*</label>
                <input className="border-plugin fwidth" type="radio" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
    <section className="plugin-bg-white">
      <div className="hflex bg-heading mt-3 mr-18 ml-18">
        <h4>Student Profile</h4>
        <div className="hhflex">
          <a href="" className="btn btn-primary btn-width bt-radius">
            Save
          </a>
        </div>
      </div>
      <div className="main-grid">
        <div className="left-grid">
          <img src="" alt="" />
        </div>
        <div className="righ-grid">
          <div className="heading-flex">
            <h3>Jeremy Andrew Rose</h3>
            <span>Contact No 9878545625</span>
            <span>Primary Contact Father 9878545625</span>
          </div>
          <div className="next-h3">
            <span>Admission No: 951426</span>
            <span>Roll No: 2019-521</span>
            <span>Class: First Year</span>
            <span>Student Id: 951426</span>
            <span>Department: Computer Science</span>
            <span>Section: C</span>
          </div>
        </div>
      </div>
    </section>
  </section>
);
export default graphql<StudentListQuery, StudentListPageOwnProps, StudentListPageProps>(
  StudentListQueryGql
)(withLoadingHandler(StudentListPage));
