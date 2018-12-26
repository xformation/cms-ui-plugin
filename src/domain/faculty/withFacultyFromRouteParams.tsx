import * as React from "react";
import { RouteComponentProps } from "react-router";
import { gql, graphql, QueryProps } from "react-apollo";

import * as FacultyQueryGql from "./FacultyQuery.graphql";
import { ReactFunctionOrComponentClass, FacultyQuery, FacultyDetailsFragment } from "../types";
import withLoadingHandler from "../../components/withLoadingHandler";

var queryString = require('query-string');

// Specifies the parameters taken from the route definition (/.../:facultyId)
type FacultyPageRouteParams = {
  facultyId: any
};

// Specifies the Properties that are passed to
type FacultyPageProps = RouteComponentProps<FacultyPageRouteParams>;

// The "full set" of properties passed to the target component
// (that is with the properties from GraphQL including the loaded faculty)
type FacultyPageFullProps = FacultyPageProps & {
  data: QueryProps & FacultyQuery;
  faculty: FacultyDetailsFragment;
};

// this function takes a Component, that must have FacultyPageProps-compatible properties.
// The function loads the Faculty with the facultyId specified in the route params
// and passes the loaded faculty to the specified Component
const withFacultyFromRouteParams = (
  TheFacultyComponent: ReactFunctionOrComponentClass<{
    faculty: FacultyDetailsFragment;
  }>
) => {
  const withFacultyFromRouteParamsWrapper = (props: FacultyPageFullProps) => <TheFacultyComponent faculty={props.data.faculty} />;
  return graphql<FacultyQuery, FacultyPageProps, FacultyPageFullProps>(FacultyQueryGql, {
    options: ({ match }) => (
      {
        variables: {
          facultyId: queryString.parse(location.search).id
        }
      })
  })(withLoadingHandler(withFacultyFromRouteParamsWrapper));
};

export default withFacultyFromRouteParams;
