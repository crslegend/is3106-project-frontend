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
import { fade } from "@material-ui/core/styles/colorManipulator";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import sortArray from "sort-array";
import Navbar from "../Navbar";
import withRoot from "../../constants/withRoot";
import Service from "../../AxiosService";
import UserRecipeCard from "./UserRecipeCard";
import KitchenIcon from "@material-ui/icons/Kitchen";
import image from "../../assets/login10.jpg";

const styles = (theme) => ({
  formControl: {
    minWidth: 150,
    maxHeight: 50,
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
    backgroundColor: fade(theme.palette.primary.main, 0.6),
    color: "#5E4955",
    // width: 150,
    "&:hover": {
      background: fade(theme.palette.primary.main, 0.8),
      color: "#5E4955",
    },
    // marginTop: "25px",
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

const ViewAllRecipes = (props) => {
  const { classes } = props;
  const [listOfCreatedRecipes, setListOfCreatedRecipes] = useState([]);
  const itemsPerPage = 3;
  const [page, setPage] = useState(1);
  const [noOfPages, setNumPages] = useState(
    Math.ceil(listOfCreatedRecipes.length / itemsPerPage)
  );
  const [sortMethod, setSortMethod] = useState("");

  const handleChange = (event, value) => {
    setPage(value);
  };

  const getUserData = () => {
    if (Cookies.get("t1") && Cookies.get("t2")) {
      Service.client.get(`/recipes`).then((res) => {
        // console.log(res);
        setListOfCreatedRecipes(res.data);
      });
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    // initially the length = 0 when getting data
    // after data has been gathered, need to reset the num of pages
    setNumPages(Math.ceil(listOfCreatedRecipes.length / itemsPerPage));
  }, [listOfCreatedRecipes.length]);

  console.log(listOfCreatedRecipes);
  const handleSortChange = (event) => {
    const buttonValue = event.target.value;
    setSortMethod(buttonValue);
    if (buttonValue === "" || buttonValue === undefined) {
      Service.client.get("/recipes").then((res) => {
        setListOfCreatedRecipes(res.data);
      });
    } else if (buttonValue === "A-Z") {
      let arr = listOfCreatedRecipes;
      arr = sortArray(arr, {
        by: "recipe_name",
      });
      setListOfCreatedRecipes(arr);
    } else if (buttonValue === "Z-A") {
      let arr = listOfCreatedRecipes;
      arr = sortArray(arr, {
        by: "recipe_name",
        order: "desc",
      });
      setListOfCreatedRecipes(arr);
    } else if (buttonValue === "PRICE_ASC") {
      let arr = listOfCreatedRecipes;
      arr = sortArray(arr, {
        by: ["estimated_price_start"],
      });
      setListOfCreatedRecipes(arr);
    } else if (buttonValue === "PRICE_DESC") {
      let arr = listOfCreatedRecipes;
      arr = sortArray(arr, {
        by: ["estimated_price_start"],
        order: "desc",
      });
      console.log(arr);
      setListOfCreatedRecipes(arr);
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
              Your Created Recipes
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
            {listOfCreatedRecipes && listOfCreatedRecipes.length > 0 ? (
              listOfCreatedRecipes
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((recipe, index) => (
                  <div
                    style={{
                      marginRight: "30px",
                    }}
                    key={index}
                  >
                    <Grid item xs>
                      <UserRecipeCard key={index} recipe={recipe} />
                    </Grid>
                  </div>
                ))
            ) : (
              <div style={{ margin: "auto" }}>
                <KitchenIcon style={{ fontSize: "50px" }} color="disabled" />
                <Typography variant="subtitle1">
                  No Recipes Created Yet
                </Typography>
              </div>
            )}
          </Grid>
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              component="a"
              href="/profile/viewallgroupbuys"
              className={classes.button}
            >
              Go To Entered Groupbuys
            </Button>
            {listOfCreatedRecipes && listOfCreatedRecipes.length > 0 && (
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
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

ViewAllRecipes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(ViewAllRecipes));
