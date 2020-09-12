import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import LandingPage from "../modules/pages/LandingPage";
import GroupBuyPage from "../modules/pages/GroupBuyPage";

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/groupbuy" component={GroupBuyPage} />
    </Switch>
  </Router>
);

export default Routes;
