import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles, fade } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  InputBase,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  header: {
    fontFamily: "Raleway",
    fontWeight: 500,
    lineHeight: 3,
    textTransform: "capitalize",
  },
  cardSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginLeft: 15,
    width: "100%",
    lineHeight: 3.5,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(10),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
});

const GroupBuyBody = (props) => {
  const { classes } = props;

  return (
    <Fragment>
      {/* <Typography className={classes.header} align="center" variant="h4">
        Available Group Buys
      </Typography> */}
      grg4gtg4gt
      <h1>freiiji</h1>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      <Grid container className={classes.root}>
        <Grid item xs={1} />
        <Grid xs={10} container className={classes.cardSection}>
          <Grid item xs={5} md={2}>
            <Card>
              <CardContent>
                <Typography>Word of the day</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={5} md={2}>
            <Card>
              <CardContent>
                <Typography>Word of the day</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={5} md={2}>
            <Card>
              <CardContent>
                <Typography>Word of the day</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={5} md={2}>
            <Card>
              <CardContent>
                <Typography>Word of the day</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Fragment>
  );
};

GroupBuyBody.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupBuyBody);
