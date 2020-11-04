import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const styles = makeStyles((theme) => ({}));

const UserRecipeCard = (props) => {
  const classes = styles();
  return <Card></Card>;
};

export default withStyles(styles)(UserRecipeCard);
