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
import { Delete, Edit, AddShoppingCart } from "@material-ui/icons";
import NewRecipeForm from "./NewRecipeForm";
import IngredientsTabs from "./IngredientsTabs";

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
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: "15px",
    height: "100%",
    borderRadius: 10,
    width: "90%",
    margin: "auto",
    backgroundColor: "#DCCCBB",
  },
  recipeListHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: "15px",
  },
  price: {
    lineHeight: 3,
    textTransform: "capitalize",
  },
  ingredientsList: {
    width: "95%",
    margin: "auto",
  },
  submitButton: {
    width: "40%",
    alignSelf: "center",
    marginBottom: "15px",
  },
  list: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

const IngredientListing = (props) => {
  const { classes, recipeInfo, setRecipeInfo, setOpen } = props;
  const [chosenIngredients, updateIngredients] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // useEffect(() => {
  //   Service.ntucClient
  //     .get("", {
  //       params: {
  //         category: "meat-seafood",
  //         includeTagDetails: "true",
  //         page: 1,
  //         url: "meat-seafood",
  //       },
  //     })
  //     .then((res) => {
  //       // console.log(res.data.data.page.layouts[1].value.collection);
  //       setListing(res.data.data.page.layouts[1].value.collection);
  //     });
  // }, []);

  // console.log(listing);
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
    <Grid container>
      <Grid item xs={12} sm={8}>
        <Paper className={classes.ingredientsList}>
          <h1>Searchbar here</h1>
          <IngredientsTabs
            updateIngredients={updateIngredients}
            chosenIngredients={chosenIngredients}
            calculateTotalPrice={calculateTotalPrice}
          />
        </Paper>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Paper className={classes.recipeList}>
          <div>
            <div className={classes.recipeListHeader}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography variant="h5" className={classes.title}>
                  {recipeInfo.name && recipeInfo.name
                    ? `Recipe: ${recipeInfo.name}`
                    : "Recipe: -"}
                </Typography>
                <Typography variant="h5" className={classes.title}>
                  {recipeInfo.date && recipeInfo.date
                    ? `Fulfillment Date: ${recipeInfo.date.toDateString()}`
                    : "Fulfillment Date: -"}
                </Typography>
              </div>

              <IconButton edge="end" onClick={() => editRecipeNameAndDate()}>
                <Edit />
              </IconButton>
            </div>
          </div>
          <div className={classes.separator} />
          <div>
            <List className={classes.list}>
              {chosenIngredients && chosenIngredients.length > 0 ? (
                chosenIngredients.map((value) => {
                  return (
                    <div className={classes.list}>
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
                    </div>
                  );
                })
              ) : (
                <Fragment>
                  <AddShoppingCart style={{ fontSize: 50 }} color="disabled" />
                  <Typography variant="subtitle1">
                    No Ingredients Yet
                  </Typography>
                </Fragment>
              )}
            </List>
          </div>
          <div className={classes.separator} />
          <div>
            <Typography variant="h5" className={classes.price}>
              Total Price: ${totalPrice}
            </Typography>
            <Button
              onClick={handleSubmit}
              color="inherit"
              variant="outlined"
              className={classes.submitButton}
            >
              Enter Group Buy
            </Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

IngredientListing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IngredientListing);
