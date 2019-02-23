import * as React from 'react';
import { graphql, MutationFunc } from 'react-apollo';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import PersonalData from './PersonalData';
import ContactData from './ContactData';
import OtherContactData from './OtherContactData';
import FacilityData from './FacilityData';
import { FormModel } from '../../../../components/form/types'

import './student_profile.css';

import {
    UpdateStudentMutation,
    UpdateStudentInput,
    UpdateStudentMutationVariables,
    StudentDetailsFragment,
} from '../../../types';

import * as UpdateStudentMutationGql from './UpdateStudentMutation.graphql';
import withStudentFromRouteParams from './withStudentFromRouteParams';

var queryString = require('query-string');

type UpdateStudentPageRouteParams = {
    studentId: any;
};

type UpdateStudentPageProps = RouteComponentProps<UpdateStudentPageRouteParams> & {
    student: StudentDetailsFragment;
};

type UpdateStudentFullPageProps = UpdateStudentPageProps & {
    mutate: MutationFunc<UpdateStudentMutation>;
};

function onClickHeader(e: any) {
    const { currentTarget } = e;
    const plusSign = currentTarget.querySelector(".fa-plus");
    const minusSign = currentTarget.querySelector(".fa-minus");
    const collapseContainer = currentTarget.closest(".collapse-container");
    const formContainer = collapseContainer.querySelector(".gf-form-inline");
    const style = window.getComputedStyle(formContainer);
    if(style.display === "none"){
        formContainer.style.display = "flex";
        minusSign.style.display = "block";
        plusSign.style.display = "none";
    } else {
        formContainer.style.display = "none";
        minusSign.style.display = "none";
        plusSign.style.display = "block";
    }
}

function getDepartments(){
    let departments = [{
        id: "1",
        dep: "Mechanical"
    },{
        id: "2",
        dep: "Computer"
    }];

    let departmentsOptions = [<option key={0} value="">Select department</option>];
    for(let i=0; i< departments.length;i++){
        departmentsOptions.push(
            <option key={departments[i].id} value={departments[i].id}>{departments[i].dep}</option>
        );
    }
    return departmentsOptions;
}

function getYears(){
    let years = [
    {
        id: 1,
        year: 2014
    },{
        id: 2,
        year: 2015
    },{
        id: 3,
        year: 2016
    },{
        id: 4,
        year: 2017
    }];

    let yearsOptions = [<option key={0} value="">Select Year</option>];
    for(let i=0; i< years.length;i++){
        yearsOptions.push(
            <option key={years[i].id} value={years[i].id}>{years[i].year}</option>
        );
    }
    return yearsOptions;
}

function getBranches(){
    let branches = [
    {
        id: 1,
        branch: "CE"
    },{
        id: 2,
        branch: "EC"
    }];

    let branchesOptions = [<option key={0} value="">Select Branch</option>];
    for(let i=0; i< branches.length;i++){
        branchesOptions.push(
            <option key={branches[i].id} value={branches[i].id}>{branches[i].branch}</option>
        );
    }
    return branchesOptions;
}

function getSections(){
    let sections = [
    {
        id: 1,
        section: "Section1"
    },{
        id: 2,
        section: "Section2"
    }];

    let sectionsOptions = [<option key={0} value="">Select Section</option>];
    for(let i=0; i< sections.length;i++){
        sectionsOptions.push(
            <option key={sections[i].id} value={sections[i].id}>{sections[i].section}</option>
        );
    }
    return sectionsOptions;
}

function getStudentTypes(){
    let studentTypes = [
    {
        id: 1,
        type: "type1"
    },{
        id: 2,
        type: "type2"
    }];

    let studentTypesOptions = [<option key={0} value="">Select Year</option>];
    for(let i=0; i< studentTypes.length;i++){
        studentTypesOptions.push(
            <option key={studentTypes[i].id} value={studentTypes[i].id}>{studentTypes[i].type}</option>
        );
    }
    return studentTypesOptions;
}


type EditStudentProfileStates = {
    studentData: any
};

class EditStudentProfile extends React.Component< UpdateStudentFullPageProps, EditStudentProfileStates>{
    constructor(props:any){
        super(props);
        const {student} = props;
        this.state = {
            studentData: {
                ...student
            }
        };
    }
    onFormSubmit = (e: any) => {
        const {mutate} = this.props;
        const {studentData} = this.state;
        e.preventDefault();
        let btn = e.target.querySelector("button[type='submit']");
        btn.setAttribute("disabled",true)
        return mutate({
            variables: {
                id: queryString.parse(location.search).id,
                ...studentData,
            },
        }).then((data: any) => {
            btn.removeAttribute("disabled");
            // location.href = `${location.origin}/plugins/xformation-petclinic-panel/page/students`;
        }).catch((error: any) => {
            btn.removeAttribute("disabled");
            console.log('there was an error sending the update mutation', error);
            return Promise.reject(`Could not save student: ${error}`);
        });
    }
    onChange = (e: any) => {
        const {name, value} = e.nativeEvent.target;
        const {studentData} = this.state;
        if(name === "department"){
            this.setState({
                studentData:{
                    ...studentData,
                    department:{
                        name: value
                    }
                }
            });
        } else if(name === "branchName"){
            this.setState({
                studentData: {
                    ...studentData,
                    branch:{
                        branchName: value
                    }
                }
            });
        } else if(name === "section"){
            this.setState({
                studentData:{
                    ...studentData,
                    section:{
                        section: value
                    }
                }
            });
        } else if(name === "studentType"){
            this.setState({
                studentData:{
                    ...studentData,
                    studentType: value
                }
            });
        }
    }
    render(){
        const { history, match, mutate } = this.props;
        const { studentData } = this.state;
        return (
            <div className="student-profile-container">
                <form className="gf-form-group" onSubmit={this.onFormSubmit}>
                    <div className="row m-0">
                        <div className="col-sm-12 col-xs-12 profile-header m-b-2">
                            <div className="pull-left">Student Profile</div>
                            <div className="pull-right">
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
                                        <input type="text" className="gf-form-input max-width-22" />
                                    </div>
                                    <div className="gf-form">
                                        <span className="gf-form-label width-8">Student Id</span>
                                        <input type="text" className="gf-form-input max-width-22" />
                                    </div>
                                    <div className="gf-form">
                                        <span className="gf-form-label width-8">Roll No</span>
                                        <input type="text" className="gf-form-input max-width-22" />
                                    </div>
                                    <div className="gf-form">
                                        <span className="gf-form-label width-8">Department</span>
                                        <select name="department" onChange= {this.onChange} value={studentData.department.name}>
                                            {getDepartments()}
                                        </select>
                                    </div>
                                    <div className="gf-form">
                                        <span className="gf-form-label width-8">Year</span>
                                        <select>
                                            {getYears()}
                                        </select>
                                    </div>
                                    <div className="gf-form">
                                        <span className="gf-form-label width-8">Branch</span>
                                        <select name="branchName" onChange= {this.onChange} value={studentData.branch.branchName}>
                                            {getBranches()}
                                        </select>
                                    </div>
                                    <div className="gf-form">
                                        <span className="gf-form-label width-8">Section</span>
                                        <select name="section" onChange= {this.onChange} value={studentData.section.section}>
                                            {getSections()}
                                        </select>
                                    </div>
                                    <div className="gf-form">
                                        <span className="gf-form-label width-8">Student Type</span>
                                        <select name="studentType" onChange= {this.onChange} value={studentData.studentType}>
                                            {getStudentTypes()}
                                        </select>
                                    </div>
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
                                    <PersonalData modelData={studentData} onChange={(name:any,value:any)=>{
                                        this.setState({
                                            studentData:{
                                                ...studentData,
                                                [name]: value
                                            }
                                        });
                                    }}/>
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
                                    <ContactData modelData={studentData} onChange={(name:any,value:any)=>{
                                        this.setState({
                                            studentData:{
                                                ...studentData,
                                                [name]: value
                                            }
                                        });
                                    }}/>
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
                                    <OtherContactData modelData={studentData} onChange={(name:any,value:any)=>{
                                        this.setState({
                                            studentData:{
                                                ...studentData,
                                                [name]: value
                                            }
                                        });
                                    }}/>
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
                                    <FacilityData modelData={studentData} onChange={(name:any,value:any)=>{
                                        this.setState({
                                            studentData:{
                                                ...studentData,
                                                [name]: value
                                            }
                                        });
                                    }}/>
                                </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default
    withStudentFromRouteParams(
        withRouter(
            graphql<UpdateStudentMutation, UpdateStudentPageProps, UpdateStudentFullPageProps>(
                UpdateStudentMutationGql
            )(
                EditStudentProfile
            )
        )
    );
