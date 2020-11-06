import React, { Fragment, useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Grid, Card } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import moment from "moment";
import Cookies from "js-cookie";
import Service from "../../AxiosService";
import withRoot from "../../constants/withRoot";
import Navbar from "../Navbar";

const styles = (theme) => ({
  root: {
    marginTop: "40px",
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(0, 2),
    variant: "outlined",
    textAlign: "center",
    background: fade("#E6BEAE", 0.5),
  },
  icon: {
    background: fade(theme.palette.primary.main, 0.5),
    borderRadius: "50px",
    padding: "2px",
    fontSize: "3vw",
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
    height: "250px",
    width: "100%",
    margin: " 0px 30px 40px",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      height: "250px",
      margin: " 0px 10px",
      width: "95%",
    },
  },
  cardHeader: {
    fontFamily: theme.typography.fontFamilySecondary,
    textTransform: "capitalize",
    fontWeight: 550,
    fontSize: 30,
    textAlign: "left",
    paddingLeft: "30px",
    [theme.breakpoints.down("md")]: {
      fontSize: 28,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 22,
      paddingLeft: "0px",
    },
  },
  upcoming: {
    display: "flex",
    paddingLeft: "30px",
    paddingTop: "10px",
    color: "#ED2939",
    fontFamily: "Raleway",
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
      paddingLeft: "0px",
    },
  },
  cardBody: {
    fontFamily: "Raleway",
    fontWeight: 500,
    fontSize: 22,
    textAlign: "left",
    paddingLeft: "30px",
    [theme.breakpoints.down("md")]: {
      fontSize: 20,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
      paddingLeft: "0px",
    },
  },
  ing: {
    fontFamily: "Raleway",
    textAlign: "left",
    paddingLeft: "40px",
    fontSize: 15,
    [theme.breakpoints.down("md")]: {
      fontSize: 13,
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "10px",
    },
  },
});

const ViewRecipeDetailed = (props) => {
  const { classes } = props;
  const { id } = useParams();
  console.log(id);

  // react router dom history hooks
  const history = useHistory();
  const location = useLocation();
  const recipe = location.query;
  return (
    <Fragment>
      <Navbar />
      <Grid container className={classes.root}>
        <Grid item xs={2}>
          <Link to="/profile/viewallrecipes">
            <ArrowBackIcon className={classes.icon} />
          </Link>
        </Grid>
        <Grid xs={9}>
          <Card className={classes.card}>
            <Grid container className={classes.root}>
              <Grid xs={12} md={5}>
                <CardMedia
                  className={classes.media}
                  image={recipe && recipe.photo_url}
                  title={recipe && recipe.recipe_name}
                />
              </Grid>
              <Grid xs={12} md={7}>
                <CardContent height="150" width="150">
                  <Typography className={classes.cardHeader}>
                    {recipe && recipe.recipe_name}
                  </Typography>
                  {
                    <Typography className={classes.cardBody}>
                      ${recipe && recipe.estimated_price_start} - $
                      {recipe && recipe.estimated_price_end}
                    </Typography>
                  }
                  <Typography
                    style={{ marginTop: "10px" }}
                    className={classes.cardBody}
                  >
                    Ingredient List
                  </Typography>
                  {recipe &&
                    recipe.ingredients.map((ingredient) => (
                      <Typography className={classes.ing}>
                        {ingredient.ing_name} , {ingredient.quantity}
                      </Typography>
                    ))}
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Fragment>
  );
};

export default withRoot(withStyles(styles)(ViewRecipeDetailed));
