import * as React from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import {withApollo} from 'react-apollo';

import {ADD_STUDENT, GET_STUDENT_ADMISSION_DATA} from '../_queries';
import {validators} from '../_services/commonValidation';

type AddStudentStates = {
  activeTab: any;
  uploadPhoto: any;
};

class AddStudentPage extends React.Component<any, AddStudentStates> {
  isActive: any = false;
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: 0,
      uploadPhoto: null,
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
      <section className="tab-container">
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
              <label htmlFor="">*Staff Type:</label>
              <select className="gf-form-input width-11 b-r" required>
                <option value="">Select Staff Type</option>
              </select>
            </div>
            <div className="form-justify">
              <label htmlFor="">*Department:</label>
              <select className="gf-form-input width-11 b-r" required>
                <option value="">Select Department</option>
              </select>
            </div>
            <div className="form-justify">
              <label htmlFor="">*Branch:</label>
              <select className="gf-form-input width-11 b-r" required>
                <option value="">Select Branch</option>
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
                      <label htmlFor="">Name*</label>
                      <input
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
                      <button type="button" className="btn btn-primary border-bottom">
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
                      <label htmlFor="">Address Line 1*</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        required
                        name="adr1"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Address Line 2</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        required
                        name="adr2"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Address Line 3</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        required
                        name="adr3"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Town*</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        required
                        name="stftown"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">State*</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        required
                        name="stfstate"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Country*</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        required
                        name="stfcountry"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Pin Code*</label>
                      <input
                        className="gf-form-input fwidth"
                        type="number"
                        name="stfpin"
                        required
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Contact Number*</label>
                      <input
                        className="gf-form-input fwidth"
                        type="number"
                        name="stfcont"
                        required
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Alternate Contact Number 1</label>
                      <input
                        className="gf-form-input fwidth"
                        type="number"
                        name="stfaltcont"
                        required
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Email Address*</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        required
                        name="stfemail"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Alternate Email Address</label>
                      <input
                        className="gf-form-input fwidth"
                        type="email"
                        required
                        name="stfaltemail"
                        maxLength={255}
                      />
                    </div>
                    <div></div>
                    <div>
                      <button type="button" className="btn btn-primary border-bottom">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tabId={2}>
                <div>
                  <div className="staff-p">
                    <label htmlFor="">Relation with Staff*</label>
                    <select className="gf-form-input fwidth" required>
                      <option value="">Select Relation</option>
                    </select>
                  </div>
                  <div className="form-grid m-t-1">
                    <div>
                      <label htmlFor="">Name*</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        required
                        name="stfpname"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Middle Name</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        required
                        name="stfpmname"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Last Name*</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        required
                        name="stfplname"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Contact Number*</label>
                      <input
                        className="gf-form-input fwidth"
                        type="text"
                        required
                        name="stfpcn"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Email Address*</label>
                      <input
                        className="gf-form-input fwidth"
                        type="email"
                        required
                        name="stfpemail"
                        maxLength={255}
                      />
                    </div>
                    <div></div>
                    <div>
                      <button type="button" className="btn btn-primary border-bottom">
                        Save
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
