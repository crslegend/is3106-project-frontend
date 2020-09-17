import React, { Fragment, useState } from "react";
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
import { Image, Delete } from "@material-ui/icons";

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
  price: {
    lineHeight: 3,
  },
});

const IngredientListing = (props) => {
  const { classes, recipeInfo } = props;
  const [chosenIngredients, updateIngredients] = useState([0, 1]);

  const deleteIngredient = (value) => {
    // console.log(value);
    const index = chosenIngredients.indexOf(value);
    updateIngredients(
      chosenIngredients.filter(
        (item) => chosenIngredients.indexOf(item) !== index
      )
    );
  };

  const addNumber = (number) => {
    chosenIngredients.push(number);
    // console.log(chosenIngredients);
    updateIngredients([...chosenIngredients]);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={8}>
        <Paper>
          <h1>Searchbar here</h1>
          <h2>tabs here </h2>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Paper className={classes.recipeList}>
          <Typography variant="h4" className={classes.title}>
            {recipeInfo.name && recipeInfo.name
              ? recipeInfo.name
              : "Name of Recipe"}
          </Typography>
          <Typography variant="h5" className={classes.title}>
            {recipeInfo.date && recipeInfo.date
              ? recipeInfo.date.toDateString()
              : "Fulfillment Date"}
          </Typography>
          <div className={classes.separator} />
          <List>
            {chosenIngredients && chosenIngredients.length > 0 ? (
              chosenIngredients.map((value) => {
                const labelId = `checkbox-list-label-${value}`;
                return (
                  <Fragment>
                    <ListItem key={value}>
                      <ListItemAvatar>
                        <Avatar>
                          <Image />
                        </Avatar>
                      </ListItemAvatar>

                      <ListItemText
                        id={labelId}
                        primary={`Line item ${value + 1}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                          <Delete onClick={() => deleteIngredient(value)} />
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
            Total Price:{" "}
          </Typography>
          <Button onClick={() => addNumber(6)}>Enter Group Buy</Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

IngredientListing.propTypes = {
  classes: PropTypes.object.isRequired,
  recipeInfo: PropTypes.object.isRequired,
};

export default withStyles(styles)(IngredientListing);
