import * as React from 'react';
import { graphql, MutationFunc } from 'react-apollo';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import * as AddStudentMutationGql from './AddStudentMutation.graphql';
import PersonalData from './PersonalData';
import ContactData from './ContactData';
import OtherContactData from './OtherContactData';
import FacilityData from './FacilityData';
import { StudentServices } from './_services';
import {
    AddStudentMutation,
    AddStudentInput,
    AddStudentMutationVariables,
    StudentData,
} from '../../types';

import withLoadingHandler from '../../../components/withLoadingHandler';

// import 'bootstrap/dist/css/bootstrap.min.css';

type AddStudentPageOwnProps = RouteComponentProps<{}>;
type AddStudentPageProps = AddStudentPageOwnProps & {
    mutate: MutationFunc<AddStudentMutation>;
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

type EditStudentProfileStates = {
    studentData: any,
    departments: any,
    branches: any,
    batches: any,
    sections: any,
    submitted: any
};

class AddStudentPage extends React.Component<AddStudentPageProps, EditStudentProfileStates>{
    constructor(props: any) {
        super(props);
        const { student } = props;
        this.state = {
            studentData: {
                ...student
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
        this.createStudentTypeOptions = this.createStudentTypeOptions.bind(this);
    }
    componentDidMount() {
        Promise.all([StudentServices.getStudentDepartments(), StudentServices.getStudentBranches(), StudentServices.getStudentYears(), StudentServices.getStudentSections()]).then(
            data => {
                let departments = data[0];
                let branches = data[1];
                let batches = data[2];
                let sections = data[3];
                this.setState({
                    departments,
                    branches,
                    batches,
                    sections
                });
            },
            error => {
                console.log(error);
            }
        );
    }
    createDepartments(departments: any, selectedDepartmentId: any) {
        let departmentsOptions = [<option key={0} value="">Select department</option>];
        for (let i = 0; i < departments.length; i++) {
            departmentsOptions.push(
                <option key={departments[i].id} value={departments[i].id}>{departments[i].name}</option>
            );
        }
        return departmentsOptions;
    }
    createBranches(branches: any, selectedBranchID: any) {
        let branchesOptions = [<option key={0} value="">Select Branch</option>];
        for (let i = 0; i < branches.length; i++) {
            branchesOptions.push(
                <option key={branches[i].id} value={branches[i].id}>{branches[i].branchName}</option>
            );
        }
        return branchesOptions;
    }
    createBatches(batches: any, selectedBatchId: any, selectedDepartmentId: any) {
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
    createSections(sections: any, selectedSectionId: any, selectedBatchId: any) {
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
    createStudentTypeOptions(selectedType: any) {
        let studentTypes: any = {
            REGULAR: "REGULAR",
            STAFF_CONCESSION: "STAFF_CONCESSION",
            BENEFITS: "BENEFITS",
            SCHOLARSHIP: "SCHOLARSHIP",
            OTHER_BENEFITS: "OTHER_BENEFITS"
        }
        let studentTypesOptions = [<option key={0} value="">Select Type</option>];
        for (let i in studentTypes) {
            let studentType = studentTypes[i];
            studentTypesOptions.push(
                <option key={studentType} value={studentType} selected={selectedType === studentType}>{studentType}</option>
            );
        }
        return studentTypesOptions;
    }
    onFormSubmit = (e: any) => {
        this.setState({
            submitted: true
        });
        const { mutate } = this.props;
        const { studentData } = this.state;
        e.preventDefault();
        if (studentData.department.id && studentData.branch.id && studentData.batch.id && studentData.studentType && studentData.section.id) {

            let dplStudentData = {
                ...studentData,
                batchId: studentData.batch.id,
                sectionId: studentData.section.id,
                branchId: studentData.branch.id,
                departmentId: studentData.department.id
            };
            delete dplStudentData.batch;
            delete dplStudentData.section;
            delete dplStudentData.branch;
            delete dplStudentData.department;
            delete dplStudentData.__typename;
            let btn = e.target.querySelector("button[type='submit']");
            btn.setAttribute("disabled", true);
            let dataSavedMessage: any = document.querySelector(".data-saved-message");
            dataSavedMessage.style.display = "none";
            return mutate({
                // variables: {
                //     input: {
                //         id: queryString.parse(location.search).id,
                //         ...dplStudentData
                //     }
                // },
                variables: { input: studentData, dplStudentData },
            }).then((data: any) => {
                btn.removeAttribute("disabled");
                dataSavedMessage.style.display = "inline-block";
                // location.href = `${location.origin}/plugins/ems-attendance/page/students`;
            }).catch((error: any) => {
                btn.removeAttribute("disabled");
                dataSavedMessage.style.display = "inline-block";
                console.log('there was an error sending the update mutation', error);
                return Promise.reject(`Could not save student: ${error}`);
            });
        }
    }
    onChange = (e: any) => {
        const { name, value } = e.nativeEvent.target;
        const { studentData } = this.state;
        if (name === "department") {
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
                    }
                }
            });
        } else if (name === "branch") {
            this.setState({
                studentData: {
                    ...studentData,
                    branch: {
                        id: value
                    }
                }
            });
        } else if (name === "section") {
            this.setState({
                studentData: {
                    ...studentData,
                    section: {
                        id: value
                    }
                }
            });
        } else if (name === "studentType") {
            this.setState({
                studentData: {
                    ...studentData,
                    studentType: value
                }
            });
        } else if (name === "batch") {
            this.setState({
                studentData: {
                    ...studentData,
                    batch: {
                        id: value
                    },
                    section: {
                        id: ""
                    }
                }
            });
        }
    }
    render() {
        const { history, match, mutate } = this.props;
        const { studentData, departments, batches, branches, sections, submitted } = this.state;
        return (
            <div className="student-profile-container">
                <form className="gf-form-group" onSubmit={this.onFormSubmit}>
                    <div className="row m-0">
                        <div className="col-sm-12 col-xs-12 profile-header m-b-2">
                            <div className="pull-left">Student Profile</div>
                            <div className="pull-right">
                                <span className="m-r-2 data-saved-message" style={{ fontSize: "13px", color: "#AA0000", display: "none" }}>Data Saved</span>
                                <button className="btn bs" type="submit">Save</button>
                            </div>
                        </div>
                    </div>
                    <div className="row form-main-container m-0">
                        <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 student-photo-container">
                            <div className="row p-1">
                                <div className="col-md-6 col-lg-12 col-xs-12 col-sm-6 student-photo">
                                    <div className="photo"></div>
                                </div>
                                <div className="col-sm-6 col-xs-12 col-md-6 col-lg-12">
                                    <div className="gf-form">
                                        <span className="gf-form-label width-8">Admission No</span>
                                        <input name="admissionNo" value={studentData.admissionNo} onChange={this.onChange} type="text" className="gf-form-input max-width-22" />
                                    </div>
                                    <div className="gf-form">
                                        <span className="gf-form-label width-8">Student Id</span>
                                        <input type="text" className="gf-form-input max-width-22" name="id" value={studentData.id} onChange={this.onChange} />
                                    </div>
                                    <div className="gf-form">
                                        <span className="gf-form-label width-8">Roll No</span>
                                        <input name="rollNo" type="text" className="gf-form-input max-width-22" value={studentData.rollNo} onChange={this.onChange} />
                                    </div>
                                    <div className="gf-form">
                                        <span className="gf-form-label width-8">Department</span>
                                        <select name="department" onChange={this.onChange} value={studentData.department.id} className="gf-form-input max-width-22">
                                            {this.createDepartments(departments, studentData.department.id)}
                                        </select>
                                    </div>
                                    {
                                        submitted && !studentData.department.id &&
                                        <div>
                                            Student department needed.
                                      </div>
                                    }
                                    <div className="gf-form">
                                        <span className="gf-form-label width-8">Year</span>
                                        <select name="batch" onChange={this.onChange} value={studentData.batch.id} className="gf-form-input max-width-22">
                                            {this.createBatches(batches, studentData.batch.id, studentData.department.id)}
                                        </select>
                                    </div>
                                    {
                                        submitted && !studentData.batch.id &&
                                        <div>
                                            Student batch needed.
                                      </div>
                                    }
                                    <div className="gf-form">
                                        <span className="gf-form-label width-8">Branch</span>
                                        <select name="branch" onChange={this.onChange} value={studentData.branch.id} className="gf-form-input max-width-22">
                                            {this.createBranches(branches, studentData.branch.id)}
                                        </select>
                                    </div>
                                    {
                                        submitted && !studentData.branch.id &&
                                        <div>
                                            Student branch needed.
                                      </div>
                                    }
                                    <div className="gf-form">
                                        <span className="gf-form-label width-8">Section</span>
                                        <select name="section" onChange={this.onChange} value={studentData.section.id} className="gf-form-input max-width-22">
                                            {this.createSections(sections, studentData.section.id, studentData.batch.id)}
                                        </select>
                                    </div>
                                    {
                                        submitted && !studentData.section.id &&
                                        <div>
                                            Student section needed.
                                      </div>
                                    }
                                    <div className="gf-form">
                                        <span className="gf-form-label width-8">Student Type</span>
                                        <select name="studentType" onChange={this.onChange} value={studentData.studentType} className="gf-form-input max-width-22">
                                            {this.createStudentTypeOptions(studentData.studentType)}
                                        </select>
                                    </div>
                                    {
                                        submitted && !studentData.studentType &&
                                        <div>
                                            Student type needed.
                                      </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12 student-profile-form">

                            <div className="collapse-container">
                                <div className="collapse-header">
                                    <div className="collapse-title">Personal Details</div>
                                    <div className="collapse-icon" onClick={onClickHeader}>
                                        <i className="fa fa-fw fa-plus"></i>
                                        <i className="fa fa-fw fa-minus"></i>
                                    </div>
                                    <div className="clear-both"></div>
                                </div>
                                <PersonalData modelData={studentData} onChange={(name: any, value: any) => {
                                    this.setState({
                                        studentData: {
                                            ...studentData,
                                            [name]: value
                                        }
                                    });
                                }} />
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
                                <ContactData modelData={studentData} onChange={(name: any, value: any) => {
                                    this.setState({
                                        studentData: {
                                            ...studentData,
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
                                <OtherContactData modelData={studentData} onChange={(name: any, value: any) => {
                                    this.setState({
                                        studentData: {
                                            ...studentData,
                                            [name]: value
                                        }
                                    });
                                }} />
                            </div>
                            <div className="collapse-container">
                                <div className="collapse-header">
                                    <div className="collapse-title">Facilities</div>
                                    <div className="collapse-icon" onClick={onClickHeader}>
                                        <i className="fa fa-fw fa-plus"></i>
                                        <i className="fa fa-fw fa-minus"></i>
                                    </div>
                                    <div className="clear-both"></div>
                                </div>
                                <FacilityData modelData={studentData} onChange={(name: any, value: any) => {
                                    this.setState({
                                        studentData: {
                                            ...studentData,
                                            [name]: value
                                        }
                                    });
                                }} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

// const AddStudentPage: any = ({ mutate, history }: AddStudentPageProps) => (
//   <section className="student-grid">
//     <StudentEditForm
//       initialStudent={}
//       formTitle="Add Student"
//       onFormSubmit={(student: StudentData) => {
//         return mutate({
//           variables: { input: student },
//         })
//           .then(({ data }) => {
//             history.push(`/students/${data.addStudent.student.id}`);
//             location.href = `${
//               location.origin
//               }/plugins/ems-attendance/page/students`;
//           })
//           .catch(error => {
//             console.log('there was an error sending the query', error);
//             return Promise.reject(`Could not save student: ${error}`);
//           });
//       }}
//     />
//   </section>
// );

export default withRouter(
    graphql<AddStudentMutation, AddStudentPageOwnProps>(AddStudentMutationGql)(
        AddStudentPage
    )
);
