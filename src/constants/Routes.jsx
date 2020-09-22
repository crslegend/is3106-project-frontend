import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

// import PrivateRoute from "../modules/components/PrivateRoute";
import LandingPage from "../customer/landing/LandingPage";
import LoginRegisterPage from "../customer/auth/LoginRegisterPage";
import ForgetPasswordPage from "../customer/auth/ForgetPasswordPage";
import ProfilePage from "../customer/userProfile/ProfilePage";
import EditProfilePage from "../customer/userProfile/EditProfilePage";
import GroupBuyPage from "../customer/groupBuy/GroupBuyPage";
import NewRecipePage from "../customer/newRecipe/NewRecipePage";
import CardDetailPage from "../customer/groupBuy/CardDetailPage";

const Routes = (props) => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <LandingPage {...props} />} />
      <Route
        exact
        path="/login"
        render={() => <LoginRegisterPage {...props} />}
      />
      <Route
        exact
        path="/forgetpassword"
        render={() => <ForgetPasswordPage {...props} />}
      />
      <Route path="/groupbuy" render={() => <GroupBuyPage {...props} />} />
      <Route path="/newrecipe" render={() => <NewRecipePage {...props} />} />
      <Route path="/viewdetails" render={() => <CardDetailPage {...props} />} />
      <Route path="/profile" render={() => <ProfilePage {...props} />} />
      <Route
        path="/editprofile"
        render={() => <EditProfilePage {...props} />}
      />
    </Switch>
  </Router>
);

export default Routes;
