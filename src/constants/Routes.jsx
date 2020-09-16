import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import LandingPage from "../modules/pages/LandingPage";
import GroupBuyPage from "../modules/pages/GroupBuyPage";
import CardDetailPage from "../modules/pages/CardDetailPage";

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/groupbuy" component={GroupBuyPage} />
      <Route path="/viewdetails" component={CardDetailPage} />
    </Switch>
  </Router>
);

export default Routes;
