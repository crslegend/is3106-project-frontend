import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import NewRecipeForm from "./NewRecipeForm";
import IngredientsTabs from "./IngredientsTabs";
import Service from "../../AxiosService";

const styles = (theme) => ({
  title: {
    textTransform: "capitalize",
  },
  separator: {
    height: 4,
    width: "80%",
    display: "block",
    margin: `${theme.spacing(1)}px auto 0`,
    backgroundColor: theme.palette.secondary.main,
  },
  recipeList: {
    height: "100%",
    borderRadius: 12,
  },
  recipeListHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  price: {
    lineHeight: 3,
  },
  ingredientsList: {
    width: "90%",
    margin: "auto",
  },
});

const IngredientListing = (props) => {
  const { classes, recipeInfo, setRecipeInfo, setOpen } = props;
  const [chosenIngredients, updateIngredients] = useState([]);
  const [listing, setListing] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    Service.ntucClient
      .get("", {
        params: {
          category: "meat-seafood",
          includeTagDetails: "true",
          page: 1,
          url: "meat-seafood",
        },
      })
      .then((res) => {
        // console.log(res.data.data.page.layouts[1].value.collection);
        setListing(res.data.data.page.layouts[1].value.collection);
      });
  }, []);

  // console.log(listing.product && listing.product);

  const calculateTotalPrice = () => {
    let total = 0;
    let i = 0;
    for (i = 0; i < chosenIngredients.length; i += 1) {
      total += parseFloat(chosenIngredients[i].estimatedPrice);
    }
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice();
    console.log(chosenIngredients);
  }, [chosenIngredients]);

  const deleteIngredient = (value) => {
    updateIngredients(
      chosenIngredients.filter((item) => item.productId !== value)
    );
  };

  const handleSubmit = () => {
    if (recipeInfo.name === "" && recipeInfo.date === null) {
      setOpen(true);
    }
    setRecipeInfo((recipeInfo.chosenIngredients = chosenIngredients));
    console.log(recipeInfo);
  };

  const editRecipeNameAndDate = () => (
    <NewRecipeForm
      recipeInfo={recipeInfo}
      setRecipeInfo={setRecipeInfo}
      open={setOpen(true)}
    />
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8}>
        <Paper className={classes.ingredientsList}>
          <h1>Searchbar here</h1>
          <IngredientsTabs
            updateIngredients={updateIngredients}
            chosenIngredients={chosenIngredients}
            products={listing.product}
            calculateTotalPrice={calculateTotalPrice}
          />
        </Paper>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Paper className={classes.recipeList}>
          <div className={classes.recipeListHeader}>
            <Typography variant="h4" className={classes.title}>
              {recipeInfo.name && recipeInfo.name
                ? recipeInfo.name
                : "Name of Recipe"}
            </Typography>
            <IconButton edge="end" onClick={() => editRecipeNameAndDate()}>
              <Edit />
            </IconButton>
          </div>

          <Typography variant="h5" className={classes.title}>
            {recipeInfo.date && recipeInfo.date
              ? recipeInfo.date.toDateString()
              : "Fulfillment Date"}
          </Typography>
          <div className={classes.separator} />
          <List>
            {chosenIngredients && chosenIngredients.length > 0 ? (
              chosenIngredients.map((value) => {
                return (
                  <Fragment>
                    <ListItem key={value.productId}>
                      <ListItemAvatar>
                        <Avatar src={value.imageURL} />
                      </ListItemAvatar>

                      <ListItemText
                        id={value.productId}
                        primary={`${value.name} ${value.selectedAmount}g $${value.estimatedPrice}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => deleteIngredient(value.productId)}
                        >
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </Fragment>
                );
              })
            ) : (
              <Typography variant="h5">No Ingredients Added Yet</Typography>
            )}
          </List>
          <div className={classes.separator} />
          <Typography variant="h5" className={classes.price}>
            Total Price: ${totalPrice}
          </Typography>
          <Button onClick={handleSubmit}>Enter Group Buy</Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

IngredientListing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IngredientListing);
