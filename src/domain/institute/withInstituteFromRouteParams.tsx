import * as React from "react";
import { RouteComponentProps } from "react-router";
import { gql, graphql, QueryProps } from "react-apollo";

import * as InstituteQueryGql from "./InstituteQuery.graphql";
import { ReactFunctionOrComponentClass, InstituteQuery, InstituteDetailsFragment } from "../types";
import withLoadingHandler from "../../components/withLoadingHandler";

var queryString = require('query-string');

// Specifies the parameters taken from the route definition (/.../:instituteId)
type InstitutePageRouteParams = {
  instituteId: any
};

// Specifies the Properties that are passed to
type InstitutePageProps = RouteComponentProps<InstitutePageRouteParams>;

// The "full set" of properties passed to the target component
// (that is with the properties from GraphQL including the loaded institute)
type InstitutePageFullProps = InstitutePageProps & {
  data: QueryProps & InstituteQuery;
  institute: InstituteDetailsFragment;
};

// this function takes a Component, that must have InstitutePageProps-compatible properties.
// The function loads the Institute with the instituteId specified in the route params
// and passes the loaded institute to the specified Component
const withInstituteFromRouteParams = (
  TheInstituteComponent: ReactFunctionOrComponentClass<{
    institute: InstituteDetailsFragment;
  }>
) => {
  const withInstituteFromRouteParamsWrapper = (props: InstitutePageFullProps) => <TheInstituteComponent institute={props.data.institute} />;
  return graphql<InstituteQuery, InstitutePageProps, InstitutePageFullProps>(InstituteQueryGql, {
    options: ({ match }) => (
      {
        variables: {
          instituteId: queryString.parse(location.search).id
        }
      })
  })(withLoadingHandler(withInstituteFromRouteParamsWrapper));
};

export default withInstituteFromRouteParams;
