import * as React from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import {withApollo} from 'react-apollo';
import wsCmsBackendServiceSingletonClient from '../../../wsCmsBackendServiceClient';
import * as moment from 'moment';
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
  DEFAULT_STUDENT_IMAGE = '/public/img/user_profile.png';
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
        studentMiddleName: '',
        studentLastName: '',
        fatherName: '',
        fatherMiddleName: '',
        fatherLastName: '',
        studentAadharNo: '',
        studentPanNo: '',
        dateOfBirth: '',
        religion: '',
        caste: '',
        sex: '',
        studentLocalAddress: '',
        studentPermanentAddress: '',
        city: '',
        state: '',
        country: '',
        pinCode: '',
        studentPrimaryCellNumber: '',
        studentAlternateCellNumber: '',
        studentPrimaryEmailId: '',
        studentAlternateEmailId: '',
        relationWithStudent: '',
        emergencyContactName: '',
        emergencyContactMiddleName: '',
        emergencyContactLastName: '',
        emergencyContactCellNumber: '',
        studentImagePath: '',
        admissionNo: '',
        rollNo: '',
        studentType: '',
        fatherCellNumber: '',
        fatherEmailId: '',
        status: '',
        comments: '',
        departmentId: '',
        branchId: '',
      },
    };
    this.toggleTab = this.toggleTab.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.validatePersonalInfo = this.validatePersonalInfo.bind(this);
    this.validateContactDetails = this.validateContactDetails.bind(this);
    this.validateEmergencyDetails = this.validateEmergencyDetails.bind(this);
    this.registerSocket = this.registerSocket.bind(this);
    this.save = this.save.bind(this);
    this.doSave = this.doSave.bind(this);
    this.getInput = this.getInput.bind(this);
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
          'Success in saveStaff Mutation. Exit code : '
          // resp.data.addStudent.cmsStudentVo.exitCode
        );
        // exitCode = resp.data.addStudent.cmsStudentVo.exitCode;

        // this.setState({
        //   studentList: resp.data.addStudent.cmsStudentVo.dataList,
        // });
      })
      .catch((error: any) => {
        exitCode = 1;
        console.log('Error in addStudent : ', error);
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

  save = (e: any) => {
    const {id} = e.nativeEvent.target;
    const {studentObj} = this.state;
    if (!this.validatePersonalInfo()) {
      this.toggleTab(0);
      return;
    } else if (!this.validateContactDetails()) {
      this.toggleTab(1);
      return;
    } else if (!this.validateEmergencyDetails()) {
      this.toggleTab(2);
      return;
    }
    const inputObj = this.getInput(studentObj);
    this.doSave(inputObj, id);
  };

  getImage = (e: any) => {
    const {studentObj} = this.state;
    let objImg: any = document.querySelector('#uploadPhoto');
    objImg.src = studentObj.studentImagePath;
    studentObj.studentImagePath = URL.createObjectURL(e.target.files[0]);
    var r = new FileReader();
    r.onload = function(e: any) {
      studentObj.fileName = e.target.result;
      console.log('Image converted to base64 string :\n\n' + studentObj.fileName);
    };
    r.readAsDataURL(e.target.files[0]);

    this.setState({
      studentObj: studentObj,
    });
  };

  deleteImage() {
    const {studentObj} = this.state;
    let objImg: any = document.querySelector('#uploadPhoto');
    objImg.src = null;
    studentObj.studentImagePath = '';
    studentObj.fileName = '';
    this.setState({
      studentObj: studentObj,
    });
  }

  validatePersonalInfo() {
    const {studentObj} = this.state;
    let isValid = true;
    let errorMessage = '';
    // console.log('test inp obj:', studentObj);
    if (
      studentObj.rollNo === undefined ||
      studentObj.rollNo === null ||
      studentObj.rollNo.trim() === ''
    ) {
      commonFunctions.changeTextBoxBorderToError(
        studentObj.rollNo === undefined || studentObj.rollNo === null
          ? ''
          : studentObj.rollNo,
        'rollNo'
      );
      errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
      isValid = false;
    }
    if (
      studentObj.studentType === undefined ||
      studentObj.studentType === null ||
      studentObj.studentType === ''
    ) {
      commonFunctions.changeTextBoxBorderToError(
        studentObj.studentType === undefined || studentObj.studentType === null
          ? ''
          : studentObj.studentType,
        'studentType'
      );
      errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
      isValid = false;
    }
    if (
      studentObj.status === undefined ||
      studentObj.status === null ||
      studentObj.status === ''
    ) {
      commonFunctions.changeTextBoxBorderToError(
        studentObj.status === undefined || studentObj.status === null
          ? ''
          : studentObj.status,
        'status'
      );
      errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
      isValid = false;
    }
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
    if (
      studentObj.studentLastName === undefined ||
      studentObj.studentLastName === null ||
      studentObj.studentLastName.trim() === ''
    ) {
      commonFunctions.changeTextBoxBorderToError(
        studentObj.studentLastName === undefined || studentObj.studentLastName === null
          ? ''
          : studentObj.studentLastName,
        'studentLastName'
      );
      errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
      isValid = false;
    }
    if (
      studentObj.fatherName === undefined ||
      studentObj.fatherName === null ||
      studentObj.fatherName.trim() === ''
    ) {
      commonFunctions.changeTextBoxBorderToError(
        studentObj.fatherName === undefined || studentObj.fatherName === null
          ? ''
          : studentObj.fatherName,
        'fatherName'
      );
      errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
      isValid = false;
    }
    if (
      studentObj.fatherLastName === undefined ||
      studentObj.fatherLastName === null ||
      studentObj.fatherLastName.trim() === ''
    ) {
      commonFunctions.changeTextBoxBorderToError(
        studentObj.fatherLastName === undefined || studentObj.fatherLastName === null
          ? ''
          : studentObj.fatherLastName,
        'fatherLastName'
      );
      errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
      isValid = false;
    }
    if (
      studentObj.dateOfBirth === undefined ||
      studentObj.dateOfBirth === null ||
      studentObj.dateOfBirth.trim() === ''
    ) {
      commonFunctions.changeTextBoxBorderToError(
        studentObj.dateOfBirth === undefined || studentObj.dateOfBirth === null
          ? ''
          : studentObj.dateOfBirth,
        'dateOfBirth'
      );
      errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
      isValid = false;
    }
    if (
      studentObj.sex === undefined ||
      studentObj.sex === null ||
      studentObj.sex.trim() === ''
    ) {
      commonFunctions.changeTextBoxBorderToError(
        studentObj.sex === undefined || studentObj.sex === null ? '' : studentObj.sex,
        'sex'
      );
      errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
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
  validateContactDetails() {
    const {studentObj} = this.state;
    let isValid = true;
    let errorMessage = '';
    if (
      studentObj.rollNo === undefined ||
      studentObj.rollNo === null ||
      studentObj.rollNo.trim() === ''
    ) {
      commonFunctions.changeTextBoxBorderToError(
        studentObj.rollNo === undefined || studentObj.rollNo === null
          ? ''
          : studentObj.rollNo,
        'rollNo'
      );
      errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
      isValid = false;
    }
    if (
      studentObj.studentType === undefined ||
      studentObj.studentType === null ||
      studentObj.studentType === ''
    ) {
      commonFunctions.changeTextBoxBorderToError(
        studentObj.studentType === undefined || studentObj.studentType === null
          ? ''
          : studentObj.studentType,
        'studentType'
      );
      errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
      isValid = false;
    }
    if (
      studentObj.status === undefined ||
      studentObj.status === null ||
      studentObj.status === ''
    ) {
      commonFunctions.changeTextBoxBorderToError(
        studentObj.status === undefined || studentObj.status === null
          ? ''
          : studentObj.status,
        'status'
      );
      errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
      isValid = false;
    }
    if (
      studentObj.studentLocalAddress === undefined ||
      studentObj.studentLocalAddress === null ||
      studentObj.studentLocalAddress.trim() === ''
    ) {
      commonFunctions.changeTextBoxBorderToError(
        studentObj.studentLocalAddress === undefined ||
          studentObj.studentLocalAddress === null
          ? ''
          : studentObj.studentLocalAddress,
        'studentLocalAddress'
      );
      errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
      isValid = false;
    }
    if (
      studentObj.studentPermanentAddress === undefined ||
      studentObj.studentPermanentAddress === null ||
      studentObj.studentPermanentAddress.trim() === ''
    ) {
      commonFunctions.changeTextBoxBorderToError(
        studentObj.studentPermanentAddress === undefined ||
          studentObj.studentPermanentAddress === null
          ? ''
          : studentObj.studentPermanentAddress,
        'studentPermanentAddress'
      );
      errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
      isValid = false;
    }
    if (
      studentObj.studentPrimaryCellNumber === undefined ||
      studentObj.studentPrimaryCellNumber === null ||
      studentObj.studentPrimaryCellNumber.trim() === ''
    ) {
      commonFunctions.changeTextBoxBorderToError(
        studentObj.studentPrimaryCellNumber === undefined ||
          studentObj.studentPrimaryCellNumber === null
          ? ''
          : studentObj.studentPrimaryCellNumber,
        'studentPrimaryCellNumber'
      );
      errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
      isValid = false;
    }
    if (
      studentObj.studentPrimaryEmailId === undefined ||
      studentObj.studentPrimaryEmailId === null ||
      studentObj.studentPrimaryEmailId.trim() === ''
    ) {
      commonFunctions.changeTextBoxBorderToError(
        studentObj.studentPrimaryEmailId === undefined ||
          studentObj.studentPrimaryEmailId === null
          ? ''
          : studentObj.studentPrimaryEmailId,
        'studentPrimaryEmailId'
      );
      errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
      isValid = false;
    }

    this.setState({
      errorMessage: errorMessage,
    });
    // this.props.onSaveUpdate(errorMessage, "");
    if (isValid) {
      this.toggleTab(2);
    }
    return isValid;
  }

  validateEmergencyDetails() {
    const {studentObj} = this.state;
    let isValid = true;
    let errorMessage = '';
    if (
      studentObj.rollNo === undefined ||
      studentObj.rollNo === null ||
      studentObj.rollNo.trim() === ''
    ) {
      commonFunctions.changeTextBoxBorderToError(
        studentObj.rollNo === undefined || studentObj.rollNo === null
          ? ''
          : studentObj.rollNo,
        'rollNo'
      );
      errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
      isValid = false;
    }
    if (
      studentObj.studentType === undefined ||
      studentObj.studentType === null ||
      studentObj.studentType === ''
    ) {
      commonFunctions.changeTextBoxBorderToError(
        studentObj.studentType === undefined || studentObj.studentType === null
          ? ''
          : studentObj.studentType,
        'studentType'
      );
      errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
      isValid = false;
    }
    if (
      studentObj.status === undefined ||
      studentObj.status === null ||
      studentObj.status === ''
    ) {
      commonFunctions.changeTextBoxBorderToError(
        studentObj.status === undefined || studentObj.status === null
          ? ''
          : studentObj.status,
        'status'
      );
      errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
      isValid = false;
    }
    if (
      studentObj.relationWithStudent === undefined ||
      studentObj.relationWithStudent === null ||
      studentObj.relationWithStudent === ''
    ) {
      commonFunctions.changeTextBoxBorderToError(
        studentObj.relationWithStudent === undefined ||
          studentObj.relationWithStudent === null
          ? ''
          : studentObj.relationWithStudent,
        'relationWithStudent'
      );
      errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
      isValid = false;
    }
    if (
      studentObj.emergencyContactName === undefined ||
      studentObj.emergencyContactName === null ||
      studentObj.emergencyContactName.trim() === ''
    ) {
      commonFunctions.changeTextBoxBorderToError(
        studentObj.emergencyContactName === undefined ||
          studentObj.emergencyContactName === null
          ? ''
          : studentObj.emergencyContactName,
        'emergencyContactName'
      );
      errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
      isValid = false;
    }
    if (
      studentObj.emergencyContactLastName === undefined ||
      studentObj.emergencyContactLastName === null ||
      studentObj.emergencyContactLastName.trim() === ''
    ) {
      commonFunctions.changeTextBoxBorderToError(
        studentObj.emergencyContactLastName === undefined ||
          studentObj.emergencyContactLastName === null
          ? ''
          : studentObj.emergencyContactLastName,
        'emergencyContactLastName'
      );
      errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
      isValid = false;
    }
    if (
      studentObj.emergencyContactCellNumber === undefined ||
      studentObj.emergencyContactCellNumber === null ||
      studentObj.emergencyContactCellNumber.trim() === ''
    ) {
      commonFunctions.changeTextBoxBorderToError(
        studentObj.emergencyContactCellNumber === undefined ||
          studentObj.emergencyContactCellNumber === null
          ? ''
          : studentObj.emergencyContactCellNumber,
        'emergencyContactCellNumber'
      );
      errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
      isValid = false;
    }

    this.setState({
      errorMessage: errorMessage,
    });
    // this.props.onSaveUpdate(errorMessage, "");
    if (isValid) {
      this.toggleTab(2);
    }
    return isValid;
  }

  getInput(studentObj: any) {
    const {branchId, departmentId} = this.state;
    let inputObj = {
      id:
        studentObj.id !== null || studentObj.id !== undefined || studentObj.id !== ''
          ? studentObj.id
          : null,
      // uploadPhoto: null,
      // logoFilePath: null,
      // logoFileName: null,
      // logoFileExtension: null,
      // logoFile: null,
      studentName: studentObj.studentName,
      studentMiddleName: studentObj.studentMiddleName,
      studentLastName: studentObj.studentLastName,
      fatherName: studentObj.fatherName,
      fatherMiddleName: studentObj.fatherMiddleName,
      fatherLastName: studentObj.fatherLastName,
      studentAadharNo: studentObj.studentAadharNo,
      studentPanNo: studentObj.studentPanNo,
      religion: studentObj.religion,
      caste: studentObj.caste,
      sex: studentObj.sex,
      studentLocalAddress: studentObj.studentLocalAddress,
      studentPermanentAddress: studentObj.studentPermanentAddress,
      town: studentObj.town,
      state: studentObj.state,
      country: studentObj.country,
      pinCode: studentObj.pinCode,
      studentPrimaryCellNumber: studentObj.studentPrimaryCellNumber,
      alternateContactNumber: studentObj.alternateContactNumber,
      studentAlternateCellNumber: studentObj.studentAlternateCellNumber,
      studentPrimaryEmailId: studentObj.studentPrimaryEmailId,
      studentAlternateEmailId: studentObj.studentAlternateEmailId,
      relationWithStudent: studentObj.relationWithStudent,
      emergencyContactName: studentObj.emergencyContactName,
      emergencyContactMiddleName: studentObj.emergencyContactMiddleName,
      emergencyContactLastName: studentObj.emergencyContactLastName,
      emergencyContactCellNumber: studentObj.emergencyContactCellNumber,
      emergencyContactEmailId: studentObj.emergencyContactEmailId,
      status: studentObj.status,
      rollNo: studentObj.rollNo,
      studentType: studentObj.studentType,
      departmentId: departmentId,
      branchId: branchId,
      strDateOfBirth:
        studentObj.dateOfBirth !== null ||
        studentObj.dateOfBirth !== undefined ||
        studentObj.dateOfBirth !== ''
          ? moment(studentObj.dateOfBirth).format('DD-MM-YYYY')
          : '',
    };
    return inputObj;
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

        <div className="m-b-1 bg-heading-bgStudent studentListFlex p-point5">
          <div className="">
            <h4 className="ptl-06"> Add Student</h4>
          </div>
          <div className="asflex">
            <label>
              Status <span style={{color: 'red'}}> * </span>{' '}
            </label>
            <select
              name="status"
              id="status"
              className="gf-form-input width-11 m-1"
              style={{width: '10.8rem', marginLeft: '10px'}}
              onChange={this.onChange}
              value={studentObj.status}
              required
            >
              <option key={''} value={''}>
                Select Status
              </option>
              <option key={'ACTIVE'} value={'ACTIVE'}>
                ACTIVE
              </option>
              <option key={'DEACTIVE'} value={'DEACTIVE'}>
                DEACTIVE
              </option>
              <option key={'DRAFT'} value={'DRAFT'}>
                DRAFT
              </option>
            </select>
          </div>
        </div>
        <div className="grid">
          <div className="leftbar">
            <div className="row p-1">
              <div className="">
                <img
                  id="studentImagePath"
                  src={studentObj.studentImagePath || this.DEFAULT_STUDENT_IMAGE}
                  className="student-photo"
                  style={{width: '150px', height: '150px'}}
                />
              </div>
            </div>
            <div className="gf-form m-b-1">
              {/* <label className="upload-cursor">
                <input
                  id="d-none"
                  type="file"
                  file-select="ctrl.getFile(file)"
                  className="gf-form-file-input"
                  accept="image/*"
                />
                Upload <i className="fa fa-info-circle l-grey" aria-hidden="true" />
              </label> */}
              <label className="upload-cursor m-r-2" style={{marginLeft: '0rem'}}>
                <input
                  type="file"
                  id="d-none"
                  accept="image/*"
                  onChange={this.getImage}
                />
                Upload <i className="fa fa-info-circle l-grey" aria-hidden="true" />
              </label>
              <label className="upload-cursor">
                <input type="button" id="d-none" onClick={this.deleteImage} />
                Delete
              </label>
            </div>
            <div className="form-justify">
              <label htmlFor="">
                Roll No <span style={{color: 'red'}}> * </span>
              </label>
              <input
                className="gf-form-input width-11 m-b-1"
                style={{width: '10.8rem', marginBottom: '10px'}}
                name="rollNo"
                id="rollNo"
                onChange={this.onChange}
                type="number"
                maxLength={255}
                required
              />
            </div>
            <div className="form-justify">
              <label htmlFor="">
                Year <span style={{color: 'red'}}> * </span>
              </label>
              <select
                // name="studentType"
                // id="studentType"
                className="gf-form-input width-11 m-b-1"
                style={{width: '10.8rem', marginBottom: '10px', borderRadius: '0px'}}
                onChange={this.onChange}
                // value={studentObj.batch.id}
              >
                <option value="">Select Year</option>
              </select>
            </div>
            <div className="form-justify">
              <label htmlFor="">
                Section <span style={{color: 'red'}}> * </span>
              </label>
              <select
                // name="studentType"
                // id="studentType"
                className="gf-form-input width-11 m-b-1"
                style={{width: '10.8rem', marginBottom: '10px', borderRadius: '0px'}}
                onChange={this.onChange}
                // value={studentObj.section.id}
              >
                <option value="">Select Section</option>
              </select>
            </div>
            <div className="form-justify">
              <label htmlFor="">
                Student Type <span style={{color: 'red'}}> * </span>
              </label>
              <select
                name="studentType"
                id="studentType"
                className="gf-form-input width-11 m-b-1"
                style={{width: '10.8rem', marginBottom: '10px', borderRadius: '0px'}}
                onChange={this.onChange}
                value={studentObj.studentType}
                required
              >
                <option value="">Select Student Type</option>
                <option value="REGULAR">REGULAR</option>
                <option value="STAFF_CONCESSION">STAFF_CONCESSION</option>
                <option value="REGULAR">BENEFITS</option>
                <option value="SCHOLARSHIP">SCHOLARSHIP</option>
                <option value="OTHER_BENEFITS">OTHER_BENEFITS</option>
              </select>
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
                        First Name <span style={{color: 'red'}}> * </span>
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
                        value={studentObj.studentMiddleName}
                        id="studentMiddleName"
                        className="gf-form-input fwidth"
                        type="text"
                        name="studentMiddleName"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">
                        Student Last Name <span style={{color: 'red'}}> * </span>
                      </label>
                      <input
                        onChange={this.onChange}
                        value={studentObj.studentLastName}
                        id="studentLastName"
                        className="gf-form-input fwidth"
                        type="text"
                        required
                        name="studentLastName"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">
                        Father Name <span style={{color: 'red'}}> * </span>
                      </label>
                      <input
                        onChange={this.onChange}
                        value={studentObj.fatherName}
                        id="fatherName"
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
                        onChange={this.onChange}
                        value={studentObj.fatherMiddleName}
                        className="gf-form-input fwidth"
                        type="text"
                        name="fatherMiddleName"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">
                        Father Last Name <span style={{color: 'red'}}> * </span>
                      </label>
                      <input
                        onChange={this.onChange}
                        value={studentObj.fatherLastName}
                        id="fatherLastName"
                        className="gf-form-input fwidth"
                        type="text"
                        required
                        name="fatherLastName"
                        maxLength={255}
                      />
                    </div>

                    <div>
                      <label htmlFor="">Adhar No</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        onChange={this.onChange}
                        value={studentObj.studentAadharNo}
                        name="studentAadharNo"
                        id="studentAadharNo"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">PAN No</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        onChange={this.onChange}
                        value={studentObj.studentPanNo}
                        name="studentPanNo"
                        id="studentPanNo"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">
                        Date Of Birth <span style={{color: 'red'}}> * </span>
                      </label>
                      <input
                        onChange={this.onChange}
                        value={studentObj.dateOfBirth}
                        id="dateOfBirth"
                        className="gf-form-input fwidth"
                        name="dateOfBirth"
                        type="date"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="">Religion</label>
                      <select
                        className="gf-form-input fwidth"
                        onChange={this.onChange}
                        value={studentObj.religion}
                        name="religion"
                        id="religion"
                      >
                        <option value="">Select Religion</option>
                        <option value="HINDU">HINDU</option>
                        <option value="MUSLIM">MUSLIM</option>
                        <option value="SIKH">SIKH</option>
                        <option value="CHRISTIAN">CHRISTIAN</option>
                        <option value="BUDH">BUDH</option>
                        <option value="PARSIAN">PARSIAN</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="">Caste</label>
                      <select
                        className="gf-form-input fwidth"
                        onChange={this.onChange}
                        value={studentObj.caste}
                        name="caste"
                        id="caste"
                      >
                        <option value="">Select Caste</option>
                        <option value="GENERAL">GENERAL</option>
                        <option value="SC">SCHEDULED CASTES</option>
                        <option value="ST">SCHEDULED TRIBES</option>
                        <option value="OBC">OTHER BACKWARDS CLASSES</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="">
                        Gender<span style={{color: 'red'}}> * </span>
                      </label>
                      <select
                        className="gf-form-input fwidth"
                        onChange={this.onChange}
                        value={studentObj.sex}
                        name="sex"
                        id="sex"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Both">Both</option>
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
              <TabPane tabId={1}>
                <div>
                  <div className="form-grid">
                    <div>
                      <label htmlFor="">
                        Local Address<span style={{color: 'red'}}> * </span>
                      </label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        onChange={this.onChange}
                        value={studentObj.studentLocalAddress}
                        name="studentLocalAddress"
                        id="studentLocalAddress"
                        maxLength={255}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="">
                        Permanent Address<span style={{color: 'red'}}> * </span>
                      </label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        onChange={this.onChange}
                        value={studentObj.studentPermanentAddress}
                        name="studentPermanentAddress"
                        id="studentPermanentAddress"
                        maxLength={255}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="">City</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        onChange={this.onChange}
                        value={studentObj.city}
                        name="city"
                        id="city"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">State</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        onChange={this.onChange}
                        value={studentObj.state}
                        name="state"
                        id="state"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Country</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        onChange={this.onChange}
                        value={studentObj.country}
                        name="country"
                        id="country"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Pin Code</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        onChange={this.onChange}
                        value={studentObj.pinCode}
                        name="pinCode"
                        id="pinCode"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">
                        Primary Contact Number<span style={{color: 'red'}}> * </span>
                      </label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        onChange={this.onChange}
                        value={studentObj.studentPrimaryCellNumber}
                        name="studentPrimaryCellNumber"
                        id="studentPrimaryCellNumber"
                        maxLength={255}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="">Alternate Contact Number</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        onChange={this.onChange}
                        value={studentObj.studentAlternateCellNumber}
                        name="studentAlternateCellNumber"
                        id="studentAlternateCellNumber"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">
                        Primary Email Address<span style={{color: 'red'}}> * </span>
                      </label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        onChange={this.onChange}
                        value={studentObj.studentPrimaryEmailId}
                        name="studentPrimaryEmailId"
                        id="studentPrimaryEmailId"
                        maxLength={255}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="">Alternate Email Address</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        onChange={this.onChange}
                        value={studentObj.studentAlternateEmailId}
                        name="studentAlternateEmailId"
                        id="studentAlternateEmailId"
                        maxLength={255}
                      />
                    </div>
                    <div></div>
                    <div></div>
                    <div>
                      <button
                        type="button"
                        onClick={this.validateContactDetails}
                        className="btn btn-primary border-bottom"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tabId={2}>
                <div>
                  <div className="st-p">
                    <label htmlFor="">
                      Relation with Student<span style={{color: 'red'}}> * </span>
                    </label>
                    <select
                      className="gf-form-input fwidth"
                      onChange={this.onChange}
                      value={studentObj.relationWithStudent}
                      name="relationWithStudent"
                      id="relationWithStudent"
                      required
                    >
                      <option value="">Select Relation</option>
                      <option value="FATHER">FATHER</option>
                      <option value="MOTHER">MOTHER</option>
                      <option value="GUARDIAN">GUARDIAN</option>
                    </select>
                  </div>
                  <div className="form-grid m-t-1">
                    <div>
                      <label htmlFor="">
                        Emergency Contact Name<span style={{color: 'red'}}> * </span>
                      </label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        onChange={this.onChange}
                        value={studentObj.emergencyContactName}
                        name="emergencyContactName"
                        id="emergencyContactName"
                        maxLength={255}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="">Emergency Contact Middle Name</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        onChange={this.onChange}
                        value={studentObj.emergencyContactMiddleName}
                        name="emergencyContactMiddleName"
                        id="emergencyContactMiddleName"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">
                        Emergency Contact Last Name<span style={{color: 'red'}}> * </span>
                      </label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        onChange={this.onChange}
                        value={studentObj.emergencyContactLastName}
                        name="emergencyContactLastName"
                        id="emergencyContactLastName"
                        maxLength={255}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="">
                        Emergency Contact Number<span style={{color: 'red'}}> * </span>
                      </label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        onChange={this.onChange}
                        value={studentObj.emergencyContactCellNumber}
                        name="emergencyContactCellNumber"
                        id="emergencyContactCellNumber"
                        maxLength={255}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="">Emergency Email Address</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        onChange={this.onChange}
                        value={studentObj.emergencyContactEmailId}
                        name="emergencyContactEmailId"
                        id="emergencyContactEmailId"
                        maxLength={255}
                      />
                    </div>
                    <div></div>
                    <div>
                      <button
                        type="button"
                        name="btnSaveStudent"
                        id="btnSaveStudent"
                        onClick={this.save}
                        className="btn btn-primary border-bottom"
                      >
                        {' '}
                        Save{' '}
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
