import React, { useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import PrivateRoute from "../components/PrivateRoute";
import LandingPage from "../customer/landing/LandingPage";
import LoginRegisterPage from "../customer/auth/LoginRegisterPage";
import ProfilePage from "../customer/userProfile/ProfilePage";
import GroupBuyPage from "../customer/groupBuy/GroupBuyPage";
import NewRecipePage from "../customer/newRecipe/NewRecipePage";
import CardDetailPage from "../customer/groupBuy/CardDetailPage";
import AdminLandingPage from "../admin/AdminLandingPage";
import Toast from "../components/Toast";
import PaymentPage from "../customer/payment/PaymentPage";
import ViewAllGroupbuys from "../customer/userProfile/ViewAllGroupbuys";
import ViewAllRecipes from "../customer/userProfile/ViewAllRecipes";
import ViewGroupbuyDetailed from "../customer/userProfile/ViewGroupbuyDetailed";
import ViewRecipeDetailed from "../customer/userProfile/ViewRecipeDetailed";

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
        <Route path="/groupbuy" render={() => <GroupBuyPage {...props} />} />
        <Route path="/newrecipe" render={() => <NewRecipePage {...props} />} />
        <Route
          path="/viewdetails/:id"
          strict
          sensitive
          render={(match) => <CardDetailPage match={match} />}
        />
        <PrivateRoute
          path="/payment/:id"
          strict
          sensitive
          render={(match) => <PaymentPage match={match} />}
        />
        <PrivateRoute
          exact
          path="/profile"
          render={() => (
            <ProfilePage
              {...props}
              setSbOpen={setOpen}
              snackbar={snackbar}
              setSnackbar={setSnackbar}
            />
          )}
        />
        <PrivateRoute
          exact
          path="/profile/viewallgroupbuys"
          render={() => <ViewAllGroupbuys {...props} />}
        />
        <PrivateRoute
          path="/profile/viewallgroupbuys/:id"
          strict
          sensitive
          render={(match) => <ViewGroupbuyDetailed match={match} {...props} />}
        />
        <PrivateRoute
          exact
          path="/profile/viewallrecipes"
          render={() => <ViewAllRecipes {...props} />}
        />
        <PrivateRoute
          path="/profile/viewallrecipes/:id"
          strict
          sensitive
          render={(match) => <ViewRecipeDetailed match={match} {...props} />}
        />
        <Route path="/admin" render={() => <AdminLandingPage {...props} />} />
      </Switch>
      <Toast open={open} setOpen={setOpen} {...snackbar} />
    </Router>
  );
};

export default Routes;
