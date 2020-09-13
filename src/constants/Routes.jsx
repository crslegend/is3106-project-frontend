import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import LandingPage from "../modules/pages/LandingPage";
import GroupBuyPage from "../modules/pages/GroupBuyPage";

const Routes = (props) => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <LandingPage {...props} />} />
      <Route path="/groupbuy" render={() => <GroupBuyPage {...props} />} />
    </Switch>
  </Router>
);

export default Routes;
