import * as React from "react";
import { RouteComponentProps } from "react-router";
import { gql, graphql, QueryProps } from "react-apollo";

import * as InstituteQueryGql from "./InstituteQuery.graphql";
import { InstituteDetailsFragment } from "../../types";
import withInstituteFromRouteParams from "../withInstituteFromRouteParams";

import InstituteDetailsTable from "./InstituteDetailsTable";

const InstitutePage = ({ institute }: { institute: InstituteDetailsFragment }) =>
  <span>
    <InstituteDetailsTable institute={institute} />
  </span>;

export default withInstituteFromRouteParams(InstitutePage);
