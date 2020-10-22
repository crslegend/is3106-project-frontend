import React, { useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import PrivateRoute from "../components/PrivateRoute";
import LandingPage from "../customer/landing/LandingPage";
import LoginRegisterPage from "../customer/auth/LoginRegisterPage";
import ForgetPasswordPage from "../customer/auth/ForgetPasswordPage";
import ProfilePage from "../customer/userProfile/ProfilePage";
import EditProfilePage from "../customer/userProfile/EditProfilePage";
import GroupBuyPage from "../customer/groupBuy/GroupBuyPage";
import NewRecipePage from "../customer/newRecipe/NewRecipePage";
import CardDetailPage from "../customer/groupBuy/CardDetailPage";
import Toast from "../components/Toast";

const Routes = (props) => {
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    message: "",
    severity: "Success",
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    autoHideDuration: 3000,
  });

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <LandingPage {...props} />} />
        <Route
          exact
          path="/login"
          render={() => (
            <LoginRegisterPage
              {...props}
              setSbOpen={setOpen}
              snackbar={snackbar}
              setSnackbar={setSnackbar}
            />
          )}
        />
        <Route
          exact
          path="/forgetpassword"
          render={() => <ForgetPasswordPage {...props} />}
        />
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
      <Toast open={open} setOpen={setOpen} {...snackbar} />
    </Router>
  );
};

export default Routes;
