import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import PrivateRoute from "../modules/components/PrivateRoute";
import LandingPage from "../modules/pages/LandingPage";
import LoginRegisterPage from "../modules/pages/LoginRegisterPage";
import ForgetPasswordPage from "../modules/pages/ForgetPasswordPage";
import ProfilePage from "../modules/pages/ProfilePage";
import EditProfilePage from "../modules/pages/EditProfilePage";
import GroupBuyPage from "../modules/pages/GroupBuyPage";
import NewRecipePage from "../modules/pages/NewRecipePage";
import CardDetailPage from "../modules/pages/CardDetailPage";

const Routes = (props) => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <LandingPage {...props} />} />
      <Route exact path="/login" render={() => <LoginRegisterPage {...props} />} />
      <Route exact path="/forgetpassword" render={() => <ForgetPasswordPage {...props} />} />
      <PrivateRoute
        path="/groupbuy"
        render={() => <GroupBuyPage {...props} />}
      />
      <PrivateRoute
        path="/newrecipe"
        render={() => <NewRecipePage {...props} />}
      />
      <PrivateRoute
        path="/viewdetails"
        render={() => <CardDetailPage {...props} />}
      />
      <PrivateRoute
        path="/profile"
        render={() => <ProfilePage {...props} />}
      />
      <PrivateRoute
        path="/editprofile"
        render={() => <EditProfilePage {...props} />}
      />
    </Switch>
  </Router>
);

export default Routes;
