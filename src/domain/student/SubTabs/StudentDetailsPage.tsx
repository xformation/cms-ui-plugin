import * as React from 'react';
import {withApollo} from 'react-apollo';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';

export interface StudentDetailsProps extends React.HTMLAttributes<HTMLElement> {
  [data: string]: any;
}

class StudentDetailsPage<T = {[data: string]: any}> extends React.Component<
  StudentDetailsProps,
  any
> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: 0,
    };
    this.toggleTab = this.toggleTab.bind(this);
  }
  toggleTab(tabNo: any) {
    this.setState({
      activeTab: tabNo,
    });
  }

  render() {
    const {activeTab} = this.state;
    return (
      <section className="student-profile-container">
        <div className="plugin-bg-white p-1">
          <div className="m-b-1 dflex bg-heading p-point5">
            <h4 className="ptl-06">Student Profile</h4>
            <div className="dont-print">
              <a
                className="btn btn-primary"
                onClick={(e: any) => {
                  print();
                }}
              >
                Print
              </a>
            </div>
          </div>

          <div>
            <div className="b-1 m-1">
              {/* <div className="student-photo-container row p-l-1 p-r-1 p-b-1"> */}
              <div className="student-photo-container profile-grid">
                <div className="text-center">
                  <img
                    className="photo"
                    id="stPhoto"
                    // src={student.uploadPhoto}
                    style={{width: '12rem', height: '12rem'}}
                  ></img>
                </div>
                <div className="">
                  <div className="row">
                    <div className="col-sm-4 col-xs-12 m-b-2">
                      <h3 className="dblue-text">
                        {/* {student.studentName} {student.studentMiddleName}{' '}
                     {student.studentLastName} */}{' '}
                        Student Name
                      </h3>
                    </div>
                    <div className="col-sm-4 col-xs-12 m-b-2">
                      <span className="profile-label">Contact No: </span>
                      {/* <span>{student.emergencyContactNo}</span> */}
                    </div>
                    <div className="col-sm-4 col-xs-12 m-b-2">
                      <span className="profile-label">Primary Contact No: </span>
                      {/* <span>{student.studentContactNumber}</span> */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-sm-4 m-b-2">
                      <span className="profile-label">Admission No:</span>
                      {/* <span>{student.admissionNo}</span> */}
                    </div>
                    <div className="col-xs-12 col-sm-4 m-b-2">
                      <span className="profile-label">Roll No:</span>
                      {/* <span>{student.rollNo}</span> */}
                    </div>
                    <div className="col-xs-12 col-sm-4 m-b-2">
                      <span className="profile-label">Class:</span>
                      {/* <span>{student.batch.batch}</span> */}
                    </div>
                  </div>
                  <div className="row" style={{marginTop: '10px'}}>
                    <div className="col-xs-12 col-sm-4 m-b-2">
                      <span className="profile-label">Student Id:</span>
                      {/* <span>{student.id}</span> */}
                    </div>
                    <div className="col-xs-12 col-sm-4 m-b-2">
                      <span className="profile-label">Department:</span>
                      {/* <span>{student.department.name}</span> */}
                    </div>
                    <div className="col-xs-12 col-sm-4 m-b-2">
                      <span className="profile-label">Section:</span>
                      {/* <span>{student.section.section}</span> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-m-1">
                <Nav tabs className="" id="rmfloat">
                  <NavItem className="cursor-pointer">
                    <NavLink
                      className={`${activeTab === 0 ? 'active' : ''}`}
                      onClick={() => {
                        this.toggleTab(0);
                      }}
                    >
                      Profile
                    </NavLink>
                  </NavItem>
                  <NavItem className="cursor-pointer">
                    <NavLink
                      className={`${activeTab === 1 ? 'active' : ''}`}
                      onClick={() => {
                        this.toggleTab(1);
                      }}
                    >
                      Details
                    </NavLink>
                  </NavItem>
                  <NavItem className="cursor-pointer">
                    <NavLink
                      className={`${activeTab === 2 ? 'active' : ''}`}
                      onClick={() => {
                        this.toggleTab(2);
                      }}
                    >
                      Academic
                    </NavLink>
                  </NavItem>
                  <NavItem className="cursor-pointer">
                    <NavLink
                      className={`${activeTab === 3 ? 'active' : ''}`}
                      onClick={() => {
                        this.toggleTab(3);
                      }}
                    >
                      Fee
                    </NavLink>
                  </NavItem>
                  <NavItem className="cursor-pointer">
                    <NavLink
                      className={`${activeTab === 4 ? 'active' : ''}`}
                      onClick={() => {
                        this.toggleTab(4);
                      }}
                    >
                      Reports
                    </NavLink>
                  </NavItem>
                  <NavItem className="cursor-pointer">
                    <NavLink
                      className={`${activeTab === 5 ? 'active' : ''}`}
                      onClick={() => {
                        this.toggleTab(5);
                      }}
                    >
                      ID Cards
                    </NavLink>
                  </NavItem>
                  <NavItem className="cursor-pointer">
                    <NavLink
                      className={`${activeTab === 6 ? 'active' : ''}`}
                      onClick={() => {
                        this.toggleTab(6);
                      }}
                    >
                      Documents
                    </NavLink>
                  </NavItem>
                  <NavItem className="cursor-pointer">
                    <NavLink
                      className={`${activeTab === 7 ? 'active' : ''}`}
                      onClick={() => {
                        this.toggleTab(7);
                      }}
                    >
                      Facility
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={activeTab} className="ltab-contianer p-0">
                  <TabPane tabId={0}>
                    <span>
                      <div className="main-details m-1 p-2">
                        <div className="details-container">
                          <div className="row">
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Fathers Name:</span>
                              {/* <span>{student.fatherName}</span> */}
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Fathers Contact:</span>
                              {/* <span>{student.emergencyContactNo}</span> */}
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Email Address</span>
                              {/* <span>{student.alternateEmailAddress}</span> */}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Mothers Name:</span>
                              {/* <span>{student.motherName}</span> */}
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Mothers Contact:</span>
                              {/* <span>{student.alternateContactNumber}</span> */}
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Email Address:</span>
                              {/* <span>{student.alternateEmailAddress}</span> */}
                            </div>
                          </div>
                        </div>
                        <div className="details-container p-t-2">
                          <div className="row">
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Address Line 1:</span>
                              {/* <span>{student.addressLineOne}</span> */}
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Address Line 2:</span>
                              {/* <span>{student.addressLineTwo}</span> */}
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Town:</span>
                              {/* <span>{student.town}</span> */}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">State:</span>
                              {/* <span>{student.state}</span> */}
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Country:</span>
                              {/* <span>{student.country}</span> */}
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Pin Code:</span>
                              {/* <span>{student.pincode}</span> */}
                            </div>
                          </div>
                        </div>
                        <div className="details-container p-t-2">
                          <div className="row">
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Adhar No:</span>
                              {/* <span>{student.aadharNo}</span> */}
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Date Of Birth:</span>
                              {/* <span>{student.strDateOfBirth}</span> */}
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Place Of Birth:</span>
                              {/* <span>{student.placeOfBirth}</span> */}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Religion:</span>
                              {/* <span>{student.religion}</span> */}
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Cast:</span>
                              {/* <span>{student.caste}</span> */}
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Sub Cast:</span>
                              {/* <span>{student.subCaste}</span> */}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Blood Group:</span>
                              {/* <span>{student.bloodGroup}</span> */}
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Sex:</span>
                              {/* <span>{student.sex}</span> */}
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Student Type:</span>
                              {/* <span>{student.studentType}</span> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                  </TabPane>
                  <TabPane tabId={1}>
                    <div className="p-1">Details Content</div>
                  </TabPane>
                  <TabPane tabId={2}>
                    <div className="p-1"> Academic Content</div>
                  </TabPane>
                  <TabPane tabId={3}>
                    <span>
                      <div className="main-details m-1 p-2">
                        <div className="details-container m-b-2">
                          <div className="dflex bdr-bpttom">
                            <div className="fwidth dflex ">
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
                              <div className="fwidth">
                                <div className="profile-label mbten">
                                  Send Notification
                                </div>
                                <button className="btn btn-primary btn-cust-width">
                                  Send SMS
                                </button>
                              </div>
                              <div className="fwidth">
                                <div className="profile-label mbten">Take Payment</div>
                                <button className="btn btn-primary btn-cust-width">
                                  Take Payment
                                </button>
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
                                <td>Tution Fee</td>
                                <td>10,000</td>
                              </tr>
                              <tr>
                                <td>Exam Fee</td>
                                <td>5,000</td>
                              </tr>
                              <tr>
                                <td>Lab Fee</td>
                                <td>2,000</td>
                              </tr>
                            </table>
                            <table className="w-40 m-r-3 m-l-3" id="txt-align">
                              <tr>
                                <th>Facility</th>
                                <th>Amount</th>
                              </tr>
                              <tr>
                                <td>Transportation</td>
                                <td>10,000</td>
                              </tr>
                              <tr>
                                <td>Gym</td>
                                <td>5,000</td>
                              </tr>
                            </table>
                            <div className="w-20">
                              <div className="profile-label">Next Payment</div>
                              <div className="box-text">35,000</div>
                            </div>
                          </div>
                          <button className="btn btn-primary cust-btn-payment">
                            Payment History
                          </button>
                        </div>
                      </div>
                    </span>
                  </TabPane>
                  <TabPane tabId={4}>
                    <div className="p-1"> Report Content</div>
                  </TabPane>
                  <TabPane tabId={5}>
                    <div className="p-1"> ID Card Content</div>
                  </TabPane>
                  <TabPane tabId={6}>
                    <div className="p-1"> Document Content</div>
                  </TabPane>
                  <TabPane tabId={7}>
                    <span>
                      <div className="main-details m-1 p-2">
                        <div className="details-container">
                          <div className="fflex m-b-1">
                            <div className="profile-label cust-wh">Transport</div>
                            <div className="cust-wh">Yes</div>
                            <div className="profile-label cust-wh">Route</div>
                            <div className="cust-box-text cust-wh m-r-3">A1</div>
                            <div className="profile-label cust-wh m-l-3 m-r-2">
                              Route Charges
                            </div>
                            <div className="cust-box-text cust-wh">1,000</div>
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
                  </TabPane>
                </TabContent>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withApollo(StudentDetailsPage);
