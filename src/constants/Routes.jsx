import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import LandingPage from "../modules/pages/LandingPage";
import GroupBuyPage from "../modules/pages/GroupBuyPage";
import NewRecipePage from "../modules/pages/NewRecipePage";

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/groupbuy" component={GroupBuyPage} />
      <Route exact path="/newrecipe" component={NewRecipePage} />
    </Switch>
  </Router>
);

export default Routes;
