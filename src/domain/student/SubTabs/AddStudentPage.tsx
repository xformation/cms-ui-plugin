import * as React from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import {withApollo} from 'react-apollo';
import wsCmsBackendServiceSingletonClient from '../../../wsCmsBackendServiceClient';

import {ADD_STUDENT, GET_STUDENT_ADMISSION_DATA} from '../_queries';
import {MessageBox} from '../Message/MessageBox';
import {commonFunctions} from '../_utilites/common.functions';

export interface StudentProps extends React.HTMLAttributes<HTMLElement> {
  [data: string]: any;
  branchList?: any;
  departmentList?: any;
  // user?: any;
}

const ERROR_MESSAGE_MANDATORY_FIELD_MISSING = 'Mandatory fields missing';
const ERROR_MESSAGE_INVALID_EMAIL_ID = 'Invalid email id';
const ERROR_MESSAGE_SERVER_SIDE_ERROR =
  'Due to some error in preferences service, student could not be saved. Please check preferences service logs';
const SUCCESS_MESSAGE_STUDENT_ADDED = 'New employee saved successfully';
const SUCCESS_MESSAGE_STUDENT_UPDATED = 'Employee updated successfully';

class AddStudentPage extends React.Component<StudentProps, any> {
  // DEFAULT_STUDENT_IMAGE = '/public/img/user_profile.png';
  isActive: any = false;
  constructor(props: any) {
    super(props);
    this.state = {
      branchList: this.props.branchList,
      departmentList: this.props.departmentList,
      // user: this.props.user,
      activeTab: 0,
      uploadPhoto: null,
      branchId: null,
      academicYearId: null,
      departmentId: null,
      errorMessage: '',
      successMessage: '',
      studentObj: {
        studentName: '',
        departmentId: '',
        branchId: '',
      },
    };
    this.toggleTab = this.toggleTab.bind(this);
    this.validatePersonalInfo = this.validatePersonalInfo.bind(this);
    this.registerSocket = this.registerSocket.bind(this);
  }

  async componentDidMount() {
    await this.registerSocket();
  }

  registerSocket() {
    const socket = wsCmsBackendServiceSingletonClient.getInstance();

    socket.onmessage = (response: any) => {
      let message = JSON.parse(response.data);
      console.log('Student. message received from server ::: ', message);
      this.setState({
        branchId: message.selectedBranchId,
        academicYearId: message.selectedAcademicYearId,
        departmentId: message.selectedDepartmentId,
      });
      console.log('Student. branchId: ', this.state.branchId);
      console.log('Student. ayId: ', this.state.academicYearId);
    };

    socket.onopen = () => {
      // console.log(
      //   'Student. Opening websocekt connection to cmsbackend. User : ',
      //   this.state.user.login
      // );
      // socket.send(this.state.user.login);
    };

    window.onbeforeunload = () => {
      console.log('Student. Closing websocket connection with cms backend service');
    };
  }

  toggleTab(tabNo: any) {
    this.setState({
      activeTab: tabNo,
    });
  }

  async doSave(inputObj: any, id: any) {
    let btn = document.querySelector('#' + id);
    btn && btn.setAttribute('disabled', 'true');
    let exitCode = 0;

    await this.props.client
      .mutate({
        mutation: ADD_STUDENT,
        variables: {
          input: inputObj,
        },
      })
      .then((resp: any) => {
        console.log(
          'Success in saveStudent Mutation. Exit code : '
          // resp.data.saveTeacher.cmsTeacherVo.exitCode
        );
        // exitCode = resp.data.saveTeacher.cmsTeacherVo.exitCode;

        this.setState({
          // staffList: resp.data.saveTeacher.cmsTeacherVo.dataList,
        });
      })
      .catch((error: any) => {
        exitCode = 1;
        console.log('Error in saveStudent : ', error);
      });
    btn && btn.removeAttribute('disabled');

    let errorMessage = '';
    let successMessage = '';
    if (exitCode === 0) {
      successMessage = SUCCESS_MESSAGE_STUDENT_ADDED;
      if (inputObj.id !== null) {
        successMessage = SUCCESS_MESSAGE_STUDENT_UPDATED;
      }
    } else {
      errorMessage = ERROR_MESSAGE_SERVER_SIDE_ERROR;
    }
    this.setState({
      successMessage: successMessage,
      errorMessage: errorMessage,
    });
    // this.props.onSaveUpdate(errorMessage, successMessage);
  }

  onChange = (e: any) => {
    e.preventDefault();
    const {name, value} = e.nativeEvent.target;
    const {studentObj} = this.state;
    this.setState({
      studentObj: {
        ...studentObj,
        [name]: value,
      },
      errorMessage: '',
      successMessage: '',
    });

    commonFunctions.restoreTextBoxBorderToNormal(name);
  };

  validatePersonalInfo() {
    const {studentObj} = this.state;
    let isValid = true;
    let errorMessage = '';
    if (
      studentObj.studentName === undefined ||
      studentObj.studentName === null ||
      studentObj.studentName.trim() === ''
    ) {
      commonFunctions.changeTextBoxBorderToError(
        studentObj.studentName === undefined || studentObj.studentName === null
          ? ''
          : studentObj.studentName,
        'studentName'
      );
      errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
      console.log('check msg error:', errorMessage);
      isValid = false;
    }
    this.setState({
      errorMessage: errorMessage,
    });

    if (isValid) {
      this.toggleTab(1);
    }
    return isValid;
  }

  // getInput(studentObj: any) {
  //   let inputObj = {
  //     studentName: studentObj.studentName,
  //   };
  //   return inputObj;
  // }

  render() {
    const {activeTab, errorMessage, successMessage, studentObj} = this.state;
    return (
      <section className="tab-container">
        {errorMessage !== '' ? (
          <MessageBox id="mbox" message={errorMessage} activeTab={2} />
        ) : null}
        {successMessage !== '' ? (
          <MessageBox id="mbox" message={successMessage} activeTab={1} />
        ) : null}
        <div className="grid">
          <div className="leftbar">
            <div className="row p-1">
              <div className="">
                <img
                  className="student-photo"
                  id="stPhoto"
                  src={this.state.uploadPhoto}
                />
              </div>
            </div>
            {/* <img src="{{ ctrl.profileSrc }}" alt="" className="img-width" /> */}
            <div className="gf-form m-b-1">
              <label className="upload-cursor">
                <input
                  id="d-none"
                  type="file"
                  file-select="ctrl.getFile(file)"
                  className="gf-form-file-input"
                  accept="image/*"
                />
                Upload <i className="fa fa-info-circle l-grey" aria-hidden="true" />
              </label>
            </div>
            <div className="form-justify">
              <label htmlFor="">*Upload photo:</label>
              <input
                className="gf-form-input width-11 m-b-1"
                type="text"
                maxLength={255}
              />
            </div>
            <div className="form-justify">
              <label htmlFor="">*Employee Id:</label>
              <input
                className="gf-form-input width-11 m-b-1"
                required
                type="number"
                name="employeeid"
              />
            </div>
            <div className="form-justify">
              <label htmlFor="">*Designation:</label>
              <input
                className="gf-form-input width-11 m-b-1"
                type="text"
                maxLength={255}
                required
                name="designation"
              />
            </div>
            <div className="form-justify">
              <label htmlFor="">*Student Type:</label>
              <select className="gf-form-input width-11 b-r" required>
                <option value="">Select Student Type</option>
              </select>
            </div>
            <div className="form-justify">
              <span>*Status:</span>
              <label className="switch">
                <input type="checkbox" /> <span className="slider" />
              </label>
            </div>
          </div>
          <div className="">
            <Nav tabs className="" id="rmfloat">
              <NavItem className="cursor-pointer">
                <NavLink
                  className={`${activeTab === 0 ? 'active' : ''}`}
                  onClick={() => {
                    this.toggleTab(0);
                  }}
                >
                  Personal Details
                </NavLink>
              </NavItem>
              <NavItem className="cursor-pointer">
                <NavLink
                  className={`${activeTab === 1 ? 'active' : ''}`}
                  onClick={() => {
                    this.toggleTab(1);
                  }}
                >
                  Contact Details
                </NavLink>
              </NavItem>
              <NavItem className="cursor-pointer">
                <NavLink
                  className={`${activeTab === 2 ? 'active' : ''}`}
                  onClick={() => {
                    this.toggleTab(2);
                  }}
                >
                  Primary & Emergency Contact
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab} className="ltab-contianer p-0">
              <TabPane tabId={0}>
                <div>
                  <div className="form-grid">
                    <div>
                      <label htmlFor="">
                        Name <span style={{color: 'red'}}> * </span>
                      </label>
                      <input
                        onChange={this.onChange}
                        value={studentObj.studentName}
                        id="studentName"
                        className="gf-form-input fwidth"
                        type="text"
                        required
                        name="studentName"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Middle Name</label>
                      <input
                        onChange={this.onChange}
                        // value={studentObj.studentName}
                        id="studentMiddleName"
                        className="gf-form-input fwidth"
                        type="text"
                        name="studentMiddleName"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Last Name*</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        required
                        name="studentLastName"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Father Name*</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        required
                        name="fatherName"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Father Middle Name</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        name="fatherMiddleName"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Father Last Name*</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        required
                        name="fatherLastName"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Mother Name*</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        required
                        name="motherName"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Mother Middle Name</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        name="motherMiddleName"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Mother Last Name*</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        required
                        name="motherLastName"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Adhar No*</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        name="aadharNo"
                        required
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Date Of Birth*</label>
                      <input
                        className="gf-form-input fwidth"
                        name="dateOfBirth"
                        type="date"
                      />
                    </div>
                    <div>
                      <label htmlFor="">Place Of Birth*</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        required
                        name="placeOfBirth"
                      />
                    </div>
                    <div>
                      <label htmlFor="">Religion*</label>
                      <select className="gf-form-input fwidth" name="religion" required>
                        <option value="">Select Religion</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="">Caste*</label>
                      <select className="gf-form-input fwidth" name="caste" required>
                        <option value="">Select Caste</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="">Subcaste*</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        required
                        name="subCaste"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Age*</label>
                      <input
                        className="gf-form-input fwidth"
                        required
                        name="age"
                        type="text"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Sex*</label>
                      <select className="gf-form-input fwidth" required>
                        <option value="">Select Gender</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="">Blood Group*</label>
                      <select className="gf-form-input fwidth" required>
                        <option value="">Select Blood Group</option>
                      </select>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={this.validatePersonalInfo}
                        className="btn btn-primary border-bottom"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </section>
    );
  }
}

export default withApollo(AddStudentPage);
