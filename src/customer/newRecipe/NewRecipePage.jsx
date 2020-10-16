import React, { Fragment, useState } from "react";
import withRoot from "../../constants/withRoot";
import Navbar from "../Navbar";
import NewRecipeForm from "./NewRecipeForm";
import IngredientListing from "./IngredientListing";

const NewRecipePage = () => {
  const [recipeInfo, setRecipeInfo] = useState({
    name: "",
    date: null,
  });

  const [open, setOpen] = useState(true);
  const [editMode, setEditMode] = useState(false);

  return (
    <Fragment>
      <Navbar />
      <NewRecipeForm
        setRecipeInfo={setRecipeInfo}
        open={open}
        setOpen={setOpen}
        editMode={editMode}
      />
      <IngredientListing
        recipeInfo={recipeInfo}
        setRecipeInfo={setRecipeInfo}
        open={open}
        setOpen={setOpen}
        setEditMode={setEditMode}
      />
    </Fragment>
  );
};

export default withRoot(NewRecipePage);
