import * as React from "react";
import { RouteComponentProps } from "react-router";
import { gql, graphql, QueryProps } from "react-apollo";

import * as FeeQueryGql from "./FeeQuery.graphql";
import {
  ReactFunctionOrComponentClass, FeeQuery,
  FeeDetailsFragment
} from "../types";
import withLoadingHandler from "../../components/withLoadingHandler";

var queryString = require('query-string');

// Specifies the parameters taken from the route definition (/.../:feeId)
type FeePageRouteParams = {
  feeId: any
};

// Specifies the Properties that are passed to
type FeePageProps = RouteComponentProps<FeePageRouteParams>;

// The "full set" of properties passed to the target component
// (that is with the properties from GraphQL including the loaded fee)
type FeePageFullProps = FeePageProps & {
  data: QueryProps & FeeQuery;
  fee: FeeDetailsFragment;
};

// this function takes a Component, that must have FeePageProps-compatible properties.
// The function loads the Fee with the feeId specified in the route params
// and passes the loaded fee to the specified Component
const withFeeFromRouteParams = (
  TheFeeComponent: ReactFunctionOrComponentClass<{
    fee: FeeDetailsFragment;
  }>
) => {
  const withFeeFromRouteParamsWrapper = (props: FeePageFullProps) => <TheFeeComponent fee={props.data.fee} />;
  return graphql<FeeQuery, FeePageProps, FeePageFullProps>(FeeQueryGql, {
    options: ({ match }) => (
      {
        variables: {
          feeId: queryString.parse(location.search).id
        }
      })
  })(withLoadingHandler(withFeeFromRouteParamsWrapper));
};

export default withFeeFromRouteParams;
