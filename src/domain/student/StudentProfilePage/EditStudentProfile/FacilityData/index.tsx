import * as React from 'react';

import { CheckInputFactory } from '../../../../../components/form/FormElements';
import { NotEmpty } from '../../../../../components/form/Constraints';
import PartialForm from '../../../../../components/form/PartialForm';

const facilityDataForm = [
    {
        elementComponentFactory: CheckInputFactory,
        name: 'transport',
        label: 'Transport',
        constraint: NotEmpty,
        className: 'testing',
    },
    {
        elementComponentFactory: CheckInputFactory,
        name: 'mess',
        label: 'Mess',
        constraint: NotEmpty,
        className: 'testing',
    },
    {
        elementComponentFactory: CheckInputFactory,
        name: 'gym',
        label: 'Gym',
        constraint: NotEmpty,
        className: 'testing',
    },
    {
        elementComponentFactory: CheckInputFactory,
        name: 'cultaralClass',
        label: 'Cultaral Class',
        constraint: NotEmpty,
        className: 'testing',
    },
    {
        elementComponentFactory: CheckInputFactory,
        name: 'library',
        label: 'Ligrary',
        constraint: NotEmpty,
        className: 'testing',
    },
    {
        elementComponentFactory: CheckInputFactory,
        name: 'sports',
        label: 'Sports',
        constraint: NotEmpty,
        className: 'testing',
    },
    {
        elementComponentFactory: CheckInputFactory,
        name: 'swiming',
        label: 'Swiming',
        constraint: NotEmpty,
        className: 'testing',
    },
    {
        elementComponentFactory: CheckInputFactory,
        name: 'extraClass',
        label: 'Extra Class',
        constraint: NotEmpty,
        className: 'testing',
    },
    {
        elementComponentFactory: CheckInputFactory,
        name: 'handicrafts',
        label: 'Handicrafts',
        constraint: NotEmpty,
        className: 'testing',
    }
];

const FacilityData = (modelData: any) => {
    return (<PartialForm formElements={facilityDataForm} modelData={modelData} className="gf-form-inline"/>);
};

export default FacilityData;
