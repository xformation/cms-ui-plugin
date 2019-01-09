import * as React from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { graphql, QueryProps } from "react-apollo";

import * as locationListQueryGql from "./FindAllByLocationListQuery.graphql";
import { locationListQuery, locationSummaryFragment } from '../../types';
import withLoadingHandler from "../../../components/withLoadingHandler";

const LocationRow = ({ location }: { location: locationSummaryFragment }) =>
    <tr key={location.id}>
        <td>
            {/* <Link className="table-link" to={`/plugins/xformation-petclinic-panel/page/findAllByLocation?id=${findAllByLocation.id}`}> */}
            {location.name}
            {/* </Link> */}
        </td>

    </tr>;

const LocationsTable = ({ locations }: { locations: locationSummaryFragment[] }) =>
    <table className="striped-table">
        <thead>
            <tr>

                <th>Student Year</th>

            </tr>
        </thead>
        <tbody>
            {/* <h1>{locations.keys}</h1> */}
            {locations.map(location => <LocationRow key={location.id} location={location} />)}
        </tbody>
    </table>;

type locationListPageOwnProps = RouteComponentProps<{}>;
type locationListPageProps = {
    data: QueryProps & locationListQuery;
};

const StudentYearListPage = ({ data: { locations } }: locationListPageProps) =>
    <section>
        <h2 className="heading">
            {/* {locations.length} */}
            Student Year found
    </h2>
        <LocationsTable locations={locations} />
        <Link to={`/plugins/xformation-petclinic-panel/page/addfaculty`} className="btn customButton">
            Add location
      </Link>
    </section>;

export default graphql<locationListQuery, locationListPageOwnProps, locationListPageProps>(locationListQueryGql)(
    withLoadingHandler<any>(StudentYearListPage)
);