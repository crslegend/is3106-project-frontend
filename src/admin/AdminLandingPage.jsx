import React, { Fragment, useState } from "react";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";

import withRoot from "../constants/withRoot";
import PrivateRoute from "../components/PrivateRoute";
import VendorLogin from "./VendorLogin";
import Toast from "../components/Toast";
import VendorDashboard from "./VendorDashboard";
const AdminLandingPage = (props) => {
  const { path } = useRouteMatch();

  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    message: "",
    severity: "Success",
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    autoHideDuration: 3000,
  });

  return (
    <Fragment>
      <Switch>
        <Route
          exact
          path={`${path}`}
          render={() => <VendorLogin {...props} setSbOpen={setOpen} snackbar={snackbar} setSnackbar={setSnackbar} />}
        />
        <PrivateRoute
          path={`${path}/dashboard`}
          render={() => (
            <VendorDashboard {...props} setSbOpen={setOpen} snackbar={snackbar} setSnackbar={setSnackbar} />
          )}
        />
        <Redirect from={`${path}/*`} to={`${path}`} />
      </Switch>
      <Toast open={open} setOpen={setOpen} {...snackbar} />
    </Fragment>
  );
};

export default withRoot(AdminLandingPage);
