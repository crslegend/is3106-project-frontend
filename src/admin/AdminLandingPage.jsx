import React, { Fragment } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import withRoot from "../constants/withRoot";
import VendorLogin from "./VendorLogin";

const AdminLandingPage = (props) => {
  const { path } = useRouteMatch();

  return (
    <Fragment>
      <Switch>
        <Route exact path={`${path}/`} render={() => <VendorLogin {...props} />} />
      </Switch>
    </Fragment>
  );
};

export default withRoot(AdminLandingPage);
