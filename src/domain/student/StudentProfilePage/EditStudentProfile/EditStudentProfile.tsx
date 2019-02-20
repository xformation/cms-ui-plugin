import * as React from 'react';
import { graphql, MutationFunc } from 'react-apollo';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import PersonalData from './PersonalData';
import ContactData from './ContactData';
import OtherContactData from './OtherContactData';
import FacilityData from './FacilityData';

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

function onFormSubmit(e: any, student: any, mutate: any) {
    e.preventDefault();
    let btn = e.target.querySelector("button[type='submit']");
    btn.setAttribute("disabled",true)
    return mutate({
        variables: {
            id: queryString.parse(location.search).id,
            ...student,
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

// The 'actual' component that receives all the props
const EditStudentProfile = ({ student, history, match, mutate }: UpdateStudentFullPageProps) => (
    <div className="student-profile-container">
        <form className="gf-form-group" onSubmit={e => onFormSubmit(e,student, mutate)}>
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
                                <input type="text" className="gf-form-input max-width-22" />
                            </div>
                            <div className="gf-form">
                                <span className="gf-form-label width-8">Year</span>
                                <input type="text" className="gf-form-input max-width-22" />
                            </div>
                            <div className="gf-form">
                                <span className="gf-form-label width-8">Branch</span>
                                <input type="text" className="gf-form-input max-width-22" />
                            </div>
                            <div className="gf-form">
                                <span className="gf-form-label width-8">Section</span>
                                <input type="text" className="gf-form-input max-width-22" />
                            </div>
                            <div className="gf-form">
                                <span className="gf-form-label width-8">Student Type</span>
                                <input type="text" className="gf-form-input max-width-22" />
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
                            <PersonalData modelData={student} onChange={(name:any,value:any)=>{
                                student = {
                                    ...student,
                                    [name]:value
                                }
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
                            <ContactData modelData={student} onChange={(name:any,value:any)=>{
                                student = {
                                    ...student,
                                    [name]:value
                                }
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
                            <OtherContactData modelData={student} onChange={(name:any,value:any)=>{
                                student = {
                                    ...student,
                                    [name]:value
                                }
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
                            <FacilityData modelData={student} onChange={(name:any,value:any)=>{
                                student = {
                                    ...student,
                                    [name]:value
                                }
                            }}/>
                        </div>
                </div>
            </div>
        </form>
    </div>
);

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
