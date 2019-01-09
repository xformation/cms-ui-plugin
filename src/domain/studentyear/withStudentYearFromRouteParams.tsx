import * as React from "react";
import { RouteComponentProps } from "react-router";
import { graphql, QueryProps } from "react-apollo";
import * as gql from 'graphql-tag';

import * as locationQueryGql from "./locationQuery.graphql";
import { ReactFunctionOrComponentClass, locationQuery, locationDetailsFragment } from "../types";
import withLoadingHandler from "../../components/withLoadingHandler";

var queryString = require('query-string');

// Specifies the parameters taken from the route definition (/.../:locationId)
type locationPageRouteParams = {
  locationId: any
};

// Specifies the Properties that are passed to
type locationPageProps = RouteComponentProps<locationPageRouteParams>;

// The "full set" of properties passed to the target component
// (that is with the properties from GraphQL including the loaded location)
type locationPageFullProps = locationPageProps & {
  data: QueryProps & locationQuery;
  location: locationDetailsFragment;
};

// this function takes a Component, that must have locationPageProps-compatible properties.
// The function loads the location with the locationId specified in the route params
// and passes the loaded location to the specified Component
const withlocationFromRouteParams = (
  ThelocationComponent: ReactFunctionOrComponentClass<{
    location: locationDetailsFragment;
  }>
) => {
  const withlocationFromRouteParamsWrapper = (props: locationPageFullProps) => <ThelocationComponent location={props.data.location} />;
  return graphql<locationQuery, locationPageProps, locationPageFullProps>(locationQueryGql,
    {
      // options: ({ match }) => (
      //   {
      //     variables: {
      //       locationId: queryString.parse(location.search).id
      //     }
      //   })
    }
  )(withLoadingHandler<any>(withlocationFromRouteParamsWrapper));
};

export default withlocationFromRouteParams;
