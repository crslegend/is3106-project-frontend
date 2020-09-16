import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Button from "@material-ui/core/Button";

import image from "../../assets/lamb.jpg";

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    flexShrink: 1,
    margin: 15,
    width: "18vw",
    [theme.breakpoints.down("md")]: {
      width: "25vw",
    },
    [theme.breakpoints.down("sm")]: {
      margin: 10,
      width: "33vw",
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
      fontSize: 14,
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
      fontSize: 16,
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
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  cardButton: {
    backgroundColor: fade(theme.palette.primary.main, 0.5),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.8),
    },
    padding: 10,
    margin: 7,
    textTransform: "none",
    fontFamily: "Raleway",
    color: "#5E4955",
    fontSize: 20,
    [theme.breakpoints.down("md")]: {
      fontSize: 16,
      padding: 7,
      margin: 5,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 10,
      padding: 3,
      margin: 2,
    },
  },
}));

const GroupBuyCard = () => {
  const classes = styles();

  return (
    <Card className={classes.root}>
      <CardActionArea href="/viewdetails">
        <CardMedia
          className={classes.media}
          image={image}
          title="Grilled Lamb Chop"
        />
        <CardContent height="150" width="150">
          <Typography className={classes.cardHeader}>
            Grilled Lamb Chop
          </Typography>
          <Typography className={classes.cardBody}>$12.99</Typography>
          <Button className={classes.cardButton} href="/viewdetails">
            View Details
          </Button>
        </CardContent>
        <Typography className={classes.cardWarning}>Selling Fast!</Typography>
      </CardActionArea>
    </Card>
  );
};

export default withStyles(styles)(GroupBuyCard);
