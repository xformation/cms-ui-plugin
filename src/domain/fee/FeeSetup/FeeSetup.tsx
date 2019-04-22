import * as React from 'react';
import { graphql, MutationFunc } from 'react-apollo';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import * as AddFeeMutationGql from './FeeSetupMutation.graphql';
// import PersonalData from './PersonalData';
import ContactData from './ContactData';
import OtherContactData from './OtherContactData';
import FacilityData from './FacilityData';
import { FeeServices } from './_services';
import {
  AddFeeMutation,
  AddFeeInput,
  AddFeeMutationVariables,
  // FeeData,
} from '../../types';

import withLoadingHandler from '../../../components/withLoadingHandler';

// import 'bootstrap/dist/css/bootstrap.min.css';

type AddFeePageOwnProps = RouteComponentProps<{}>;
type AddFeePageProps = AddFeePageOwnProps & {
  mutate: MutationFunc<AddFeeMutation>;
};

function onClickHeader(e: any) {
  const { currentTarget } = e;
  const plusSign = currentTarget.querySelector(".fa-plus");
  const minusSign = currentTarget.querySelector(".fa-minus");
  const collapseContainer = currentTarget.closest(".collapse-container");
  const formContainer = collapseContainer.querySelector(".gf-form-inline");
  const style = window.getComputedStyle(formContainer);
  if (style.display === "none") {
    formContainer.style.display = "flex";
    minusSign.style.display = "block";
    plusSign.style.display = "none";
  } else {
    formContainer.style.display = "none";
    minusSign.style.display = "none";
    plusSign.style.display = "block";
  }
}

type EditFeeProfileStates = {
  feeData: any,
  departments: any,
  branches: any,
  batches: any,
  sections: any,
  submitted: any
};

class FeeSetup extends React.Component<AddFeePageProps, EditFeeProfileStates>{
  constructor(props: any) {
    super(props);
    this.state = {
      feeData: {
        department: {
          id: ""
        },
        batch: {
          id: ""
        },
        branch: {
          id: ""
        },
        section: {
          id: ""
        }
      },
      departments: [],
      branches: [],
      batches: [],
      sections: [],
      submitted: false
    };
    this.createDepartments = this.createDepartments.bind(this);
    this.createBranches = this.createBranches.bind(this);
    this.createBatches = this.createBatches.bind(this);
    this.createSections = this.createSections.bind(this);
    this.createFeeTypeOptions = this.createFeeTypeOptions.bind(this);
  }
  // componentDidMount() {
  //   Promise.all([FeeServices.getFeeDepartments(), FeeServices.getFeeBranches(), FeeServices.getFeeYears(), FeeServices.getFeeSections()]).then(
  //     data => {
  //       let departments = data[0];
  //       let branches = data[1];
  //       let batches = data[2];
  //       let sections = data[3];
  //       this.setState({
  //         departments,
  //         branches,
  //         batches,
  //         sections
  //       });
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }
  createDepartments(departments: any) {
    let departmentsOptions = [<option key={0} value="">Select department</option>];
    for (let i = 0; i < departments.length; i++) {
      departmentsOptions.push(
        <option key={departments[i].id} value={departments[i].id}>{departments[i].name}</option>
      );
    }
    return departmentsOptions;
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
  createBatches(batches: any, selectedDepartmentId: any) {
    let batchesOptions = [<option key={0} value="">Select Year</option>];
    for (let i = 0; i < batches.length; i++) {
      let id = batches[i].id;
      if (batches[i].departmentId == selectedDepartmentId) {
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
      if (sections[i].batchId == selectedBatchId) {
        let id = sections[i].id;
        sectionsOptions.push(
          <option key={id} value={id}>{sections[i].section}</option>
        );
      }
    }
    return sectionsOptions;
  }
  createFeeTypeOptions(selectedType: any) {
    let feeTypes: any = {
      REGULAR: "REGULAR",
      STAFF_CONCESSION: "STAFF_CONCESSION",
      BENEFITS: "BENEFITS",
      SCHOLARSHIP: "SCHOLARSHIP",
      OTHER_BENEFITS: "OTHER_BENEFITS"
    }
    let feeTypesOptions = [<option key={0} value="">Select Type</option>];
    for (let i in feeTypes) {
      let feeType = feeTypes[i];
      feeTypesOptions.push(
        <option key={feeType} value={feeType} selected={selectedType === feeType}>{feeType}</option>
      );
    }
    return feeTypesOptions;
  }
  onFormSubmit = (e: any) => {
    this.setState({
      submitted: true
    });
    const { mutate } = this.props;
    const { feeData } = this.state;
    e.preventDefault();
    if (feeData.department.id && feeData.branch.id && feeData.batch.id && feeData.feeType && feeData.section.id) {

      let dplFeeData = {
        ...feeData,
        batchId: feeData.batch.id,
        sectionId: feeData.section.id,
        branchId: feeData.branch.id,
        departmentId: feeData.department.id,
        uploadPhoto: ""
      };
      delete dplFeeData.batch;
      delete dplFeeData.section;
      delete dplFeeData.branch;
      delete dplFeeData.department;
      delete dplFeeData.__typename;
      let btn = e.target.querySelector("button[type='submit']");
      btn.setAttribute("disabled", true);
      let dataSavedMessage: any = document.querySelector(".data-saved-message");
      dataSavedMessage.style.display = "none";
      return mutate({
        variables: { input: dplFeeData },
      }).then((data: any) => {
        btn.removeAttribute("disabled");
        dataSavedMessage.style.display = "inline-block";
        // location.href = `${location.origin}/plugins/ems-fee/page/fees`;
      }).catch((error: any) => {
        btn.removeAttribute("disabled");
        dataSavedMessage.style.display = "inline-block";
        console.log('there was an error sending the update mutation', error);
        return Promise.reject(`Could not save fee: ${error}`);
      });
    }
  }
  onChange = (e: any) => {
    const { name, value } = e.nativeEvent.target;
    const { feeData } = this.state;
    if (name === "department") {
      this.setState({
        feeData: {
          ...feeData,
          department: {
            id: value
          },
          batch: {
            id: ""
          },
          section: {
            id: ""
          }
        }
      });
    } else if (name === "branch") {
      this.setState({
        feeData: {
          ...feeData,
          branch: {
            id: value
          }
        }
      });
    } else if (name === "section") {
      this.setState({
        feeData: {
          ...feeData,
          section: {
            id: value
          }
        }
      });
    } else if (name === "feeType") {
      this.setState({
        feeData: {
          ...feeData,
          feeType: value
        }
      });
    } else if (name === "batch") {
      this.setState({
        feeData: {
          ...feeData,
          batch: {
            id: value
          },
          section: {
            id: ""
          }
        }
      });
    } else {
      this.setState({
        feeData: {
          ...feeData,
          [name]: value
        }
      });
    }
  }
  render() {
    const { history, match, mutate } = this.props;
    const { feeData, departments, batches, branches, sections, submitted } = this.state;
    return (
      <section className="customCss">
        <h3 className="bg-heading p-1 m-b-2">
          <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '}
          Admin - Fee Management
				</h3>
        <div className="fee-profile-container">
          <form className="gf-form-group" onSubmit={this.onFormSubmit}>
            <div className="row m-0">
              <div className="col-sm-12 col-xs-12 profile-header m-b-2">
                <div className="col-sm-12 col-xs-12 m-b-2 bg-heading">
                  <div className="pull-left ">Fee Management</div>
                  <div className="pull-right">
                    <button className="btn bs" type="submit">Save</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-main-container m-0">
              <div className="fee-photo-container">
                <div className="collapse-container">
                  <div className="collapse-header">
                    <div className="collapse-title btn btn-primary width-11" onClick={onClickHeader}> <i className="fa fa-plus" aria-hidden="true"></i> Add Fee Category</div>
                  </div>
                  <div className="gf-form-inline">
                    <div className="p-1">
                      <div className=""> <h4 className="bg-heading">Create Fee Category</h4></div>
                      <div className="grid-2 width">
                        <div className="">
                          <label htmlFor="">Category Name</label>
                          <input type="text" placeholder="Enter Fee Category" />
                        </div>
                        <div className="">
                          <label htmlFor="">Description</label>
                          <input type="text" placeholder="Fee applicable to all fees" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fee-profile-form">

                <div className="collapse-container">
                  <div className="collapse-header">
                    <div className="collapse-title">Personal Details</div>
                    <div className="collapse-icon" onClick={onClickHeader}>
                      <i className="fa fa-fw fa-plus"></i>
                      <i className="fa fa-fw fa-minus"></i>
                    </div>
                    <div className="clear-both"></div>
                  </div>
                  <div className="gf-form-inline">
                    <div className="gf-form">
                      <span className="gf-form-label width-8">Admission No</span>
                      <input name="admissionNo" value={feeData.admissionNo} onChange={this.onChange} type="text" className="gf-form-input max-width-22" />
                    </div>
                    <div className="gf-form">
                      <span className="gf-form-label width-8">Roll No</span>
                      <input name="rollNo" type="text" className="gf-form-input max-width-22" value={feeData.rollNo} onChange={this.onChange} />
                    </div>
                    <div className="gf-form">
                      <span className="gf-form-label width-8">Department</span>
                      <select name="department" onChange={this.onChange} value={feeData.department.id} className="gf-form-input max-width-22">
                        {this.createDepartments(departments)}
                      </select>
                    </div>
                    {
                      submitted && !feeData.department.id &&
                      <div>
                        Fee department needed.
										</div>
                    }
                    <div className="gf-form">
                      <span className="gf-form-label width-8">Year</span>
                      <select name="batch" onChange={this.onChange} value={feeData.batch.id} className="gf-form-input max-width-22">
                        {this.createBatches(batches, feeData.department.id)}
                      </select>
                    </div>
                    {
                      submitted && !feeData.batch.id &&
                      <div>
                        Fee batch needed.
										</div>
                    }
                    <div className="gf-form">
                      <span className="gf-form-label width-8">Branch</span>
                      <select name="branch" onChange={this.onChange} value={feeData.branch.id} className="gf-form-input max-width-22">
                        {this.createBranches(branches)}
                      </select>
                    </div>
                    {
                      submitted && !feeData.branch.id &&
                      <div>
                        Fee branch needed.
										</div>
                    }
                    <div className="gf-form-inline">
                      <span className="gf-form-label width-8">Section</span>
                      <select name="section" onChange={this.onChange} value={feeData.section.id} className="gf-form-input max-width-22">
                        {this.createSections(sections, feeData.batch.id)}
                      </select>
                    </div>
                    {
                      submitted && !feeData.section.id &&
                      <div>
                        Fee section needed.
										</div>
                    }
                  </div>
                  {/* <PersonalData modelData={feeData} onChange={(name: any, value: any) => {
										this.setState({
											feeData: {
												...feeData,
												[name]: value
											}
										});
									}} /> */}
                </div>
                <div className="collapse-container">
                  <div className="collapse-header">
                    <div className="collapse-title">Contact Details</div>
                    <div className="collapse-icon" onClick={onClickHeader}>
                      <i className="fa fa-fw fa-plus"></i>
                      <i className="fa fa-fw fa-minus"></i>
                    </div>
                    <div className="clear-both"></div>
                  </div>
                  <ContactData modelData={feeData} onChange={(name: any, value: any) => {
                    this.setState({
                      feeData: {
                        ...feeData,
                        [name]: value
                      }
                    });
                  }} />
                </div>
                <div className="collapse-container">
                  <div className="collapse-header">
                    <div className="collapse-title">Primary and Emergency Contact Details</div>
                    <div className="collapse-icon" onClick={onClickHeader}>
                      <i className="fa fa-fw fa-plus"></i>
                      <i className="fa fa-fw fa-minus"></i>
                    </div>
                    <div className="clear-both"></div>
                  </div>
                  <OtherContactData modelData={feeData} onChange={(name: any, value: any) => {
                    this.setState({
                      feeData: {
                        ...feeData,
                        [name]: value
                      }
                    });
                  }} />
                </div>

              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default withRouter(
  graphql<AddFeeMutation, AddFeePageOwnProps>(AddFeeMutationGql)(
    FeeSetup
  )
);
