import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
});

const GroupBuyBody = (props) => {
  const { classes } = props;

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>top</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>a card</Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper className={classes.paper}>2nd card</Paper>
      </Grid>
    </Grid>
  );
};

GroupBuyBody.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupBuyBody);
