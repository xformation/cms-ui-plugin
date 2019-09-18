import * as React from 'react';
import { StudentFragment } from '../../types';

import { Link } from 'react-router-dom';
import Tabx from './tabx';
class Tabs extends React.Component<{}, any>{
  constructor(props: any) {
    super(props);
    this.state = {
      active: 0
    }
  }

  select = (i: any) => {
    let _this = this;
    return function () {
      _this.setState({
        active: i
      });
    }
  }

  renderTabs = () => {
    return React.Children.map(this.props.children, (item, i) => {
      if (i % 2 === 0) {
        let active = this.state.active === i ? 'active' : '';
        return <a onClick={this.select(i)} className={`${active} tab`}>{item}</a>;
      }
    });
  }

  renderContent() {
    return React.Children.map(this.props.children, (item, i) => {
      if (i - 1 === this.state.active) {
        return <div className='content'>{item}</div>;
      } else {
        return;
      }
    });
  }

  render() {
    return (
      <div className="tabstdpfl" style={{ marginTop: "-5%" }}>
        <div className="stdop" style={{ marginLeft: "15rem" }}>
          {this.renderTabs()}
        </div>
        {this.renderContent()}
      </div>
    );
  }
}

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
          <a className="btn btn-primary m-r-1" onClick={(e: any) => { print() }}>
            Print
    </a>
          <Link to={`/plugins/ems-student/page/editstudentpage?id=${student.id}`} className="btn btn-primary">
            Edit Student
          </Link>
        </div>
      </div>

      <div>
        <div className="b-1 m-1">


          {/* <Tabx /> */}
          <div className="student-photo-container row p-l-1 p-r-1 p-b-1">
            <div className="col-xs-12 col-md-2 m-t-1 text-center">
              <img className="photo" id="stPhoto" src={student.uploadPhoto} style={{ width: "12rem", height: "12rem" }}></img>
            </div>
            <div className="col-xs-12 col-md-10 m-t-1">
              <div className="row">
                <div className="col-sm-4 col-xs-12 m-b-1">
                  <h1 className="dblue-text">{student.studentName} {student.studentMiddleName} {student.studentLastName}</h1>
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
            </div></div>
          <div className="buttons-container dont-print">
            {/* <button onClick={logRandomValue} */}
            <Tabs>
              <button className="btn btn-primary cust-height" >Profile <br /><span className="uparrow"></span></button>

              <span>
                <div className="main-details m-1 p-2 b-1">
                  <div className="details-container">
                    <div className="row">
                      <div className="col-sm-4 col-xs-12 m-b-1">
                        <span className="profile-label">Fathers Name:</span>
                        <span>{student.fatherName}</span>
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1">
                        <span className="profile-label">Fathers Contact:</span>
                        <span>{student.emergencyContactNo}</span>
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1">
                        <span className="profile-label">Email Address</span>
                        <span>{student.alternateEmailAddress}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4 col-xs-12 m-b-1">
                        <span className="profile-label">Mothers Name:</span>
                        <span>{student.motherName}</span>
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1">
                        <span className="profile-label">Mothers Contact:</span>
                        <span>{student.alternateContactNumber}</span>
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1">
                        <span className="profile-label">Email Address:</span>
                        <span>{student.alternateEmailAddress}</span>
                      </div>
                    </div>
                  </div>
                  <div className="details-container p-t-2">
                    <div className="row">
                      <div className="col-sm-4 col-xs-12 m-b-1">
                        <span className="profile-label">Address Line 1:</span>
                        <span>{student.addressLineOne}</span>
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1">
                        <span className="profile-label">Address Line 2:</span>
                        <span>{student.addressLineTwo}</span>
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1">
                        <span className="profile-label">Town:</span>
                        <span>{student.town}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4 col-xs-12 m-b-1">
                        <span className="profile-label">State:</span>
                        <span>{student.state}</span>
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1">
                        <span className="profile-label">Country:</span>
                        <span>{student.country}</span>
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1">
                        <span className="profile-label">Pin Code:</span>
                        <span>{student.pincode}</span>
                      </div>
                    </div>
                  </div>
                  <div className="details-container p-t-2">
                    <div className="row">
                      <div className="col-sm-4 col-xs-12 m-b-1">
                        <span className="profile-label">Adhar No:</span>
                        <span>{student.aadharNo}</span>
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1">
                        <span className="profile-label">Date Of Birth:</span>
                        <span>{student.strDateOfBirth}</span>
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1">
                        <span className="profile-label">Place Of Birth:</span>
                        <span>{student.placeOfBirth}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4 col-xs-12 m-b-1">
                        <span className="profile-label">Religion:</span>
                        <span>{student.religion}</span>
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1">
                        <span className="profile-label">Cast:</span>
                        <span>{student.caste}</span>
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1">
                        <span className="profile-label">Sub Cast:</span>
                        <span>{student.subCaste}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4 col-xs-12 m-b-1">
                        <span className="profile-label">Blood Group:</span>
                        <span>{student.bloodGroup}</span>
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1">
                        <span className="profile-label">Sex:</span>
                        <span>{student.sex}</span>
                      </div>
                      <div className="col-sm-4 col-xs-12 m-b-1">
                        <span className="profile-label">Student Type:</span>
                        <span>{student.studentType}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </span>
              <button disabled className="btn btnstdDsl"  >
                Details
        </button>
              <span>Two thing</span>
              <button disabled className="btn btnstdDsl">
                Academic
        </button>
              <span>three things</span>

              <button className="btn btn-primary cust-height" >Fee <br /><span className="uparrow"></span></button>
              <span>
                <div className="main-details m-1 p-2 b-1">
                  <div className="details-container m-b-2">
                    <div className="dflex bdr-bpttom">
                      <div className="w-70 dflex ">
                        <div className="fwidth">
                          <div className="profile-label">Total Fee</div>
                          <div className="box-text">1,25,000</div>
                        </div>
                        <div className="fwidth">
                          <div className="profile-label">Fees Paid</div>
                          <div className="box-text ">25,000</div>
                        </div>
                        <div className="fwidth">
                          <div className="profile-label">Fees Due</div>
                          <div className="box-text">50,000</div>
                        </div>
                        <div className="fwidth">
                          <div className="profile-label">Due Date</div>
                          <div className="box-text">01/03/2019</div>
                        </div>
                        <div className="fwidth">
                          <div className="profile-label">Total Remaining</div>
                          <div className="box-text">35,000</div>
                        </div>
                      </div>
                      <div className="w-20 dflex">
                        <div className="fwidth">
                          <div className="profile-label">Send Notification</div>
                          <button className="btn btn-primary btn-cust-width">Send SMS</button>
                        </div>
                        <div className="fwidth">
                          <div className="profile-label">Take Payment</div>
                          <button className="btn btn-primary btn-cust-width">Take Payment</button>
                        </div>
                      </div>
                    </div>
                    <div className="dflex m-t-1">
                      <table className="w-40" id="txt-align">
                        <tr>
                          <th>Fee Line Item</th>
                          <th>Amount</th>
                        </tr>
                        <tr>
                          <td>
                            Tution Fee
                          </td>
                          <td>10,000</td>
                        </tr>
                        <tr>
                          <td>
                            Exam Fee
                          </td>
                          <td>5,000</td>
                        </tr>
                        <tr>
                          <td>
                            Lab Fee
                          </td>
                          <td>2,000</td>
                        </tr>
                      </table>
                      <table className="w-40 m-r-3 m-l-3" id="txt-align">
                        <tr>
                          <th>Facility</th>
                          <th>Amount</th>
                        </tr>
                        <tr>
                          <td>
                            Transportation
                          </td>
                          <td>10,000</td>
                        </tr>
                        <tr>
                          <td>
                            Gym
                          </td>
                          <td>5,000</td>
                        </tr>
                      </table>
                      <div className="w-20">
                        <div className="profile-label">Next Payment</div>
                        <div className="box-text">35,000</div>
                      </div>
                    </div>
                    <button className="btn btn-primary cust-btn-payment">Payment History</button>
                  </div>
                </div>
              </span>
              <button disabled className="btn btnstdDsl">
                Reports
        </button>
              <span>Reports</span>
              <button disabled className="btn btnstdDsl">
                ID Card
        </button>
              <span>Id Card</span>
              <button disabled className="btn btnstdDsl">
                Documents
        </button>
              <span>Documents</span>
              <button className="btn btn-primary cust-height" >Facility <br /><span className="uparrow"></span></button>
              <span>
                <div className="main-details m-1 p-2 b-1">
                  <div className="details-container">
                    <div className="fflex w-70 m-b-1">
                      <div className="profile-label cust-wh">Transport</div>
                      <div className="cust-wh">Yes</div>
                      <div className="profile-label cust-wh">Route</div>
                      <div className="cust-box-text cust-wh m-r-3">A1</div>
                      <div className="profile-label cust-wh m-l-3">Route Charges</div>
                      <div className="cust-box-text cust-wh m-l-3">1,000</div>
                    </div>

                  </div>
                  <div className="details-container p-t-2">
                    <div className="fflex m-b-1">
                      <div className="profile-label cust-wh">Gym</div>
                      <div className="cust-wh">No</div>
                    </div>
                    <div className="fflex m-b-1">
                      <div className="profile-label cust-wh">Mess</div>
                      <div className="cust-wh">Yes</div>
                    </div>
                    <div className="fflex m-b-1">
                      <div className="profile-label cust-wh">Sports</div>
                      <div className="cust-wh">No</div>
                    </div>
                    <div className="fflex m-b-1">
                      <div className="profile-label cust-wh">Cultural class</div>
                      <div className="cust-wh">No</div>
                    </div>
                  </div>
                </div>
              </span>

            </Tabs>
          </div>
        </div>
      </div>
    </div>
    {/* </div>
    </div> */}
  </section >
);

