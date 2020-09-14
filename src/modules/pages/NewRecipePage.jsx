import React, { Fragment, useState } from "react";
import withRoot from "../withRoot";
import Navbar from "../views/Navbar";
import NewRecipeForm from "../views/NewRecipeForm";
import IngredientListing from "../views/IngredientListing";

const NewRecipePage = () => {
  const [recipeInfo, setRecipeInfo] = useState({
    name: "",
    date: null,
  });

  return (
    <Fragment>
      <Navbar />
      <NewRecipeForm setRecipeInfo={setRecipeInfo} />
      <IngredientListing recipeInfo={recipeInfo} />
    </Fragment>
  );
};

export default withRoot(NewRecipePage);
