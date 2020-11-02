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
import GroupBuyCard from "../../components/GroupBuyCard";

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
    background: theme.palette.primary.main,
    borderRadius: "50px",
    padding: "2px",
    fontSize: "3vw",
    marginLeft: "100px",
    color: fade("#48494B", 0.8),
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
    backgroundColor: theme.palette.primary.main,
    color: "black",
    width: 150,
    "&:hover": {
      background: fade(theme.palette.primary.main, 0.8),
      color: "#48494B",
    },
    marginTop: "25px",
    textTransform: "capitalize",
    fontSize: "19px",
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
        computed: {
          recipe_name: (row) => row.recipe.recipe_name,
        },
      });
      setListOfCreatedRecipes(arr);
    } else if (buttonValue === "Z-A") {
      let arr = listOfCreatedRecipes;
      arr = sortArray(arr, {
        by: "recipe_name",
        computed: {
          recipe_name: (row) => row.recipe.recipe_name,
        },
        order: "desc",
      });
      setListOfCreatedRecipes(arr);
    } else if (buttonValue === "PRICE_ASC") {
      let arr = listOfCreatedRecipes;
      arr = sortArray(arr, {
        by: ["estimated_price_start", "estimated_price_end"],
        computed: {
          final_price: (row) => {
            if (row.recipe.final_price === null) {
              return parseFloat(0);
            }
            return parseFloat(row.recipe.final_price);
          },
          estimated_price_start: (row) =>
            parseFloat(row.recipe.estimated_price_start),
          estimated_price_end: (row) =>
            parseFloat(row.recipe.estimated_price_end),
        },
      });
      setListOfCreatedRecipes(arr);
    } else if (buttonValue === "PRICE_DESC") {
      let arr = listOfCreatedRecipes;
      arr = sortArray(arr, {
        by: ["estimated_price_start", "estimated_price_end"],
        order: "desc",
        computed: {
          final_price: (row) => {
            if (row.recipe.final_price === null) {
              return parseFloat(0);
            }
            return parseFloat(row.recipe.final_price);
          },
          estimated_price_start: (row) =>
            parseFloat(row.recipe.estimated_price_start),
          estimated_price_end: (row) =>
            parseFloat(row.recipe.estimated_price_end),
        },
      });
      console.log(arr);
      setListOfCreatedRecipes(arr);
    }
  };

  return (
    <Fragment>
      <Navbar />
      <Grid container justify="center">
        <Grid item xs={2} style={{ marginTop: "30px" }}>
          <Link to="/profile">
            <ArrowBackIcon className={classes.icon} />
          </Link>
          <br />
          <Button
            component="a"
            href="/profile/viewallgroupbuys"
            className={classes.button}
          >
            Entered Groupbuys
          </Button>
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
              }}
            >
              Created Recipes
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
            {listOfCreatedRecipes &&
              listOfCreatedRecipes
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((recipe) => (
                  <div
                    style={{
                      marginRight: "30px",
                    }}
                  >
                    <Grid item xs>
                      <GroupBuyCard
                        key={recipe.gb_id}
                        groupbuyitem={recipe.recipe}
                        groupbuy={recipe}
                      />
                    </Grid>
                  </div>
                ))}
          </Grid>
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
        </Grid>
      </Grid>
    </Fragment>
  );
};

ViewAllRecipes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(ViewAllRecipes));
