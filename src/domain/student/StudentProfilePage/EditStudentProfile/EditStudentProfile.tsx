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
    StudentDetailsFragment,
} from '../../../types';

import * as UpdateStudentMutationGql from './UpdateStudentMutation.graphql';
import withStudentFromRouteParams from '../../withStudentFromRouteParams';

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

function onFormSubmit(student: any, mutate: any) {
    return mutate({
        variables: {
            input: {
                studentId: queryString.parse(location.search).id,
                ...student,
            },
        },
    }).then((data: any) => {
        location.href = `${location.origin}/plugins/xformation-petclinic-panel/page/students`;
    }).catch((error: any) => {
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
        <div className="row m-0">
            <div className="col-sm-12 profile-header m-b-2">
                <div className="pull-left">Student Profile</div>
                <div className="pull-right">
                    <button className="btn bs">Save</button>
                </div>
            </div>
        </div>
        <div className="row form-main-container m-0">
            <div className="col-md-3 col-sm-12 student-photo-container">
            </div>
            <div className="col-md-9 col-sm-12 student-profile-form">
                <form className="gf-form-group" onSubmit={student => onFormSubmit(student, mutate)}>
                    <div className="collapse-container">
                        <div className="collapse-header">
                            <div className="collapse-title">Personal Details</div>
                            <div className="collapse-icon" onClick={onClickHeader}>
                                <i className="fa fa-fw fa-plus"></i>
                                <i className="fa fa-fw fa-minus"></i>
                            </div>
                            <div className="clear-both"></div>
                        </div>
                        <PersonalData modelData={student} />
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
                        <ContactData modelData={student} />
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
                        <OtherContactData modelData={student} />
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
                        <FacilityData modelData={student} />
                    </div>
                </form>
            </div>
        </div>
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
