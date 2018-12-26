import * as React from "react";

import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { graphql, QueryProps } from "react-apollo";

import * as InstituteListQueryGql from "./InstituteListQuery.graphql";
import { InstituteListQuery, InstituteSummaryFragment } from '../../types';
import withLoadingHandler from "../../../components/withLoadingHandler";


const InstituteRow = ({ institute }: { institute: InstituteSummaryFragment }) =>
  <tr key={institute.id}>
    <td>
      <Link className="table-link" to={`/plugins/xformation-petclinic-panel/page/institute?id=${institute.id}`}>
        {institute.name}
      </Link>
    </td>
    <td className="hidden-sm hidden-xs">
      {institute.code}
    </td>
    <td>
      {institute.year}
    </td>
  </tr>;

const InstitutesTable = ({ institutes }: { institutes: InstituteSummaryFragment[] }) =>
  <table className="striped-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Code</th>
        <th>Year</th>
      </tr>
    </thead>
    <tbody>
      {institutes.map(institute => <InstituteRow key={institute.id} institute={institute} />)}
    </tbody>
  </table>;

type InstituteListPageOwnProps = RouteComponentProps<{}>;
type InstituteListPageProps = {
  data: QueryProps & InstituteListQuery;
};

const InstituteListPage = ({ data: { institutes } }: InstituteListPageProps) =>
  <section>
    <h2 className="heading">
      {institutes.length} Institutes found
    </h2>
    <InstitutesTable institutes={institutes} />
    <Link to={`/plugins/xformation-petclinic-panel/page/addinstitute`} className="btn customButton">
      Add Institute
      </Link>
  </section>;

export default
  graphql<InstituteListQuery, InstituteListPageOwnProps, InstituteListPageProps>(InstituteListQueryGql)(
    withLoadingHandler(InstituteListPage)
  );