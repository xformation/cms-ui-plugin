import * as React from "react";
import { RouteComponentProps } from "react-router";
import { graphql, QueryProps } from "react-apollo";
import * as gql from 'graphql-tag';

import * as findAllByLocationQueryGql from "./findAllByLocationQuery.graphql";
import { ReactFunctionOrComponentClass, findAllByLocationQuery, findAllByLocationDetailsFragment } from "../types";
import withLoadingHandler from "../../components/withLoadingHandler";

var queryString = require('query-string');

// Specifies the parameters taken from the route definition (/.../:findAllByLocationId)
type findAllByLocationPageRouteParams = {
  findAllByLocationId: any
};

// Specifies the Properties that are passed to
type findAllByLocationPageProps = RouteComponentProps<findAllByLocationPageRouteParams>;

// The "full set" of properties passed to the target component
// (that is with the properties from GraphQL including the loaded findAllByLocation)
type findAllByLocationPageFullProps = findAllByLocationPageProps & {
  data: QueryProps & findAllByLocationQuery;
  findAllByLocation: findAllByLocationDetailsFragment;
};

// this function takes a Component, that must have findAllByLocationPageProps-compatible properties.
// The function loads the findAllByLocation with the findAllByLocationId specified in the route params
// and passes the loaded findAllByLocation to the specified Component
const withfindAllByLocationFromRouteParams = (
  ThefindAllByLocationComponent: ReactFunctionOrComponentClass<{
    findAllByLocation: findAllByLocationDetailsFragment;
  }>
) => {
  const withfindAllByLocationFromRouteParamsWrapper = (props: findAllByLocationPageFullProps) => <ThefindAllByLocationComponent findAllByLocation={props.data.findAllByLocation} />;
  return graphql<findAllByLocationQuery, findAllByLocationPageProps, findAllByLocationPageFullProps>(findAllByLocationQueryGql,
    {
      // options: ({ match }) => (
      //   {
      //     variables: {
      //       findAllByLocationId: queryString.parse(location.search).id
      //     }
      //   })
    }
  )(withLoadingHandler<any>(withfindAllByLocationFromRouteParamsWrapper));
};

export default withfindAllByLocationFromRouteParams;
