import React, { Fragment } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import Navbar from "../customer/Navbar";
import withRoot from "../constants/withRoot";
import VendorLogin from "./VendorLogin";

const AdminLandingPage = (props) => {
  const { path } = useRouteMatch();

  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route exact path={`${path}/`} render={() => <VendorLogin {...props} />} />
      </Switch>
    </Fragment>
  );
};

export default withRoot(AdminLandingPage);
