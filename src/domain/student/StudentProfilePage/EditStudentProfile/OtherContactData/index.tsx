import * as React from 'react';

import { GrafanaInputFactory } from '../../../../../components/form/FormElements';
import { NotEmpty } from '../../../../../components/form/Constraints';
import PartialForm from '../../../../../components/form/PartialForm';

const otherContactData = [
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'addressLineOne',
        label: 'Address One',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'addressLineTwo',
        label: 'Address Two',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'addressLineThree',
        label: 'Address Three',
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
        label: 'student Contact Number',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'alternateContactNumber',
        label: 'alternateContactNumber',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'studentEmailAddress',
        label: 'student email',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'alternateEmailAddress',
        label: 'alternate email',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    }
];

const OtherContactData = ({ modelData, onChange }: any) => {
    return (<PartialForm formElements={otherContactData} modelData={modelData} className="gf-form-inline" onChange={onChange} />);
};

export default OtherContactData;
