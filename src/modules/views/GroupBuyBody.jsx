import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles, fade } from "@material-ui/core/styles";
import { Grid, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";
import GroupBuyCard from "../components/GroupBuyCard";

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
    fontSize: 35,
    fontWeight: 550,
    letterSpacing: 3,
    color: "#2A2B2A",
    padding: theme.spacing(2),
    textAlign: "left",
    [theme.breakpoints.down("md")]: {
      fontSize: 28,
      letterSpacing: 2,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
      padding: theme.spacing(3),
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
      padding: theme.spacing(3),
    },
  },
  cardSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  search: {
    position: "relative",
    margin: 20,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    width: "90%",
    lineHeight: 3,
    [theme.breakpoints.down("sm")]: {
      lineHeight: 2,
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 1),
    },
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
    fontSize: 10,
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      fontSize: 20,
      "&:focus": {
        width: "20ch",
      },
    },
  },
  page: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    display: "flex",
    alignContent: "flex-end",
    float: "right",
    marginRight: "10vw",
    [theme.breakpoints.down("sm")]: {
      size: "small",
    },
  },
});

const GroupBuyBody = (props) => {
  const { classes } = props;
  const itemsPerPage = 4;
  const [page, setPage] = React.useState(1);
  const [noOfPages] = React.useState(Math.ceil(4 / itemsPerPage));

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={1} />
        <Grid item xs={6}>
          <div className={classes.header}>Available Group Buys</div>
        </Grid>
        <Grid item xs={4}>
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
        </Grid>
        <Grid item xs={1} />
      </Grid>
      <Grid container className={classes.root}>
        <Grid item xs={1} />
        <Grid xs={10} container className={classes.cardSection}>
          <Grid item xs={5} md={4} lg={3}>
            <GroupBuyCard />
          </Grid>
          <Grid item xs={5} md={4} lg={3}>
            <GroupBuyCard />
          </Grid>
          <Grid item xs={5} md={4} lg={3}>
            <GroupBuyCard />
          </Grid>
          <Grid item xs={5} md={4} lg={3}>
            <GroupBuyCard />
          </Grid>
        </Grid>
        <Grid item xs={1} />
      </Grid>
      <Grid className={classes.page}>
        <Pagination
          count={noOfPages}
          page={page}
          onChange={handleChange}
          defaultPage={1}
          color="primary"
          size="small"
          showFirstButton
          showLastButton
        />
      </Grid>
    </Fragment>
  );
};

GroupBuyBody.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupBuyBody);
