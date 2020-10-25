import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Snackbar,
  Typography,
} from "@material-ui/core";
import {
  Delete,
  Edit,
  AddShoppingCart,
  AssignmentTwoTone,
  DateRangeTwoTone,
} from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import IngredientsTabs from "./IngredientsTabs";
import Service from "../../AxiosService";

const styles = (theme) => ({
  title: {
    textTransform: "capitalize",
    fontWeight: "bold",
    alignSelf: "center",
  },
  separator: {
    height: 2,
    width: "80%",
    display: "block",
    margin: `${theme.spacing(1)}px auto 0`,
    backgroundColor: theme.palette.secondary.main,
  },
  recipeList: {
    display: "flex",
    flexDirection: "column",
    marginTop: "15px",
    height: "98%",
    borderRadius: 10,
    width: "90%",
    margin: "auto",
    backgroundColor: "#EEE2DF",
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
    marginTop: "15px",
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
  submitModalButton: {
    "&:hover": {
      backgroundColor: "#EEF1EF",
    },
  },
  dialog: {
    backgroundColor: theme.palette.primary.main,
    "& h5": {
      textTransform: "capitalize",
    },
  },
});

const IngredientListing = (props) => {
  const {
    classes,
    recipeInfo,
    setRecipeInfo,
    setOpen,
    setEditMode,
    dateForDisplay,
  } = props;
  const [chosenIngredients, updateIngredients] = useState([]);
  const [priceRange, setPriceRange] = useState({
    estimated_price_start: 0,
    estimated_price_end: 0,
  });
  const [alertOpen, setAlertOpen] = useState(false);
  const [openConfirmSubmitModal, setConfirmSubmitModal] = useState(false);

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
      total += parseFloat(chosenIngredients[i].estimated_price);
    }

    const lowEnd = (total / 100) * 90;
    const highEnd = (total / 100) * 110;
    setPriceRange({
      estimated_price_start: lowEnd,
      estimated_price_end: highEnd,
    });
  };

  useEffect(() => {
    calculateTotalPrice();
    console.log(chosenIngredients);
  }, [chosenIngredients]);

  const deleteIngredient = (value) => {
    updateIngredients(chosenIngredients.filter((item) => item !== value));
  };

  const handleSubmit = () => {
    if (recipeInfo.recipe_name === "" || recipeInfo.fulfillment_date === null) {
      setEditMode(true);
      setOpen(true);
    } else if (chosenIngredients.length === 0) {
      setAlertOpen(true);
    } else {
      setEditMode(false);
      setRecipeInfo({
        ...recipeInfo,
        estimated_price_start: priceRange.estimated_price_start.toFixed(2),
        estimated_price_end: priceRange.estimated_price_end.toFixed(2),
        ingredients: chosenIngredients,
      });
      setConfirmSubmitModal(true);
    }
    // console.log(recipeInfo);
  };

  const submitRecipe = () => {
    console.log(recipeInfo);
    setConfirmSubmitModal(false);

    Service.client
      .post("/api/token/", {
        email: "a@a.com",
        password: "password",
      })
      .then((res) => {
        console.log(res);
        Service.storeCredentials(res.data); // store access and refresh tokens

        Service.client
          .post("/recipes", recipeInfo)
          .then((res) => console.log(res)); // get protected view
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editRecipeNameAndDate = () => {
    setEditMode(true);
    setOpen(true);
  };

  const handleAlertClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <div className={classes.ingredientsList}>
          <IngredientsTabs
            updateIngredients={updateIngredients}
            chosenIngredients={chosenIngredients}
            calculateTotalPrice={calculateTotalPrice}
          />
        </div>
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <AssignmentTwoTone fontSize="large" />

                  <Typography
                    variant="h5"
                    style={{
                      textTransform: "capitalize",
                      alignSelf: "center",
                      marginLeft: "10px",
                    }}
                  >
                    {recipeInfo.recipe_name && recipeInfo.recipe_name
                      ? ` ${recipeInfo.recipe_name}`
                      : "-"}
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <DateRangeTwoTone fontSize="large" />
                  <Typography
                    variant="h5"
                    style={{
                      textTransform: "capitalize",
                      marginLeft: "10px",
                    }}
                  >
                    {dateForDisplay && dateForDisplay
                      ? ` ${dateForDisplay.toDateString()}`
                      : "-"}
                  </Typography>
                </div>
              </div>

              <IconButton edge="end" onClick={() => editRecipeNameAndDate()}>
                <Edit />
              </IconButton>
            </div>
            <div className={classes.separator} />
          </div>

          <div>
            <Grid container justify="center">
              <List>
                {chosenIngredients && chosenIngredients.length > 0 ? (
                  chosenIngredients.map((value) => {
                    return (
                      <Fragment>
                        <ListItem
                          key={value}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar src={value.image_url} />
                          </ListItemAvatar>

                          <ListItemText
                            style={{ marginRight: "20px" }}
                            secondaryTypographyProps={{
                              style: { fontWeight: "normal" },
                            }}
                            id={value}
                            primary={`${value.ing_name}`}
                            secondary={`Quantity: ${value.quantity}`}
                          />

                          <ListItemText
                            style={{ marginLeft: "20px" }}
                            id={value}
                            primary={`$${value.estimated_price}`}
                          />

                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => deleteIngredient(value)}
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
                  <div style={{ paddingTop: "150px" }}>
                    <Fragment>
                      <AddShoppingCart
                        style={{ fontSize: 50 }}
                        color="disabled"
                      />
                      <Typography variant="subtitle1">
                        No Ingredients Yet
                      </Typography>
                    </Fragment>
                  </div>
                )}
              </List>
            </Grid>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              flex: 1,
            }}
          >
            <div className={classes.separator} />
            <Typography variant="h5" className={classes.price}>
              Estimated Price: ${priceRange.estimated_price_start.toFixed(2)} -
              ${priceRange.estimated_price_end.toFixed(2)}
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

      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} elevation={6} severity="error">
          <Typography variant="body1">
            Please add some ingredients before submitting!
          </Typography>
        </Alert>
      </Snackbar>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={openConfirmSubmitModal}
        PaperProps={{ style: { minWidth: "400px", maxWidth: "400px" } }}
      >
        <DialogTitle className={classes.dialog}>
          <Typography variant="h5">Confirm Submission</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body1">
              You cannot make any more changes once you have submitted for
              approval. Continue to submit?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            className={classes.submitModalButton}
            onClick={() => setConfirmSubmitModal(false)}
          >
            Cancel
          </Button>
          <Button
            color="secondary"
            className={classes.submitModalButton}
            onClick={submitRecipe}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

IngredientListing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IngredientListing);
