import * as React from "react";
import { RouteComponentProps } from "react-router";
import { gql, graphql, QueryProps } from "react-apollo";

import * as FacultyQueryGql from "./FacultyQuery.graphql";
import { FacultyDetailsFragment } from "../../types";
import withFacultyFromRouteParams from "../withFacultyFromRouteParams";

import FacultyDetailsTable from "./FacultyDetailsTable";

const FacultyPage = ({ faculty }: { faculty: FacultyDetailsFragment }) =>
  <span>
    <FacultyDetailsTable faculty={faculty} />
  </span>;

export default withFacultyFromRouteParams(FacultyPage);
