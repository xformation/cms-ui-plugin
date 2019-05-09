import * as React from 'react';
import { StudentFragment } from '../../types';

import { Link } from 'react-router-dom';

export default ({ student }: { student: StudentFragment }) => (
  <section className="student-profile-container">
    <h3 className="bg-heading p-1 m-b-0">
      <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '}
      Admin - Student Management
      </h3>
    <div className="plugin-bg-white p-1">
      <div className="m-b-1 dflex bg-heading">
        <h4 className="ptl-06">Student Profile</h4>
        <div className="dont-print">
          <a className="btn btn-primary m-r-1" onClick={(e:any)=>{print()}}>
            Print
          </a>
          <Link to={`/plugins/ems-student/page/editstudentpage?id=${student.id}`} className="btn btn-primary">
            Edit Student
          </Link>
        </div>
      </div>
      <div className="b-1 m-1">
        <div className="student-photo-container row p-l-1 p-r-1 p-b-1">
          <div className="col-xs-12 col-md-4 m-t-1 text-center">
            <img src="/public/img/cubes.png" alt="" />
          </div>
          <div className="col-xs-12 col-md-8 m-t-1">
            <div className="row">
              <div className="col-sm-4 col-xs-12 m-b-1">
                <h3>{student.studentName}</h3>
              </div>
              <div className="col-sm-4 col-xs-12 m-b-1">
                <span className="profile-label">Contact No: </span>
                <span>{student.emergencyContactNo}</span>
              </div>
              <div className="col-sm-4 col-xs-12 m-b-1">
                <span className="profile-label">Primary Contact No: </span>
                <span>{student.studentContactNumber}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-4 m-b-1">
                <span className="profile-label">
                  Admission No:
                </span>
                <span>{student.admissionNo}</span>
              </div>
              <div className="col-xs-12 col-sm-4 m-b-1">
                <span className="profile-label">
                  Roll No:
                </span>
                <span>{student.rollNo}</span>
              </div>
              <div className="col-xs-12 col-sm-4 m-b-1">
                <span className="profile-label">
                  Class:
                </span>
                <span>{student.batch.batch}</span>
              </div>
              <div className="col-xs-12 col-sm-4 m-b-1">
                <span className="profile-label">
                  Student Id:
                </span>
                <span>{student.id}</span>
              </div>
              <div className="col-xs-12 col-sm-4 m-b-1">
                <span className="profile-label">
                  Department:
                </span>
                <span>{student.department.name}</span>
              </div>
              <div className="col-xs-12 col-sm-4 m-b-1">
                <span className="profile-label">
                  Section:
                </span>
                <span>{student.section.section}</span>
              </div>
            </div>
            <div className="buttons-container dont-print">
              <button className="btn btn-primary">Profile</button>
              <button disabled className="btn btn-disable">
                Details
              </button>
              <button disabled className="btn btn-disable">
                Academic
              </button>
              <button disabled className="btn btn-disable">
                Fee
              </button>
              <button disabled className="btn btn-disable">
                Reports
              </button>
              <button disabled className="btn btn-disable">
                ID Card
              </button>
              <button disabled className="btn btn-disable">
                Documents
              </button>
              <button disabled className="btn btn-disable">
                Transport
              </button>
            </div>
          </div>
        </div>
        <div className="main-details m-1 p-2 b-1">
          <div className="details-container">
            <div className="row">
              <div className="col-sm-4 col-xs-12 m-b-1">
                <span className="profile-label">
                  Fathers Name:
              </span>
                <span>{student.fatherName}</span>
              </div>
              <div className="col-sm-4 col-xs-12 m-b-1">
                <span className="profile-label">
                  Fathers Contact:
              </span>
                <span>{student.emergencyContactNo}</span>
              </div>
              <div className="col-sm-4 col-xs-12 m-b-1">
                <span className="profile-label">
                  Email Address
              </span>
                <span>{student.alternateEmailAddress}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4 col-xs-12 m-b-1">
                <span className="profile-label">
                  Mothers Name:
              </span>
                <span>{student.motherName}</span>
              </div>
              <div className="col-sm-4 col-xs-12 m-b-1">
                <span className="profile-label">
                  Mothers Contact:
              </span>
                <span>{student.alternateContactNumber}</span>
              </div>
              <div className="col-sm-4 col-xs-12 m-b-1">
                <span className="profile-label">
                  Email Address:
              </span>
                <span>{student.alternateEmailAddress}</span>
              </div>
            </div>
          </div>
          <div className="details-container p-t-2">
            <div className="row">
              <div className="col-sm-4 col-xs-12 m-b-1">
                <span className="profile-label">
                  Address Line 1:
                </span>
                <span>{student.addressLineOne}</span>
              </div>
              <div className="col-sm-4 col-xs-12 m-b-1">
                <span className="profile-label">
                  Address Line 2:
                </span>
                <span>{student.addressLineTwo}</span>
              </div>
              <div className="col-sm-4 col-xs-12 m-b-1">
                <span className="profile-label">
                  Town:
                </span>
                <span>{student.town}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4 col-xs-12 m-b-1">
                <span className="profile-label">
                  State:
                </span>
                <span>{student.state}</span>
              </div>
              <div className="col-sm-4 col-xs-12 m-b-1">
                <span className="profile-label">
                  Country:
                </span>
                <span>{student.country}</span>
              </div>
              <div className="col-sm-4 col-xs-12 m-b-1">
                <span className="profile-label">
                  Pin Code:
                </span>
                <span>{student.pincode}</span>
              </div>
            </div>
          </div>
          <div className="details-container p-t-2">
            <div className="row">
              <div className="col-sm-4 col-xs-12 m-b-1">
                <span className="profile-label">
                  Adhar No:
                </span>
                <span>{student.aadharNo}</span>
              </div>
              <div className="col-sm-4 col-xs-12 m-b-1">
                <span className="profile-label">
                  Date Of Birth:
                </span>
                <span>{student.dateOfBirth}</span>
              </div>
              <div className="col-sm-4 col-xs-12 m-b-1">
                <span className="profile-label">
                  Place Of Birth:
                </span>
                <span>{student.placeOfBirth}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4 col-xs-12 m-b-1">
                <span className="profile-label">
                  Religion:
                </span>
                <span>{student.religion}</span>
              </div>
              <div className="col-sm-4 col-xs-12 m-b-1">
                <span className="profile-label">
                  Cast:
                </span>
                <span>{student.caste}</span>
              </div>
              <div className="col-sm-4 col-xs-12 m-b-1">
                <span className="profile-label">
                  Sub Cast:
                </span>
                <span>{student.subCaste}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4 col-xs-12 m-b-1">
                <span className="profile-label">
                  Blood Group:
                </span>
                <span>{student.bloodGroup}</span>
              </div>
              <div className="col-sm-4 col-xs-12 m-b-1">
                <span className="profile-label">
                  Sex:
                </span>
                <span>{student.sex}</span>
              </div>
              <div className="col-sm-4 col-xs-12 m-b-1">
                <span className="profile-label">
                  Student Type:
                </span>
                <span>{student.studentType}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
