import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import { Card } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Button from "./Button";

import image from "../../assets/lamb.jpg";

const styles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    [theme.breakpoints.down("md")]: {
      maxWidth: 240,
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  button: {
    fontWeight: "normal",
    backgroundColor: fade(theme.palette.primary.main, 0.5),
    color: "#5E4955",
    marginTop: "10px",
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
        <Box borderColor="secondary.main" border={1}>
          <CardContent>
            <Typography gutterbottom variant="h6">
              Grilled Lamb Chop
            </Typography>
            <Typography variant="body1" component="p">
              $12.99
            </Typography>
            <Button className={classes.button} size="small" href="/viewdetails">
              View Details
            </Button>
          </CardContent>
          <Box mr={2} mb={1}>
            <Typography variant="body2" color="error" align="right">
              Selling Fast!
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default withStyles(styles)(GroupBuyCard);
