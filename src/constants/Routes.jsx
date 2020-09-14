import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import PrivateRoute from "../modules/components/PrivateRoute";
import LandingPage from "../modules/pages/LandingPage";
import GroupBuyPage from "../modules/pages/GroupBuyPage";

const Routes = (props) => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <LandingPage {...props} />} />
      <PrivateRoute path="/groupbuy" render={() => <GroupBuyPage {...props} />} />
    </Switch>
  </Router>
);

export default Routes;
