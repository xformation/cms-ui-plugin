import * as React from 'react';
import {withApollo} from 'react-apollo';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import wsCmsBackendServiceSingletonClient from '../../../wsCmsBackendServiceClient';

type StudentTableStates = {
  user: any;
  activeTab: any;
  stObj: any;
};

export interface StudentDetailsProps extends React.HTMLAttributes<HTMLElement> {
  [data: string]: any;
  user?: any;
}

class StudentDetailsPage<T = {[data: string]: any}> extends React.Component<
  StudentDetailsProps,
  StudentTableStates
> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: 0,
      stObj: this.props.data,
      user: this.props.user,
    };
    this.toggleTab = this.toggleTab.bind(this);
    // this.registerSocket = this.registerSocket.bind(this);
  }

  async componentDidMount() {
    this.setState({
      stObj: this.props.data,
    });
    // await this.registerSocket();
  }

  // async registerSocket() {
  //   const socket = wsCmsBackendServiceSingletonClient.getInstance();
  //   let dpid: any = 0;
  //   let bid: any = 0;
  //   let ayid: any = 0;

  //   socket.onmessage = (response: any) => {
  //     let message = JSON.parse(response.data);
  //     console.log('StudentDetailsPage. message received from server ::: ', message);
  //   };

  //   socket.onopen = () => {
  //     console.log(
  //       'Student details. Opening websocekt connection to cmsbackend. User : ',
  //       this.state.user.login
  //     );
  //     socket.send(this.state.user.login);
  //   };

  //   window.onbeforeunload = () => {
  //     console.log('Student. Closing websocket connection with cms backend service');
  //   };
  // }

  // componentDidMount() {
  //   this.setState({
  //     stObj: this.props.data,
  //   });
  // }

  componentWillReceiveProps() {
    this.setState({
      stObj: this.props.data,
    });
  }
  toggleTab(tabNo: any) {
    this.setState({
      activeTab: tabNo,
    });
  }

  render() {
    const {activeTab, stObj} = this.state;
    console.log('Check the new obj in another page:', stObj);
    return (
      <section className="student-profile-container">
        <div className="plugin-bg-white">
          <div>
            <div className="b-1 m-1">
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
                        {stObj.studentName} {stObj.studentMiddleName}{' '}
                        {stObj.studentLastName}
                      </h3>
                    </div>
                    <div className="col-sm-4 col-xs-12 m-b-2">
                      <span className="profile-label">Primary Contact No: </span>
                      <span>{stObj.studentPrimaryCellNumber}</span>
                    </div>
                    <div className="col-sm-4 col-xs-12 m-b-2">
                      <span className="profile-label">Alternate Contact No: </span>
                      <span>{stObj.studentAlternateCellNumber}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-sm-4 m-b-2">
                      <span className="profile-label">Admission No:</span>
                      <span>{stObj.admissionNo}</span>
                    </div>
                    <div className="col-xs-12 col-sm-4 m-b-2">
                      <span className="profile-label">Roll No:</span>
                      <span>{stObj.rollNo}</span>
                    </div>
                    <div className="col-xs-12 col-sm-4 m-b-2">
                      <span className="profile-label">Class:</span>
                      {stObj.batch !== undefined && <span>{stObj.batch.batch}</span>}
                    </div>
                  </div>
                  <div className="row" style={{marginTop: '10px'}}>
                    <div className="col-xs-12 col-sm-4 m-b-2">
                      <span className="profile-label">Student Id:</span>
                      <span>{stObj.id}</span>
                    </div>
                    <div className="col-xs-12 col-sm-4 m-b-2">
                      <span className="profile-label">Department:</span>
                      {stObj.department !== undefined && (
                        <span>{stObj.department.name}</span>
                      )}
                    </div>
                    <div className="col-xs-12 col-sm-4 m-b-2">
                      <span className="profile-label">Section:</span>
                      {stObj.section !== undefined && (
                        <span>{stObj.section.section}</span>
                      )}
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
                  {/* <NavItem className="cursor-pointer">
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
                  </NavItem> */}
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
                  {/* <NavItem className="cursor-pointer">
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
                  </NavItem> */}
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
                              <span>{stObj.fatherName}</span>
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Fathers Contact:</span>
                              <span>{stObj.fatherCellNumber}</span>
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Email Address</span>
                              <span>{stObj.fatherEmailId}</span>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Mothers Name:</span>
                              <span>{stObj.motherName}</span>
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Mothers Contact:</span>
                              <span>{stObj.motherCellNumber}</span>
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Email Address:</span>
                              <span>{stObj.motherEmailId}</span>
                            </div>
                          </div>
                        </div>
                        <div className="details-container p-t-2">
                          <div className="row">
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Local Address:</span>
                              <span>{stObj.studentLocalAddress}</span>
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Parmenent Address:</span>
                              <span>{stObj.studentPermanentAddress}</span>
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">City:</span>
                              <span>{stObj.city}</span>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">State:</span>
                              <span>{stObj.state}</span>
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Country:</span>
                              <span>{stObj.country}</span>
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Pin Code:</span>
                              <span>{stObj.pinCode}</span>
                            </div>
                          </div>
                        </div>
                        <div className="details-container p-t-2">
                          <div className="row">
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Adhar No:</span>
                              <span>{stObj.studentAadharNo}</span>
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Date Of Birth:</span>
                              <span>{stObj.strDateOfBirth}</span>
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Place Of Birth:</span>
                              <span>{stObj.placeOfBirth}</span>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Religion:</span>
                              <span>{stObj.religion}</span>
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Cast:</span>
                              <span>{stObj.caste}</span>
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Sub Cast:</span>
                              <span>{stObj.subCaste}</span>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Blood Group:</span>
                              <span>{stObj.bloodGroup}</span>
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Sex:</span>
                              <span>{stObj.sex}</span>
                            </div>
                            <div className="col-sm-4 col-xs-12 m-b-1">
                              <span className="profile-label">Student Type:</span>
                              <span>{stObj.studentType}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                  </TabPane>
                  {/* <TabPane tabId={1}>
                    <div className="p-1">Details Content</div>
                  </TabPane>
                  <TabPane tabId={2}>
                    <div className="p-1"> Academic Content</div>
                  </TabPane> */}
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

                              <tbody>
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
                              </tbody>
                            </table>
                            <table className="w-40 m-r-3 m-l-3" id="txt-align">
                              <tr>
                                <th>Facility</th>
                                <th>Amount</th>
                              </tr>
                              <tbody>
                                <tr>
                                  <td>Transportation</td>
                                  <td>10,000</td>
                                </tr>
                                <tr>
                                  <td>Gym</td>
                                  <td>5,000</td>
                                </tr>
                              </tbody>
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
                  {/* <TabPane tabId={4}>
                    <div className="p-1"> Report Content</div>
                  </TabPane>
                  <TabPane tabId={5}>
                    <div className="p-1"> ID Card Content</div>
                  </TabPane>
                  <TabPane tabId={6}>
                    <div className="p-1"> Document Content</div>
                  </TabPane> */}
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
