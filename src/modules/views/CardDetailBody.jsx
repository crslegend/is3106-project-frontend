import React, { Fragment } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Grid, ListItemText, Card } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import image from "../../assets/lamb.jpg";

const styles = makeStyles((theme) => ({
  root: {
    marginTop: "40px",
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(0, 2),
    height: "60vh",
    variant: "outlined",
    textAlign: "center",
    background: fade("#E6BEAE", 0.5),
    [theme.breakpoints.down("sm")]: {
      height: "80vh",
    },
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
    height: "50vh",
    width: "100%",
    margin: " 0px 30px",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      height: "30vh",
      margin: " 0px 10px",
      width: "95%",
    },
  },
  cardHeader: {
    fontFamily: theme.typography.fontFamilySecondary,
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
  cardDescription: {
    textAlign: "left",
    paddingLeft: "30px",
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0px",
    },
  },
  progressHeader: {
    fontFamily: "Raleway",
    fontWeight: 500,
    fontSize: 16,
    textAlign: "left",
    paddingLeft: "30px",
    marginBottom: "0px",
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
      paddingLeft: "0px",
    },
  },

  progressLabel: {
    position: "absolute",
    bottom: "1px",
    left: "40px",
    [theme.breakpoints.down("sm")]: {
      bottom: "-1px",
      left: "10px",
    },
  },
  progressTotalLabel: {
    position: "absolute",
    bottom: "1px",
    width: "42%",
    [theme.breakpoints.down("sm")]: {
      width: "72%",
      bottom: "-1px",
    },
  },
  buyButton: {
    backgroundColor: fade(theme.palette.primary.main, 0.7),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.9),
    },
    padding: 10,
    margin: 15,
    borderRadius: 50,
    float: "right",
    textTransform: "none",
    fontFamily: "Raleway",
    color: "#5E4955",
    fontSize: 20,
    [theme.breakpoints.down("md")]: {
      fontSize: 16,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 10,
      padding: 8,
      marginTop: 10,
    },
  },
  iconGroupBuy: {
    marginRight: "10px",
    paddingLeft: "5px",
    width: "30px",
    height: "30px",
    [theme.breakpoints.down("sm")]: {
      marginRight: "7px",
      width: "20px",
      height: "20px",
    },
  },
}));

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 25,
    width: "70%",
    borderRadius: 10,
    marginLeft: "30px",
    marginTop: "0px",
    [theme.breakpoints.down("sm")]: {
      height: 20,
      width: "90%",
      marginLeft: "0px",
    },
  },

  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 10,
    backgroundColor: "#E19576",
  },
}))(LinearProgress);

const CardDetailBody = () => {
  const classes = styles();

  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={2}>
          <ArrowBackIcon
            onClick={() => {
              window.location.href = "groupbuy";
            }}
            className={classes.icon}
          />
        </Grid>
        <Grid xs={9}>
          <Card className={classes.card}>
            <Grid container className={classes.root}>
              <Grid xs={12} md={5}>
                <CardMedia
                  className={classes.media}
                  image={image}
                  title="Grilled Lamb Chop"
                />
              </Grid>
              <Grid xs={12} md={7}>
                <CardContent height="150" width="150">
                  <Typography className={classes.cardHeader}>
                    Grilled Lamb Chop
                  </Typography>
                  <Typography className={classes.cardBody}>$12.99</Typography>
                  <p className={classes.progressHeader}>Order Fulfillment</p>
                  <div style={{ position: "relative" }}>
                    <BorderLinearProgress
                      className={classes.root}
                      variant="determinate"
                      color="secondary"
                      value={50}
                    />
                    <span className={classes.progressLabel}>10</span>
                    <span className={classes.progressTotalLabel}>20</span>
                  </div>
                  <Typography
                    style={{ marginTop: "10px" }}
                    className={classes.cardBody}
                  >
                    Short Description
                  </Typography>
                  <Typography className={classes.cardDescription}>
                    Really cute mehmeh before it got slaughtered. Now its
                    delicious!
                  </Typography>
                  <Typography
                    style={{ marginTop: "10px" }}
                    className={classes.cardBody}
                  >
                    Ingredient List
                  </Typography>
                  <ListItemText>
                    <Typography className={classes.cardDescription}>
                      1 large garlic cloves
                    </Typography>
                    <Typography className={classes.cardDescription}>
                      1/2 tablespoon fresh rosemary leaves
                    </Typography>
                    <Typography className={classes.cardDescription}>
                      1/2 teaspoon fresh thyme leaves
                    </Typography>
                    <Typography className={classes.cardDescription}>
                      2 lamb chops, about 3/4-inch thick
                    </Typography>
                  </ListItemText>
                  <Typography
                    style={{ marginTop: "10px", fontWeight: "700" }}
                    className={classes.progressHeader}
                  >
                    Fulfillment Date: 10 Dec 2020
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
          <Button className={classes.buyButton}>
            <ShoppingCartIcon className={classes.iconGroupBuy} />
            Enter Group Buy
          </Button>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Fragment>
  );
};

export default withStyles(styles)(CardDetailBody);
