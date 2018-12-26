import * as React from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { graphql, QueryProps } from "react-apollo";

import * as FacultyListQueryGql from "./FacultyListQuery.graphql";
import { FacultyListQuery, FacultySummaryFragment } from '../../types';
import withLoadingHandler from "../../../components/withLoadingHandler";


const FacultyRow = ({ faculty }: { faculty: FacultySummaryFragment }) =>
    <tr key={faculty.id}>
        <td>
            <Link className="table-link" to={`/plugins/xformation-petclinic-panel/page/faculty?id=${faculty.id}`}>
                {faculty.name} {faculty.lastName}
            </Link>
        </td>
        <td>
            {faculty.address}
        </td>
        <td>
            {faculty.mail}
        </td>
        <td>
            {faculty.designation}
        </td>
        <td>
            {faculty.mobile}
        </td>
        <td>
            {faculty.status}
        </td>
    </tr>;

const FacultiesTable = ({ faculties }: { faculties: FacultySummaryFragment[] }) =>
    <table className="striped-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Email</th>
                <th>Designation</th>
                <th>Mobile</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {faculties.map(faculty => <FacultyRow key={faculty.id} faculty={faculty} />)}
        </tbody>
    </table>;

type FacultyListPageOwnProps = RouteComponentProps<{}>;
type FacultyListPageProps = {
    data: QueryProps & FacultyListQuery;
};

const FacultyListPage = ({ data: { faculties } }: FacultyListPageProps) =>
    <section>
        <h2 className="heading">
            {faculties.length} Faculties found
        </h2>
        <FacultiesTable faculties={faculties} />
        <Link to={`/plugins/xformation-petclinic-panel/page/addfaculty`} className="btn customButton">
            Add Faculty
        </Link>

    </section>;

export default graphql<FacultyListQuery, FacultyListPageOwnProps, FacultyListPageProps>(FacultyListQueryGql)(
    withLoadingHandler(FacultyListPage)
);