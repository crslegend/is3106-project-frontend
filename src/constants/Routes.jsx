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
import AdminLandingPage from "../admin/AdminLandingPage";
import Toast from "../components/Toast";
import PaymentPage from "../customer/payment/PaymentPage";

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
          path="/auth"
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
        <Route path="/groupbuy" render={() => <GroupBuyPage {...props} />} />
        <Route
          path="/newrecipe"
          render={() => <NewRecipePage {...props} />}
        />
        <Route
          path="/viewdetails/:id"
          strict
          sensitive
          render={(match) => <CardDetailPage match={match} />}
        />
        <Route
          path="/payment/:id"
          strict
          sensitive
          render={(match) => <PaymentPage match={match} />}
        />
        <Route path="/profile" render={() => <ProfilePage {...props} />} />
        <Route
          path="/editprofile"
          render={() => <EditProfilePage {...props} />}
        />
        <Route path="/admin" render={() => <AdminLandingPage {...props} />} />
      </Switch>
      <Toast open={open} setOpen={setOpen} {...snackbar} />
    </Router>
  );
};

export default Routes;
