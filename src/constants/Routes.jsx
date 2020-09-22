import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import LandingPage from "../modules/pages/LandingPage";
import LoginRegisterPage from "../modules/pages/LoginRegisterPage";
import ForgetPasswordPage from "../modules/pages/ForgetPasswordPage";
import ProfilePage from "../modules/pages/ProfilePage";
import EditProfilePage from "../modules/pages/EditProfilePage";

export default class Routes extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={LoginRegisterPage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/editprofile" component={EditProfilePage} />
            <Route exact path="/forgetpassword" component={ForgetPasswordPage} />
          </Switch>
        </Router>
      </>
    );
  }
}
