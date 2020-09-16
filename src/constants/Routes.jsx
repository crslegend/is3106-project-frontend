import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import PrivateRoute from "../modules/components/PrivateRoute";
import LandingPage from "../modules/pages/LandingPage";
import GroupBuyPage from "../modules/pages/GroupBuyPage";
import CardDetailPage from "../modules/pages/CardDetailPage";

const Routes = (props) => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <LandingPage {...props} />} />
      <Route path="/groupbuy" render={() => <GroupBuyPage {...props} />} />
      <Route path="/viewdetails" component={CardDetailPage} />
    </Switch>
  </Router>
);

export default Routes;
