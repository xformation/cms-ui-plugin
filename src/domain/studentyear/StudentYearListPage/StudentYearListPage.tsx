import * as React from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { graphql, QueryProps } from "react-apollo";

import * as findAllByLocationListQueryGql from "./FindAllByLocationListQuery.graphql";
import { findAllByLocationListQuery, findAllByLocationSummaryFragment } from '../../types';
import withLoadingHandler from "../../../components/withLoadingHandler";

const FindAllByLocationRow = ({ findAllByLocation }: { findAllByLocation: findAllByLocationSummaryFragment }) =>
    <tr key={findAllByLocation.id}>
        <td>
            {/* <Link className="table-link" to={`/plugins/xformation-petclinic-panel/page/findAllByLocation?id=${findAllByLocation.id}`}> */}
            {findAllByLocation.name}
            {/* </Link> */}
        </td>

    </tr>;

const FindAllByLocationsTable = ({ findAllByLocations }: { findAllByLocations: findAllByLocationSummaryFragment[] }) =>
    <table className="striped-table">
        <thead>
            <tr>

                <th>Student Year</th>

            </tr>
        </thead>
        <tbody>
            <h1>{findAllByLocations.keys}</h1>
            {/* {findAllByLocations.map(findAllByLocation => <FindAllByLocationRow key={findAllByLocation.id} findAllByLocation={findAllByLocation} />)} */}
        </tbody>
    </table>;

type findAllByLocationListPageOwnProps = RouteComponentProps<{}>;
type findAllByLocationListPageProps = {
    data: QueryProps & findAllByLocationListQuery;
};

const StudentYearListPage = ({ data: { findAllByLocations } }: findAllByLocationListPageProps) =>
    <section>
        <h2 className="heading">
            {/* {findAllByLocations.length} */}
            Student Year found
    </h2>
        <FindAllByLocationsTable findAllByLocations={findAllByLocations} />
        <Link to={`/plugins/xformation-petclinic-panel/page/addfaculty`} className="btn customButton">
            Add findAllByLocation
      </Link>
    </section>;

export default graphql<findAllByLocationListQuery, findAllByLocationListPageOwnProps, findAllByLocationListPageProps>(findAllByLocationListQueryGql)(
    withLoadingHandler<any>(StudentYearListPage)
);