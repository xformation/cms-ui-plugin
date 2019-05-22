import * as React from 'react';

import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { graphql, QueryProps,  MutationFunc, compose } from 'react-apollo';

import * as StudentListQueryGql from './StudentListQuery.graphql';
import { LoadStudentFilterDataCacheType, StudentListQuery } from '../../types';
// import withLoadingHandler from '../../../components/withLoadingHandler';
// import { StudentServices } from '../AddStudentPage/_services';
import withStudentFilterDataCacheLoader from "./withStudentFilterDataCacheLoader";


const w180 = {
  width: '180px',
  marginRight: '10px',
};


// type StudentListPageOwnProps = RouteComponentProps<{}>;
// type StudentListPageProps = {
//   // data: QueryProps & StudentListQuery;
//   findResult: QueryProps & StudentListQuery;
// };
type StudentRootProps = RouteComponentProps<{
  collegeId: string;
  academicYearId:  string;
}> &{
  data: QueryProps & LoadStudentFilterDataCacheType; 
}
type StudentPageProps = StudentRootProps & {
  mutate: MutationFunc<StudentListQuery>;
};


// type StudentTableProps = {
//   students: any
// };

type StudentTableStates = {
  students: any,
  studentData: any,
  branches: any,
  departments: any,
  batches: any,
  sections: any,
  studentTypes: any,
  genders: any
};

class StudentsTable extends React.Component<StudentPageProps, StudentTableStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      students: {},
      studentData: {
        college: {
          id: 1801 
        },
        academicYear: {
          id: 1701  
        },
        branch: {
          id: ""
        },
        department: {
            id: ""
        },
        batch: {
            id: ""
        },
        section: {
            id: ""
        }, 
        studentType: {
            id: ""
        },
        gender: {
            id: ""
        },
        mutateResult: [],
      },
      branches: [],
      departments: [],
      batches: [],
      sections: [],
      studentTypes: [],
      genders: [],
      
      };
      this.createBranches = this.createBranches.bind(this);
      this.createDepartments = this.createDepartments.bind(this);
      this.createBatches = this.createBatches.bind(this);
      this.createSections = this.createSections.bind(this);
      this.createStudentTypes = this.createStudentTypes.bind(this);
      this.createGenders = this.createGenders.bind(this);

      this.checkAllStudents = this.checkAllStudents.bind(this);
      this.onClickCheckbox = this.onClickCheckbox.bind(this);
      this.createStudentRows = this.createStudentRows.bind(this);
      this.createNoRecordMessage = this.createNoRecordMessage.bind(this);
      this.exportStudents = this.exportStudents.bind(this);
      this.convertArrayOfObjectsToCSV = this.convertArrayOfObjectsToCSV.bind(this);
      this.download = this.download.bind(this);
  }

  
  createBranches(branches: any) {
    let branchesOptions = [<option key={0} value="">Select Branch</option>];
    for (let i = 0; i < branches.length; i++) {
        branchesOptions.push(
            <option key={branches[i].id} value={branches[i].id}>{branches[i].branchName}</option>
        );
    }
    return branchesOptions;
  }

  createDepartments(departments: any, selectedBranchId: any, selectedAcademicYearId: any) {
    let departmentsOptions = [<option key={0} value="">Select department</option>];
    for (let i = 0; i < departments.length; i++) {
      if (selectedBranchId == departments[i].branch.id && selectedAcademicYearId == departments[i].academicyear.id) {
        departmentsOptions.push(
          <option key={departments[i].id} value={departments[i].id}>{departments[i].name}</option>
        );
      }
    }
    return departmentsOptions;
  }

  createBatches(batches: any, selectedDepartmentId: any) {
    let batchesOptions = [<option key={0} value="">Select Year</option>];
    for (let i = 0; i < batches.length; i++) {
      let id = batches[i].id;
      let dptId = ""+batches[i].department.id;
      if (dptId == selectedDepartmentId) {
        batchesOptions.push(
          <option key={id} value={id}>{batches[i].batch}</option>
        );
      }
    }
    return batchesOptions;
  }

  createSections(sections: any, selectedBatchId: any) {
    let sectionsOptions = [<option key={0} value="">Select Section</option>];
    for (let i = 0; i < sections.length; i++) {
      let id = sections[i].id;
      let sbthId = ""+sections[i].batch.id;
      if (sbthId == selectedBatchId) {
        sectionsOptions.push(
          <option key={id} value={id}>{sections[i].section}</option>
        );
      }
    }
    return sectionsOptions;
  }

  createStudentTypes(studentTypes: any) {
    let studentTypesOptions = [<option key={0} value="">Select Student Type</option>];
    for (let i = 0; i < studentTypes.length; i++) {
      let id = studentTypes[i].id;
      studentTypesOptions.push(
        <option key={id} value={studentTypes[i].description}>{studentTypes[i].description}</option>
      );
    }
    return studentTypesOptions;
  }

  createGenders(genders: any) {
    let gendersOptions = [<option key={0} value="">Select Gender</option>];
    for (let i = 0; i < genders.length; i++) {
      let id = genders[i].id;
      gendersOptions.push(
        <option key={id} value={genders[i].description}>{genders[i].description}</option>
      );
    }
    return gendersOptions;
  }

  checkAllStudents(e: any) {
    const { studentData } = this.state;
    const mutateResLength = studentData.mutateResult.length;
    let chkAll  = e.nativeEvent.target.checked;
    let els = document.querySelectorAll("input[type=checkbox]");

    var empty = [].filter.call( els, function( el: any ) {
      if(chkAll){
        el.checked = true;
      }else{
        el.checked = false;
      }
    });

    // for(let x=0; x< mutateResLength; x++){
    //   const tempObj = studentData.mutateResult[x];
    //   const students = tempObj.data.getStudentList;
    //   const length = students.length;
    //   tempObj.data.getStudentList = [];
    //   studentData.mutateResult = [];
    //   for (let i = 0; i < length; i++) {
    //     const student = students[i];
    //     if(chkAll){
    //       student.isChecked = true;
    //     }else{
    //       student.isChecked = false;
    //     }
    //     tempObj.data.getStudentList.push(student);
    //   }
    //   studentData.mutateResult.push(tempObj.data.getStudentList);
    // }
    // this.setState({
    //   studentData: studentData
    // });
    
    

  }

  onClickCheckbox(index: any, e: any) {
    // const { target } = e;
    const { id } = e.nativeEvent.target;
    let chkBox : any = document.querySelector("#"+id);
    chkBox.checked = e.nativeEvent.target.checked;
    // const { students } = this.state;
    // const student = students[index];
    // if (student) {
    //   student.isChecked = target.checked;
    //   this.setState({
    //     students
    //   });
    // }
  }
  createNoRecordMessage(objAry: any){
    const mutateResLength = objAry.length;
    const retVal = [];
    for(let x=0; x< mutateResLength; x++){
      const tempObj = objAry[x];
      const students = tempObj.data.getStudentList;
      const length = students.length;
      if(length === 0){
        retVal.push(
          <h4 className="ptl-06">No Record Found</h4>
        );
      }
    }
    return retVal;
  }
  createStudentRows(objAry: any) {
    const mutateResLength = objAry.length;
    const retVal = [];
    
    for(let x=0; x< mutateResLength; x++){
      const tempObj = objAry[x];
      const students = tempObj.data.getStudentList;
      const length = students.length;
      for (let i = 0; i < length; i++) {
        const student = students[i];
        retVal.push(
          <tr key={student.id}>
            <td>
              <input onClick={(e: any) => this.onClickCheckbox(i, e)} checked={student.isChecked} type="checkbox" name="" id={"chk"+student.id} />
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
    }
    
    return retVal;
  }

  exportStudents(objAry: any) {
    const studentsToExport = [];
    const mutateResLength = objAry.length;
    let fileType : any = document.querySelector("#fileType");
    if(fileType.value == ""){
      alert("Please select a file type to export");
      return;
    }
    for(let x=0; x< mutateResLength; x++){
      const tempObj = objAry[x];
      const students = tempObj.data.getStudentList;
      const length = students.length;
      for (let i = 0; i < length; i++) {
        const student = students[i];
        let chkBox : any = document.querySelector("#chk"+student.id);
        if (chkBox.checked) {
          studentsToExport.push(student);
        }
      }
    }
    if (studentsToExport.length > 0) {
      var csvContent = this.convertArrayOfObjectsToCSV(studentsToExport);
      this.download(csvContent, "studentlist.csv", "text/csv;encoding:utf-8");
    }else{
      alert("Please select records to export");
    }
  }
  
  convertArrayOfObjectsToCSV(data:any) {
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
  
  download(content: any, fileName: any, mimeType: any) {
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


  onChange = (e: any) => {
    const { name, value } = e.nativeEvent.target;
    const { studentData } = this.state;
    if (name === "branch") {
      this.setState({
          studentData: {
              ...studentData,
              branch: {
                  id: value
              },
              department: {
                id: ""
              },
              batch: {
                id: ""
              },
              section: {
                  id: ""
              },
              gender: {
                  id: ""
              },
              studentType: {
                  id: ""
              }
          }
      });
    }else if (name === "department") {
        this.setState({
            studentData: {
                ...studentData,
                department: {
                    id: value
                },
                batch: {
                    id: ""
                },
                section: {
                    id: ""
                },
                gender: {
                    id: ""
                },
                studentType: {
                    id: ""
                }
            }
        });
      }  else if (name === "batch") {
        this.setState({
            studentData: {
                ...studentData,
                batch: {
                    id: value
                },
                section: {
                    id: ""
                },
                gender: {
                    id: ""
                },
                studentType: {
                    id: ""
                }
            }
        });
    }
    else if (name === "section") {
        this.setState({
            studentData: {
                ...studentData,
                section: {
                    id: value
                },
                gender: {
                    id: ""
                },
                studentType: {
                    id: ""
                }
            }
        });
    } 
    else if (name === "gender") {
      this.setState({
          studentData: {
              ...studentData,
              gender: {
                  id: value
              },
              studentType: {
                  id: ""
              }
          }
      });
    }
    else if (name === "studentType") {
        this.setState({
            studentData: {
                ...studentData,
                studentType: {
                    id: value
                }
            }
        });
    }  else {
        this.setState({
            studentData: {
                ...studentData,
                [name]: value
            }
        });
    }
  }

  onClick = (e: any) => {
    const { name, value } = e.nativeEvent.target;
    const { mutate } = this.props;
    const { studentData } = this.state;
    e.preventDefault();

    let studentFilterInputObject = {
      branchId: studentData.branch.id,
      departmentId: studentData.department.id,
      batchId: studentData.batch.id,
      sectionId: studentData.section.id,
      gender: studentData.gender.id,
      studentType: studentData.studentType.id
    };

    
    return mutate({
      variables: { filter: studentFilterInputObject },
    }).then(data => {
      const sdt = data;
      studentData.mutateResult = [];
      studentData.mutateResult.push(sdt);
      this.setState({
        studentData: studentData
      });
      console.log('Student filter mutation result ::::: ', studentData.mutateResult);
    }).catch((error: any) => {
      console.log('there was an error sending the query result', error);
      return Promise.reject(`Could not retrieve student data: ${error}`);
    });

  }

  

  render() {
    const { data: { createStudentFilterDataCache, refetch }, mutate } = this.props;
    const { studentData } = this.state;
    return (
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
                <a className="btn btn-primary" onClick={(e: any) => this.exportStudents(this.state.studentData.mutateResult)}>Export</a>
                <select name="fileType" id="fileType" className="max-width-10 m-l-1">
                    <option value="">Select File Type</option>
                    <option value="CSV">CSV</option>
                </select>
              </div>
          </div>
        
          <div>
              <div className="student-flex">
                <div>
                  <label htmlFor="">Branch</label>
                  <select name="branch" id="branch" onChange={this.onChange} value={studentData.branch.id} className="gf-form-input max-width-22">
                      {this.createBranches(this.props.data.createStudentFilterDataCache.branches)}
                  </select>
                </div>
                <div>
                  <label htmlFor="">Department</label>
                  <select required name="department" id="department" onChange={this.onChange} value={studentData.department.id} className="gf-form-input max-width-22">
                    {this.createDepartments(this.props.data.createStudentFilterDataCache.departments, studentData.branch.id, studentData.academicYear.id)}
                  </select>
                </div>
                <div>
                  <label htmlFor="">Year</label>
                  <select required name="batch" id="batch" onChange={this.onChange} value={studentData.batch.id} className="gf-form-input max-width-22">
                    {this.createBatches(this.props.data.createStudentFilterDataCache.batches, studentData.department.id)}
                  </select>
                </div>
                <div>
                  <label htmlFor="">Section</label>
                  <select required name="section" id="section" onChange={this.onChange} value={studentData.section.id} className="gf-form-input max-width-12">
                    {this.createSections(this.props.data.createStudentFilterDataCache.sections, studentData.batch.id)}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="">Gender</label>
                  <select required name="gender" id="gender" onChange={this.onChange} value={studentData.gender.id} className="gf-form-input max-width-15">
                    {this.createGenders(this.props.data.createStudentFilterDataCache.genders)}
                  </select>
                </div>
                <div>
                  <label htmlFor="">Student Type</label>
                  <select required name="studentType" id="studentType" onChange={this.onChange} value={studentData.studentType.id} className="gf-form-input max-width-22">
                    {this.createStudentTypes(this.props.data.createStudentFilterDataCache.studentTypes)}
                  </select>
                </div>
                <div className="margin-bott max-width-22">
                  <label htmlFor="">Search</label>
                  <input type="search" name="" id="" />
                </div>
              </div>
              <div className="m-b-1 dflex bg-heading">
                  <h4 className="ptl-06"></h4>
                  <button className="btn btn-primary max-width-13" id="btnFind" name="btnFind"  onClick={this.onClick} >Search Students</button>
               </div>

              <table id="studentlistpage" className="striped-table fwidth bg-white">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" onClick={(e: any) => this.checkAllStudents(e)} value="checkedall" name="" id="chkCheckedAll" />
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
                  {
                    this.createStudentRows(this.state.studentData.mutateResult)
                  }
                </tbody>
              </table>
                  {
                    this.createNoRecordMessage(this.state.studentData.mutateResult)
                  }
            </div>
          </div>
      </section>
      
    );
  }
}

// function exportStudents(students: any) {
//   const length = students.length;
//   const studentsToExport = [];
//   for (let i = 0; i < length; i++) {
//     const student = students[i];
//     if (student.isChecked) {
//       studentsToExport.push(student);
//     }
//   }
//   if (studentsToExport.length > 0) {
//     var csvContent = convertArrayOfObjectsToCSV(studentsToExport);
//     download(csvContent, "studentlist.csv", "text/csv;encoding:utf-8");
//   }
// }

// function convertArrayOfObjectsToCSV(data:any) {
//   var result:any, ctr:any, keys:any, columnDelimiter:any, lineDelimiter:any;

//   data = data || null;
//   if (data == null || !data.length) {
//     return null;
//   }

//   columnDelimiter = ',';
//   lineDelimiter = '\n';

//   keys = Object.keys(data[0]);

//   result = '';
//   result += keys.join(columnDelimiter);
//   result += lineDelimiter;

//   data.forEach(function (item:any) {
//     ctr = 0;
//     keys.forEach(function (key:any) {
//       if (ctr > 0) result += columnDelimiter;

//       result += item[key];
//       ctr++;
//     });
//     result += lineDelimiter;
//   });

//   return result;
// }

// function download(content: any, fileName: any, mimeType: any) {
//   var a = document.createElement('a');
//   mimeType = mimeType || 'application/octet-stream';

//   if (navigator.msSaveBlob) { // IE10
//     navigator.msSaveBlob(new Blob([content], {
//       type: mimeType
//     }), fileName);
//   } else if (URL && 'download' in a) { //html5 A[download]
//     a.href = URL.createObjectURL(new Blob([content], {
//       type: mimeType
//     }));
//     a.setAttribute('download', fileName);
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   } else {
//     location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
//   }
// }



// const StudentListPage = ({ findResult: { students } }: StudentListPageProps) => (
//   <section className="customCss">
//     <h3 className="bg-heading p-1 m-b-0">
//       <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '}
//       Admin - Student Management
//       </h3>
    // <div className="plugin-bg-white p-1">
    //   <div className="m-b-1 dflex bg-heading">
    //     <h4 className="ptl-06">Student Details</h4>
    //     <div>
    //       <Link
    //         to={`/plugins/ems-student/page/addstudent`}
    //         className="btn btn-primary m-r-1" style={w180}>Create New Student
    //     </Link>
    //       <a className="btn btn-primary" onClick={(e: any) => exportStudents(students)}>Export</a>
    //     </div>
    //   </div>
    //   <StudentsTable students={students} />
    // </div>
//   </section>
// );

// export default graphql<StudentListQuery, StudentListPageOwnProps, StudentListPageProps>(
//   StudentListQueryGql
// )(withLoadingHandler(StudentListPage));

export default withStudentFilterDataCacheLoader( 
  
  compose(
    graphql<StudentListQuery, StudentRootProps>(StudentListQueryGql, {
      name: "mutate"
    })
    
  )
  (StudentsTable) as any
);