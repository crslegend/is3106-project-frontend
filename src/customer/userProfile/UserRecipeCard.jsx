import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    flexShrink: 1,
    width: "20vw",
    height: "100%",
    [theme.breakpoints.down("md")]: {
      width: "27vw",
    },
    [theme.breakpoints.down("sm")]: {
      margin: 10,
      width: "33vw",
      height: "95%",
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  cardHeader: {
    fontFamily: theme.typography.fontFamilySecondary,
    textTransform: "capitalize",
    fontWeight: 550,
    fontSize: 20,
    [theme.breakpoints.down("md")]: {
      fontSize: 16,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 13,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 10,
    },
  },
  cardBody: {
    fontFamily: "Raleway",
    fontWeight: 500,
    fontSize: 20,
    [theme.breakpoints.down("md")]: {
      fontSize: 15,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 10,
    },
  },
  cardWarning: {
    display: "flex",
    paddingLeft: "15px",
    color: "#ED2939",
    fontFamily: "Raleway",
    fontWeight: 500,
    fontSize: 16,
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 10,
    },
  },
  cardOngoing: {
    display: "flex",
    paddingLeft: "15px",
    color: "#32CD32",
    fontFamily: "Raleway",
    fontWeight: 500,
    fontSize: 16,
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 10,
    },
  },
  cardUpcoming: {
    display: "flex",
    paddingLeft: "15px",
    color: "#F2AA4CFF",
    fontFamily: "Raleway",
    fontWeight: 500,
    fontSize: 16,
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 10,
    },
  },
  cardButton: {
    backgroundColor: fade(theme.palette.primary.main, 0.5),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.8),
    },
    padding: 8,
    margin: 6,
    textTransform: "none",
    fontFamily: "Raleway",
    color: "#ffffff",
    fontSize: 18,
    [theme.breakpoints.down("md")]: {
      fontSize: 12,
      padding: 6,
      margin: 4,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 8,
      width: "10px",
      padding: 5,
      margin: 0,
    },
  },
}));

const UserRecipeCard = (props) => {
  const classes = styles();
  const { recipe } = props;

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={recipe && recipe.photo_url}
        title={recipe && recipe.recipe_name}
      />
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

        <Button
          className={classes.cardButton}
          component={Link}
          to={{
            pathname: `/profile/viewallrecipes/${recipe && recipe.recipe_id}`,
            query: recipe,
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(UserRecipeCard);
