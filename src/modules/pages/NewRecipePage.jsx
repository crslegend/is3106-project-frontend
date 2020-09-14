import React, { Fragment } from "react";
import withRoot from "../withRoot";
import Navbar from "../views/Navbar";
import NewRecipeForm from "../views/NewRecipeForm";

const NewRecipePage = () => (
  <Fragment>
    <Navbar />
    <NewRecipeForm />
  </Fragment>
);

export default withRoot(NewRecipePage);
