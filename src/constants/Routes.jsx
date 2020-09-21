import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import PrivateRoute from "../modules/components/PrivateRoute";
import LandingPage from "../modules/pages/LandingPage";
import GroupBuyPage from "../modules/pages/GroupBuyPage";
import NewRecipePage from "../modules/pages/NewRecipePage";

const Routes = (props) => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <LandingPage {...props} />} />
      <PrivateRoute path="/groupbuy" render={() => <GroupBuyPage {...props} />} />
      <PrivateRoute path="/newrecipe" render={() => <NewRecipePage {...props} />} />
    </Switch>
  </Router>
);

export default Routes;
