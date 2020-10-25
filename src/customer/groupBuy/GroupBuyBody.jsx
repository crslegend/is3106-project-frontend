import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";
import SearchBar from "material-ui-search-bar";
import FuzzySearch from "fuzzy-search";
import sortArray from "sort-array";
import GroupBuyCard from "../../components/GroupBuyCard";
import Service from "../../AxiosService";

const styles = (theme) => ({
  root: {
    // flexGrow: 1,
    marginTop: "30px",
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
  formControl: {
    minWidth: 150,
    maxHeight: 50,
    marginTop: "30px",
  },
  noResults: {
    marginTop: "100px",
    display: "block",
    margin: "auto",
  },
});

const GroupBuyBody = (props) => {
  const { classes } = props;
  const [groupbuys, setGroupbuys] = useState([]);
  const itemsPerPage = 3;
  const [page, setPage] = useState(1);
  const [noOfPages, setNumPages] = useState(
    Math.ceil(groupbuys.length / itemsPerPage)
  );
  const [searchValue, setSearchValue] = useState("");
  const [sortMethod, setSortMethod] = useState("");

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    // initially the groupbuys.length = 0 when getting data
    // after data has been gathered, need to reset the num of pages
    setNumPages(Math.ceil(groupbuys.length / itemsPerPage));
  }, [groupbuys.length]);

  useEffect(() => {
    Service.client.get("/orders/all_groupbuys").then((res) => {
      setGroupbuys(res.data.results);
      console.log(res.data.results);
    });
  }, []);

  useEffect(() => {
    if (searchValue === "") {
      Service.client.get("/orders/all_groupbuys").then((res) => {
        setGroupbuys(res.data.results);
        console.log(res.data.results);
      });
    }
  }, [searchValue]);

  const handleSortChange = (event) => {
    const buttonValue = event.target.value;
    setSortMethod(buttonValue);
    if (buttonValue === "" || buttonValue === undefined) {
      Service.client.get("/orders/all_groupbuys").then((res) => {
        setGroupbuys(res.data.results);
      });
    } else if (buttonValue === "A-Z") {
      let arr = groupbuys;
      arr = sortArray(arr, {
        by: "recipe_name",
        computed: {
          recipe_name: (row) => row.recipe.recipe_name,
        },
      });
      console.log(arr);
      setGroupbuys(arr);
    } else if (buttonValue === "Z-A") {
      let arr = groupbuys;
      arr = sortArray(arr, {
        by: "recipe_name",
        computed: {
          recipe_name: (row) => row.recipe.recipe_name,
        },
        order: "desc",
      });
      console.log(arr);
      setGroupbuys(arr);
    } else if (buttonValue === "PRICE_ASC") {
      let arr = groupbuys;
      arr = sortArray(arr, {
        by: "final_price",
      });
      console.log(arr);
      setGroupbuys(arr);
    } else if (buttonValue === "PRICE_DESC") {
      let arr = groupbuys;
      arr = sortArray(arr, {
        by: "final_price",
        order: "desc",
      });
      console.log(arr);
      setGroupbuys(arr);
    }
  };

  const getSearchResults = () => {
    const searcher = new FuzzySearch(groupbuys, ["recipe.recipe_name"]);
    const result = searcher.search(searchValue);
    setGroupbuys(result);
  };

  return (
    <Fragment>
      <Grid container className={classes.root} justify="center">
        <Grid item xs={3}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" style={{ textTransform: "capitalize" }}>
              Available Group Buys
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
        </Grid>

        <Grid item xs={9}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <SearchBar
                style={{
                  width: "70%",
                  backgroundColor: "#e0e0e0",
                }}
                placeholder="Search for Group Buys"
                value={searchValue}
                onChange={(newValue) => setSearchValue(newValue)}
                onRequestSearch={getSearchResults}
                onCancelSearch={() => setSearchValue("")}
              />

              <div style={{ marginLeft: "30px" }}>
                <Pagination
                  count={noOfPages}
                  page={page}
                  onChange={handleChange}
                  defaultPage={1}
                  color="primary"
                  size="medium"
                  showFirstButton
                  showLastButton
                />
              </div>
            </div>
            <Grid container>
              {groupbuys && groupbuys.length > 0 ? (
                groupbuys
                  .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                  .map((groupbuy) => (
                    <div
                      style={{
                        marginRight: "30px",
                      }}
                    >
                      <Grid item xs>
                        <GroupBuyCard
                          key={groupbuy.gb_id}
                          groupbuyitem={groupbuy.recipe}
                          groupbuy={groupbuy}
                        />
                      </Grid>
                    </div>
                  ))
              ) : (
                <div className={classes.noResults}>
                  <SearchIcon style={{ fontSize: 50 }} color="disabled" />
                  <Typography variant="body1" style={{ fontSize: "18px" }}>
                    We could not find anything that matches your search
                  </Typography>
                  <Typography variant="subtitle1">
                    Try searching other keywords
                  </Typography>
                </div>
              )}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

GroupBuyBody.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupBuyBody);
