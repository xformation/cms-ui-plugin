import * as React from 'react';

import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { graphql, QueryProps } from 'react-apollo';

import * as StudentListQueryGql from './StudentListQuery.graphql';
import { StudentListQuery, StudentSummaryFragment } from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';

const w180 = {
  width: '180px',
  marginRight: '10px',
};

type StudentTableProps = {
  students: any
};

type StudentTableStates = {
  students: any
};

class StudentsTable extends React.Component<StudentTableProps, StudentTableStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      students: props.students
    };
    this.checkAllStudents = this.checkAllStudents.bind(this);
    this.onClickCheckbox = this.onClickCheckbox.bind(this);
  }

  checkAllStudents(e: any) {
    const target = e.target;
    const { students } = this.state;
    const length = students.length;
    for (let i = 0; i < length; i++) {
      students[i].isChecked = target.checked;
    }
    this.setState({
      students
    });
  }

  onClickCheckbox(index: any, e: any) {
    const { target } = e;
    const { students } = this.state;
    const student = students[index];
    if (student) {
      student.isChecked = target.checked;
      this.setState({
        students
      });
    }
  }

  createStudentRows(students: any) {
    const length = students.length;
    const retVal = [];
    for (let i = 0; i < length; i++) {
      const student = students[i];
      retVal.push(
        <tr key={student.id}>
          <td>
            <input onClick={(e: any) => this.onClickCheckbox(i, e)} checked={student.isChecked} type="checkbox" name="" id="" />
          </td>
          <td>
            <Link
              className="table-link link-color"
              to={`/plugins/ems-student/page/student?id=${student.id}`}
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
          <td>{student.emergencyContactNo}</td>
        </tr>
      );
    }
    return retVal;
  }

  render() {
    const { students } = this.state;
    return (
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
                <input type="checkbox" onClick={(e: any) => this.checkAllStudents(e)} value="checkedall" name="" id="" />
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
            {this.createStudentRows(students)}
          </tbody>
        </table>
      </div>
    );
  }
}

function exportStudents(students: any) {
  const length = students.length;
  const studentsToExport = [];
  for (let i = 0; i < length; i++) {
    const student = students[i];
    if (student.isChecked) {
      studentsToExport.push(student);
    }
  }
  if (studentsToExport.length > 0) {
    var csvContent = convertArrayOfObjectsToCSV(studentsToExport);
    download(csvContent, "studentlist.csv", "text/csv;encoding:utf-8");
  }
}

function convertArrayOfObjectsToCSV(data:any) {
  var result:any, ctr:any, keys:any, columnDelimiter:any, lineDelimiter:any;

  data = data || null;
  if (data == null || !data.length) {
    return null;
  }

  columnDelimiter = ',';
  lineDelimiter = '\n';

  keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(function (item:any) {
    ctr = 0;
    keys.forEach(function (key:any) {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

function download(content: any, fileName: any, mimeType: any) {
  var a = document.createElement('a');
  mimeType = mimeType || 'application/octet-stream';

  if (navigator.msSaveBlob) { // IE10
    navigator.msSaveBlob(new Blob([content], {
      type: mimeType
    }), fileName);
  } else if (URL && 'download' in a) { //html5 A[download]
    a.href = URL.createObjectURL(new Blob([content], {
      type: mimeType
    }));
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
  }
}

type StudentListPageOwnProps = RouteComponentProps<{}>;
type StudentListPageProps = {
  data: QueryProps & StudentListQuery;
};

const StudentListPage = ({ data: { students } }: StudentListPageProps) => (
  <section className="customCss">
    <h3 className="bg-heading p-1 m-b-0">
      <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '}
      Admin - Student Management
      </h3>
    <div className="plugin-bg-white p-1">
      <div className="m-b-1 dflex bg-heading">
        <h4 className="ptl-06">Student Details</h4>
        <div>
          <Link
            to={`/plugins/ems-student/page/addstudent`}
            className="btn btn-primary m-r-1" style={w180}>Create New Student
        </Link>
          <a className="btn btn-primary" onClick={(e: any) => exportStudents(students)}>Export</a>
        </div>
      </div>
      <StudentsTable students={students} />
    </div>
  </section>
);

export default graphql<StudentListQuery, StudentListPageOwnProps, StudentListPageProps>(
  StudentListQueryGql
)(withLoadingHandler(StudentListPage));
