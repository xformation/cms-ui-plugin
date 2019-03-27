import * as React from 'react';

import { GrafanaInputFactory, GrafanaSelectInputFactory } from '../../../../components/form/FormElements';
import { NotEmpty } from '../../../../components/form/Constraints';
import PartialForm from '../../../../components/form/PartialForm';

const otherContactData = [
    {
        elementComponentFactory: GrafanaSelectInputFactory,
        name: 'relationWithStudent',
        label: 'Relation with Student',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
        options: [
            {
                id: "MOTHER",
                name: "MOTHER"
            },
            {
                id: "FATHER",
                name: "FATHER"
            },
            {
                id: "GUARDIAN",
                name: "GUARDIAN"
            }
        ]
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'emergencyContactName',
        label: 'Name',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'emergencyContactMiddleName',
        label: 'Middle Name',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'emergencyContactLastName',
        label: 'Last Name',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'emergencyContactNo',
        label: 'Contact No.',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'emergencyContactEmailAddress',
        label: 'Email Address',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    }
];

const OtherContactData = ({ modelData, onChange }: any) => {
    return (<PartialForm formElements={otherContactData} modelData={modelData} className="gf-form-inline" onChange={onChange} />);
};

export default OtherContactData;
