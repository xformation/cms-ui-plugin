import * as React from 'react';

import { GrafanaInputFactory } from '../../../../../components/form/FormElements';
import { NotEmpty } from '../../../../../components/form/Constraints';
import PartialForm from '../../../../../components/form/PartialForm';

const contactData = [
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'addressLineOne',
        label: 'address One',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'addressLineTwo',
        label: 'address Two',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'addressLineThree',
        label: 'address Three',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'town',
        label: 'Town',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'state',
        label: 'State',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'country',
        label: 'Country',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'pincode',
        label: 'Pincode',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'studentContactNumber',
        label: 'Student Contact Number',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'alternateContactNumber',
        label: 'Alternate Contact Number',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'studentEmailAddress',
        label: 'Student Email',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'alternateEmailAddress',
        label: 'Alternate Email',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    }
];

const ContactData = ({ modelData, onChange }: any) => {
    return (<PartialForm onChange={onChange} formElements={contactData} modelData={modelData} className="gf-form-inline" />);
};

export default ContactData;
