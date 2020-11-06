import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import Cookies from "js-cookie";
import Pagination from "@material-ui/lab/Pagination";
import sortArray from "sort-array";
import { fade } from "@material-ui/core/styles/colorManipulator";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import withRoot from "../../constants/withRoot";
import Navbar from "../Navbar";
import Service from "../../AxiosService";
import UserGroupbuyCard from "./UserGroupBuyCard";
import KitchenIcon from "@material-ui/icons/Kitchen";
import image from "../../assets/login6.jpg";

const styles = (theme) => ({
  formControl: {
    minWidth: 150,
    maxHeight: 50,
    justify: "flex-end",
    marginRight: "140px",
  },
  pagination: {
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
      cursor: "pointer",
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
  button: {
    fontWeight: "normal",
    backgroundColor: fade(theme.palette.common.black, 0.6),
    color: "white",
    // width: 150,
    "&:hover": {
      background: fade(theme.palette.primary.main, 0.8),
      color: "#000000",
    },
    marginTop: "25px",
    textTransform: "capitalize",
    fontSize: "19px",
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

const ViewAllGroupbuys = (props) => {
  const { classes } = props;
  const [listOfGroupbuys, setListOfGroupBuys] = useState([]);
  const itemsPerPage = 3;
  const [page, setPage] = useState(1);
  const [noOfPages, setNumPages] = useState(
    Math.ceil(listOfGroupbuys.length / itemsPerPage)
  );
  const [sortMethod, setSortMethod] = useState("");

  const handleChange = (event, value) => {
    setPage(value);
  };

  const getUserData = () => {
    if (Cookies.get("t1") && Cookies.get("t2")) {
      Service.client.get(`/orders`).then((res) => {
        console.log(res);
        setListOfGroupBuys(res.data);
      });
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    // initially the groupbuys.length = 0 when getting data
    // after data has been gathered, need to reset the num of pages
    setNumPages(Math.ceil(listOfGroupbuys.length / itemsPerPage));
  }, [listOfGroupbuys.length]);

  const handleSortChange = (event) => {
    const buttonValue = event.target.value;
    setSortMethod(buttonValue);
    if (buttonValue === "" || buttonValue === undefined) {
      Service.client.get("/orders").then((res) => {
        console.log(res.data);
        setListOfGroupBuys(res.data);
      });
    } else if (buttonValue === "A-Z") {
      let arr = listOfGroupbuys;
      arr = sortArray(arr, {
        by: "recipe_name",
        computed: {
          recipe_name: (row) => row.groupbuy.recipe.recipe_name,
        },
      });
      setListOfGroupBuys(arr);
    } else if (buttonValue === "Z-A") {
      let arr = listOfGroupbuys;
      arr = sortArray(arr, {
        by: "recipe_name",
        computed: {
          recipe_name: (row) => row.groupbuy.recipe.recipe_name,
        },
        order: "desc",
      });
      setListOfGroupBuys(arr);
    } else if (buttonValue === "PRICE_ASC") {
      let arr = listOfGroupbuys;
      arr = sortArray(arr, {
        by: ["price"],
        computed: {
          price: (row) => {
            return parseFloat(row.order_price);
          },
        },
      });
      setListOfGroupBuys(arr);
    } else if (buttonValue === "PRICE_DESC") {
      let arr = listOfGroupbuys;
      arr = sortArray(arr, {
        by: ["price"],
        order: "desc",
        computed: {
          price: (row) => {
            return parseFloat(row.order_price);
          },
        },
      });
      console.log(arr);
      setListOfGroupBuys(arr);
    }
  };

  return (
    <Fragment>
      <Navbar />
      <Grid container justify="center">
        <Grid item xs={3}>
          <div className={classes.side} />
          <div style={{ marginTop: "10vh" }}>
            <Link to="/profile">
              <ArrowBackIcon className={classes.icon} />
            </Link>
            <br />
            <Button
              component="a"
              href="/profile/viewallrecipes"
              className={classes.button}
            >
              created recipes
            </Button>
          </div>
        </Grid>
        <Grid item xs={9} style={{ marginTop: "20px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Typography
              variant="h5"
              style={{
                textTransform: "capitalize",
                marginLeft: "20px",
                fontSize: "30px",
                color: "#5E4955",
              }}
            >
              Your Entered Groupbuys
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>Sort By</InputLabel>
              <Select
                label="Sort By"
                value={sortMethod}
                onChange={handleSortChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="PRICE_ASC">Price: Low to High</MenuItem>
                <MenuItem value="PRICE_DESC">Price: High to Low</MenuItem>
                <MenuItem value="A-Z">(A-Z) Alphabetically</MenuItem>
                <MenuItem value="Z-A">(Z-A) Alphabetically</MenuItem>
              </Select>
            </FormControl>
          </div>

          <Grid container>
            {listOfGroupbuys && listOfGroupbuys.length > 0 ? (
              listOfGroupbuys
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((groupbuy) => (
                  <div
                    style={{
                      marginRight: "30px",
                    }}
                  >
                    <Grid item xs>
                      <UserGroupbuyCard
                        key={groupbuy.groupbuy.gb_id}
                        groupbuyitem={groupbuy.groupbuy.recipe}
                        groupbuy={groupbuy.groupbuy}
                      />
                    </Grid>
                  </div>
                ))
            ) : (
              <div style={{ margin: "auto" }}>
                <KitchenIcon style={{ fontSize: "50px" }} color="disabled" />
                <Typography variant="subtitle1">
                  No Groupbuys Entered Yet
                </Typography>
              </div>
            )}
          </Grid>
          <br />
          {listOfGroupbuys && listOfGroupbuys.length > 0 && (
            <Pagination
              count={noOfPages}
              page={page}
              onChange={handleChange}
              defaultPage={1}
              color="primary"
              size="medium"
              showFirstButton
              showLastButton
              className={classes.pagination}
            />
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

ViewAllGroupbuys.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(ViewAllGroupbuys));
