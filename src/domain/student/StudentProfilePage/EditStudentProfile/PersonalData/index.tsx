import * as React from 'react';

import { GrafanaInputFactory } from '../../../../../components/form/FormElements';
import { NotEmpty } from '../../../../../components/form/Constraints';
import PartialForm from '../../../../../components/form/PartialForm';

const personalDataForm = [
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'studentName',
        label: 'Student Name',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'fatherName',
        label: 'Father Name',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'fatherMiddleName',
        label: 'Father Middle Name',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'father Last Name',
        label: 'fatherLastName',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'motherName',
        label: 'Mother Name',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'motherMiddleName',
        label: 'Mother Middle Name',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'motherLastName',
        label: 'mother Last Name',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'aadharNo',
        label: 'Adhar No',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'dateOfBirth',
        label: 'Date Of Birth',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'placeOfBirth',
        label: 'Place Of Birth',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'religion',
        label: 'Religion',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'caste',
        label: 'Caste',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'subCaste',
        label: 'Sub Caste',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'age',
        label: 'Age',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'bloodGroup',
        label: 'Blood Group',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    }
];

const PersonalData = ({ modelData }: any) => {
    return (
        <PartialForm
            formElements={personalDataForm}
            modelData={modelData}
            className="gf-form-inline"
        />
    );
};

export default PersonalData;
