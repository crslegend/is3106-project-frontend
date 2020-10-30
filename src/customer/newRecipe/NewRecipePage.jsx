import React, { Fragment, useState } from "react";
import withRoot from "../../constants/withRoot";
import Navbar from "../Navbar";
import NewRecipeForm from "./NewRecipeForm";
import IngredientListing from "./IngredientListing";

const NewRecipePage = () => {
  const [recipeInfo, setRecipeInfo] = useState({
    recipe_name: "",
    fulfillment_date: null,
  });
  const [recipePhoto, setRecipePhoto] = useState([]);

  const [dateForDisplay, setDateForDisplay] = useState(null);
  const [open, setOpen] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [validateRecipeNameField, setValidateRecipeNameField] = useState(false);
  const [validatePhoto, setValidatePhoto] = useState(false);

  return (
    <Fragment>
      <Navbar />
      <NewRecipeForm
        recipeInfo={recipeInfo}
        setRecipeInfo={setRecipeInfo}
        open={open}
        setOpen={setOpen}
        editMode={editMode}
        setDateForDisplay={setDateForDisplay}
        recipePhoto={recipePhoto}
        setRecipePhoto={setRecipePhoto}
        validateRecipeNameField={validateRecipeNameField}
        setValidateRecipeNameField={setValidateRecipeNameField}
        validatePhoto={validatePhoto}
        setValidatePhoto={setValidatePhoto}
      />
      <IngredientListing
        recipeInfo={recipeInfo}
        setRecipeInfo={setRecipeInfo}
        open={open}
        setOpen={setOpen}
        setEditMode={setEditMode}
        dateForDisplay={dateForDisplay}
        recipePhoto={recipePhoto}
        setValidateRecipeNameField={setValidateRecipeNameField}
        setValidatePhoto={setValidatePhoto}
      />
    </Fragment>
  );
};

export default withRoot(NewRecipePage);
