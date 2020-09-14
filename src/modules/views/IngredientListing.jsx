import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";

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
});

const IngredientListing = (props) => {
  const { classes, recipeInfo } = props;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={8}>
        <Paper>
          <h1>choose ingredients here</h1>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper>
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
