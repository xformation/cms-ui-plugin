import * as React from 'react';

import { GrafanaInputFactory, GrafanaSelectInputFactory } from '../../../../components/form/FormElements';
import { NotEmpty } from '../../../../components/form/Constraints';
import PartialForm from '../../../../components/form/PartialForm';

const personalDataForm = [
    
    {
        elementComponentFactory: GrafanaSelectInputFactory,
        name: 'religion',
        label: 'Batch',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
        options: [
            {
                id: "Batch",
                name: "Batch"
            },
            {
                id: "Batch",
                name: "Batch"
            },
            {
                id: "Batch",
                name: "Batch"
            }
        ]
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'placeOfBirth',
        label: 'Department',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaSelectInputFactory,
        name: 'caste',
        label: 'Year',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
        options: [
            {
                id: "Year",
                name: "Year"
            },
            {
                id: "Year",
                name: "Year"
            },
            {
                id: "Year",
                name: "Year"
            },
            {
                id: "Year",
                name: "Year"
            }
        ]
    },
    {
        elementComponentFactory: GrafanaSelectInputFactory,
        name: 'caste',
        label: 'Student Type',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
        options: [
            {
                id: "Student",
                name: "Student"
            },
            {
                id: "Student",
                name: "Student"
            },
            {
                id: "Student",
                name: "Student"
            },
            {
                id: "Student",
                name: "Student"
            }
        ]
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'subCaste',
        label: 'Gender',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'age',
        label: 'Amount',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
];

const PersonalData = ({ modelData, onChange }: any) => {
    return (
        <PartialForm
            formElements={personalDataForm}
            modelData={modelData}
            className="gf-form-inline"
            onChange={onChange}
        />
    );
};

export default PersonalData;
