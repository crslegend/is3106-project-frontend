import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Button from "@material-ui/core/Button";
import { Link, useLocation } from "react-router-dom";

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
    fontWeight: 600,
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
    fontWeight: 450,
    fontSize: 14,
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

const UserGroupBuyCard = (props) => {
  const classes = styles();
  const { groupbuyitem, groupbuy } = props;

  let warning;

  const orderamount =
    groupbuy &&
    (groupbuy.current_order_quantity / groupbuy.minimum_order_quantity) * 100;

  if ((groupbuy && groupbuy.approval_status) === false) {
    warning = (
      <Typography className={classes.cardUpcoming}>Upcoming!</Typography>
    );
  } else if (orderamount >= 80 && orderamount < 100) {
    warning = (
      <Typography className={classes.cardWarning}>Selling Fast!</Typography>
    );
  } else if (orderamount >= 100) {
    warning = (
      <Typography className={classes.cardWarning}>Quantity Reached!</Typography>
    );
  } else {
    warning = <Typography className={classes.cardOngoing}>Ongoing</Typography>;
  }

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={groupbuyitem && groupbuyitem.photo_url}
        title={groupbuyitem && groupbuyitem.recipe_name}
      />
      <CardContent height="150" width="150">
        <Typography className={classes.cardHeader}>
          {groupbuyitem && groupbuyitem.recipe_name}
        </Typography>
        {(groupbuy && groupbuy.final_price) !== undefined ? (
          <Typography className={classes.cardBody}>
            ${groupbuy && groupbuy.final_price}
          </Typography>
        ) : (
          <Typography className={classes.cardBody}>
            ${groupbuyitem && groupbuyitem.estimated_price_start} - $
            {groupbuyitem && groupbuyitem.estimated_price_end}
          </Typography>
        )}

        <Button
          color="primary"
          variant="contained"
          size="large"
          component={Link}
          to={`/profile/viewallgroupbuys/${groupbuy && groupbuy.gb_id}`}
        >
          View Details
        </Button>
      </CardContent>
      {warning}
    </Card>
  );
};

export default withStyles(styles)(UserGroupBuyCard);
