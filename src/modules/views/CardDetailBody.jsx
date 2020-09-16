import React, { Fragment } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import CardMedia from "@material-ui/core/CardMedia";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import image from "../../assets/lamb.jpg";

const styles = makeStyles((theme) => ({
  root: {
    marginTop: "40px",
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    height: "60vh",
    variant: "outlined",
    textAlign: "center",
    background: "#E6BEAE",
    [theme.breakpoints.down("sm")]: {
      height: "70vh",
    },
  },
  icon: {
    background: fade(theme.palette.primary.main, 0.5),
    borderRadius: "50px",
    padding: "2px",
    fontSize: "4vw",
    marginLeft: "100px",
    color: fade("#48494B", 0.8),
    "&:hover": {
      background: fade(theme.palette.primary.main, 0.8),
      color: "#48494B",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "5vw",
      marginLeft: "50px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "6vw",
      marginLeft: "20px",
    },
  },
  media: {
    height: 350,
    width: "100%",
    margin: " 0px 30px",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      height: 200,
      margin: " 0px 10px",
      width: "95%",
    },
  },
}));

const CardDetailBody = () => {
  const classes = styles();

  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={2}>
          <ArrowBackIcon
            onClick={(event) => (window.location.href = "groupbuy")}
            className={classes.icon}
          />
        </Grid>
        <Grid xs={9}>
          <Paper elevation={3} className={classes.paper}>
            <Grid container className={classes.root}>
              <Grid xs={12} md={5}>
                <CardMedia
                  className={classes.media}
                  image={image}
                  title="Grilled Lamb Chop"
                />
              </Grid>
              <Grid xs={12} md={7}>
                word
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Fragment>
  );
};

export default withStyles(styles)(CardDetailBody);
