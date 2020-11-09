import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { fade } from "@material-ui/core/styles/colorManipulator";
import CardMedia from "@material-ui/core/CardMedia";
import { Link, useParams } from "react-router-dom";
import PaymentForm from "./PaymentForm";
import Service from "../../AxiosService";
import image from "../../assets/login1.jpg";

const styles = (theme) => ({
  root: {
    marginTop: "40px",
    flexGrow: 1,
  },
  icon: {
    background: fade(theme.palette.common.black, 0.6),
    borderRadius: "50px",
    padding: "2px",
    fontSize: "3vw",
    marginLeft: "100px",
    color: fade("#ffffff", 0.8),
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
  title: {
    fontSize: 20,
    fontWeight: 700,
    textAlign: "left",
    paddingBottom: "10px",
    [theme.breakpoints.down("md")]: {
      fontSize: 16,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 12,
    },
  },
  divide: {
    marginBottom: "10px",
    height: "2px",
    backgroundColor: "white",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "5px",
    },
  },
  item2: {
    [theme.breakpoints.down("sm")]: {
      order: 1,
    },
  },
  item1: {
    [theme.breakpoints.down("sm")]: {
      order: 2,
    },
    marginRight: "30px",
  },
  payForm: {
    background: fade("#E6BEAE", 0.5),
    width: "100%",
  },
  media: {
    height: "140px",
    width: "80%",
    margin: "6px 45px 0px",
    objectFit: "cover",
    [theme.breakpoints.down("md")]: {
      margin: "6px 30px 0px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "100px",
      margin: "10px 15px",
    },
  },
  summaryLeft: {
    display: "inline",
    float: "left",
    marginRight: "20px",
    marginLeft: "18px",
    fontSize: "20px",
    [theme.breakpoints.down("md")]: {
      marginRight: "5px",
      marginLeft: "5px",
      fontSize: "15px",
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: "3px",
      marginLeft: "-15px",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "-20px",
      fontSize: "13px",
    },
  },
  summaryRight: {
    display: "inline",
    float: "right",
    marginRight: "10px",
    marginLeft: "15px",
    fontSize: "17px",
    [theme.breakpoints.down("md")]: {
      marginRight: "4px",
      marginLeft: "8px",
      fontSize: "14px",
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: "3px",
      marginLeft: "0px",
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: "0px",
      fontSize: "13px",
    },
  },
  summaryDivide: {
    marginTop: "10px",
    height: "1px",
    width: "95%",
    backgroundColor: "white",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "15px",
      marginLeft: "10px",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "15px",
      marginLeft: "0px",
    },
  },
  side: {
    position: "absolute",
    left: 0,
    right: "78%",
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: `url(${image})`,
    zIndex: -2,
    // backgroundColor: theme.palette.common.black,
    opacity: 0.7,
    // height: "100%",
  },
});

const PaymentBody = (props) => {
  const { classes } = props;
  const [groupbuy, setGroupbuy] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [contact, setContact] = useState("");

  const { id } = useParams();
  // console.log(id);

  const [order, setOrder] = useState({
    gb_id: id,
    order_quantity: quantity,
    contact_number: contact,
  });

  useEffect(() => {
    Service.client.get(`/groupbuys/${id}`).then((res) => {
      setGroupbuy(res.data);
      // console.log(res.data);
    });
  }, []);

  const totalprice = Number(
    quantity * parseFloat(groupbuy.final_price)
  ).toFixed(2);

  const finalamount = Number(
    quantity * parseFloat(groupbuy.final_price) +
      parseFloat(groupbuy.delivery_fee)
  ).toFixed(2);

  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={3}>
          <div className={classes.side} />
          <Link to={`/viewdetails/${id}`}>
            <ArrowBackIcon className={classes.icon} />
          </Link>
        </Grid>
        <Grid item xs={9}>
          <Grid container>
            <Grid item xs={10} md={6} className={classes.item1}>
              <Card className={classes.payForm}>
                <CardContent className={classes.title}>
                  Check Out Details
                </CardContent>
                <Divider classes={{ root: classes.divide }} />
                <PaymentForm
                  quantity={quantity}
                  setQuantity={setQuantity}
                  order={order}
                  setOrder={setOrder}
                  contact={contact}
                  setContact={setContact}
                />
              </Card>
            </Grid>
            <Grid item xs={10} md={4} className={classes.item2}>
              <Card className={classes.payForm}>
                <CardContent className={classes.title}>
                  Group Buy Summary
                </CardContent>
                <Divider classes={{ root: classes.divide }} />
                <Grid container>
                  <Grid item xs={5} md={12}>
                    {groupbuy && groupbuy.recipe.photo_url && (
                      <CardMedia
                        image={groupbuy.recipe.photo_url}
                        className={classes.media}
                        title={groupbuy.recipe.recipe_name}
                      />
                    )}
                  </Grid>
                  <Grid item xs={7} md={12}>
                    <CardContent>
                      <Typography
                        variant="body1"
                        className={classes.summaryLeft}
                        style={{ textTransform: "capitalize" }}
                      >
                        {groupbuy && groupbuy.recipe.recipe_name}
                      </Typography>
                      <Typography
                        variant="body1"
                        className={classes.summaryRight}
                      >
                        ${totalprice}
                      </Typography>
                    </CardContent>
                    <CardContent>
                      <Typography
                        variant="body1"
                        className={classes.summaryLeft}
                        style={{ marginBottom: "10px" }}
                      >
                        Delivery Fee
                      </Typography>
                      <Typography
                        variant="body1"
                        className={classes.summaryRight}
                      >
                        ${groupbuy.delivery_fee}
                      </Typography>
                    </CardContent>
                    <Divider
                      variant="middle"
                      classes={{ root: classes.summaryDivide }}
                    />
                    <CardContent>
                      <Typography
                        variant="body1"
                        className={classes.summaryLeft}
                        style={{ marginBottom: "10px" }}
                      >
                        Total Amount:
                      </Typography>
                      <Typography
                        variant="body1"
                        className={classes.summaryRight}
                      >
                        ${finalamount}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

PaymentBody.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaymentBody);
