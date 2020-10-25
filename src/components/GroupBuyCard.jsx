import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import image from "../assets/lamb.jpg";

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    flexShrink: 1,
    width: "19vw",
    height: "100%",
    [theme.breakpoints.down("md")]: {
      width: "25vw",
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
    textTransform: "uppercase",
    fontWeight: 550,
    fontSize: 22,
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
  cardButton: {
    backgroundColor: fade(theme.palette.primary.main, 0.5),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.8),
    },
    padding: 8,
    margin: 6,
    textTransform: "none",
    fontFamily: "Raleway",
    color: "#5E4955",
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

const GroupBuyCard = (props) => {
  const classes = styles();

  const { groupbuyitem, groupbuy } = props;

  let warning;

  const orderamount =
    (groupbuy.current_order_quantity / groupbuy.minimum_order_quantity) * 100;

  if (orderamount >= 80 && orderamount < 100) {
    warning = (
      <Typography className={classes.cardWarning}>Selling Fast!</Typography>
    );
  } else if (orderamount >= 100) {
    warning = (
      <Typography className={classes.cardWarning}>Quantity Reached!</Typography>
    );
  }

  return (
    <Card className={classes.root}>
      <CardActionArea href="/viewdetails">
        <CardMedia
          className={classes.media}
          image={image}
          title={groupbuyitem.recipe_name}
        />
        <CardContent height="150" width="150">
          <Typography className={classes.cardHeader}>
            {groupbuyitem.recipe_name}
          </Typography>
          {groupbuy.final_price !== null ? (
            <Typography className={classes.cardBody}>
              ${groupbuy.final_price}
            </Typography>
          ) : (
            <Typography className={classes.cardBody}>
              ${groupbuy.recipe.estimated_price_start} - $
              {groupbuy.recipe.estimated_price_end}
            </Typography>
          )}

          <Button
            className={classes.cardButton}
            component={Link}
            to={`/viewdetails/${groupbuy.gb_id}`}
          >
            View Details
          </Button>
        </CardContent>
      </CardActionArea>
      {warning}
    </Card>
  );
};

export default withStyles(styles)(GroupBuyCard);
