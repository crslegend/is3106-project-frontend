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
import { Link, useParams, useHistory } from "react-router-dom";
import moment from "moment";
import Cookies from "js-cookie";
import Service from "../../AxiosService";

const styles = makeStyles((theme) => ({
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
    height: "350px",
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
      fontSize: 13,
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
  const [groupbuy, setGroupbuy] = useState("");
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    Service.client.get(`/groupbuys/${id}`).then((res) => {
      setGroupbuy(res.data);
      console.log(res.data);
    });
  }, []);

  // react router dom history hooks
  const history = useHistory();

  const handleRedirect = () => {
    // to check if user is logged in from cookies
    if (!Cookies.get("t1") && !Cookies.get("t2")) {
      // direct user to login/register page
      history.push({
        pathname: "/auth",
        state: { gbid: id },
      });
      console.log("not logged in");
    } else {
      // if user is logged in, direct to the groupbuy payment page
      history.push(`/payment/${id}`);
      console.log("logged in");
    }
  };

  // Set progress bar status
  let fulfillment =
    (groupbuy.current_order_quantity / groupbuy.minimum_order_quantity) * 100;

  if (fulfillment >= 100) {
    fulfillment = 100;
  } else if (
    fulfillment == null ||
    groupbuy.minimum_order_quantity === undefined
  ) {
    fulfillment = 0;
  }

  // Format fulfillment date
  let fulfillmentdate = groupbuy.fulfillment_date;
  fulfillmentdate = moment().format("DD-MMM-YYYY");

  let orderstatus;
  if (groupbuy.approval_status === false) {
    orderstatus = (
      <Typography className={classes.upcoming}>
        This order is currently under processing.
      </Typography>
    );
  }

  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={2}>
          <Link to="/groupbuy">
            <ArrowBackIcon className={classes.icon} />
          </Link>
        </Grid>
        <Grid xs={9}>
          <Card className={classes.card}>
            <Grid container className={classes.root}>
              <Grid xs={12} md={5}>
                <CardMedia
                  className={classes.media}
                  image={groupbuy && groupbuy.recipe.photo_url}
                  title={groupbuy && groupbuy.recipe.recipe_name}
                />
              </Grid>
              <Grid xs={12} md={7}>
                <CardContent height="150" width="150">
                  <Typography className={classes.cardHeader}>
                    {groupbuy && groupbuy.recipe.recipe_name}
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
                  <p className={classes.progressHeader}>Order Fulfillment</p>
                  <div style={{ position: "relative" }}>
                    <BorderLinearProgress
                      className={classes.root}
                      variant="determinate"
                      color="secondary"
                      value={fulfillment}
                    />
                    <span className={classes.progressLabel}>
                      current orders: {groupbuy.current_order_quantity}
                    </span>
                    <span className={classes.progressTotalLabel}>
                      {groupbuy.minimum_order_quantity}
                    </span>
                  </div>
                  <Typography
                    style={{ marginTop: "10px" }}
                    className={classes.cardBody}
                  >
                    Ingredient List
                  </Typography>
                  {groupbuy &&
                    groupbuy.recipe.ingredients.map((ingredient) => (
                      <Typography className={classes.ing}>
                        {ingredient.ing_name} , {ingredient.quantity}
                      </Typography>
                    ))}
                  <Typography
                    style={{ marginTop: "10px", fontWeight: "700" }}
                    className={classes.progressHeader}
                  >
                    Fulfillment Date: {fulfillmentdate}
                  </Typography>
                  {orderstatus}
                </CardContent>
              </Grid>
            </Grid>
          </Card>
          <Button
            className={classes.buyButton}
            onClick={handleRedirect}
            disabled={!groupbuy.approval_status}
          >
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
