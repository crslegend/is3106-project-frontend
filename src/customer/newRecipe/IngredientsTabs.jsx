import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles, fade } from "@material-ui/core/styles";
import {
  AppBar,
  Box,
  Container,
  Grid,
  Tab,
  Tabs,
  CircularProgress,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchBar from "material-ui-search-bar";
import ItemListingCard from "./ItemListingCard";
import ntuc from "./getListing";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
          <Box>{children}</Box>
        </Container>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    margin: "auto",
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    maxWidth: 345,
  },
  quantitySelector: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  separator: {
    height: 4,
    width: "100%",
    display: "block",
    margin: `${theme.spacing(1)}px auto 0`,
    backgroundColor: "#77625C",
    // backgroundColor: theme.palette.secondary.main,
  },
  progress: {
    marginTop: "200px",
    marginBottom: "200px",
    display: "block",
    margin: "auto",
  },
  noResults: {
    marginTop: "200px",
    marginBottom: "150px",
    display: "block",
    margin: "auto",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxHeight: 50,
  },
  tabText: {
    color: "#ffffff",
  },
  appBar: {
    // backgroundColor: theme.palette.secondary.dark,
    backgroundColor: "#77625C",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "85%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
});

const IngredientsTabs = (props) => {
  const {
    classes,
    updateIngredients,
    chosenIngredients,
    calculateTotalPrice,
  } = props;
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState();
  const [hasMore, setHasMore] = useState(true);
  const [products, setProducts] = useState([]);
  const [sortMethod, setSortMethod] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const getSearchResults = () => {
    if (searchValue === "") {
      return;
    }

    let listing = null;
    setProducts([]);
    setHasMore(true);
    setValue(9); // to navigate to the search results tab
    const results = async () => {
      listing = await ntuc.getSearchResults(1, searchValue, sortMethod);
      setPage(1 + 1);
      setPaginationInfo(listing.pagination);
      setProducts(listing.product);
    };
    results();
  };

  // for changing between tabs
  useEffect(() => {
    console.log("change");
    if (value !== 9) {
      let listing = null;
      setProducts([]);
      setHasMore(true);
      // setSearchValue("");
      const getItems = async () => {
        setPage(1);
        // console.log(page);
        listing = await ntuc.getListing(1, value, "");
        setPage(1 + 1);
        setSortMethod("");
        setPaginationInfo(listing.pagination);
        setProducts(listing.product);
        console.log(`CHANGE TAB ${sortMethod}`);
      };
      getItems();
    } else if (value === 9 && searchValue === "") {
      setProducts([]);
    } else if (value === 9 && searchValue !== "") {
      getSearchResults();
    }
  }, [value]);
  // console.log(page);

  // for changing sort methods
  useEffect(() => {
    let listing = null;
    setProducts([]);
    setHasMore(true);
    const getItems = async () => {
      setPage(1);
      // console.log(page);
      listing = await ntuc.getListing(1, value, sortMethod);
      setPage(1 + 1);
      setPaginationInfo(listing.pagination);
      setProducts(listing.product);
      console.log(`CHANGE SORT ${sortMethod}`);
    };

    const results = async () => {
      setPage(1);
      listing = await ntuc.getSearchResults(1, searchValue, sortMethod);
      setPage(1 + 1);
      setPaginationInfo(listing.pagination);
      setProducts(listing.product);
      console.log(`CHANGE SORT ${sortMethod}`);
    };

    if (searchValue === "") {
      getItems();
    } else {
      results();
    }
  }, [sortMethod]);

  // for loading more pages of data
  // useEffect(() => {
  //   console.log("load more data");
  //   let listing = null;
  //   const getItems = async () => {
  //     console.log(`USE EFFECT ${page}`);
  //     listing = await ntuc.getListing(page, value, sortMethod);
  //     setPage(page + 1);
  //     setPaginationInfo(listing.pagination);
  //     setProducts(listing.product);
  //     console.log(`LOAD MORE DATA ${sortMethod}`);
  //   };

  //   const results = async () => {
  //     listing = await ntuc.getSearchResults(page, searchValue, sortMethod);
  //     setPage(page + 1);
  //     setPaginationInfo(listing.pagination);
  //     setProducts(listing.product);
  //     console.log(`LOAD MORE DATA ${sortMethod}`);
  //   };

  //   if (searchValue === "") {
  //     getItems();
  //   } else {
  //     results();
  //   }
  // }, []);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const fetchMoreData = () => {
    if (paginationInfo.total_pages && page > paginationInfo.total_pages) {
      setHasMore(false);
      return;
    }

    let listing = null;
    const getItems = async () => {
      console.log(`FETCH MORE ${page}`);
      listing = await ntuc.getListing(page, value, sortMethod);
      setPage(page + 1);
      // console.log(listing);
      setProducts(products.concat(listing.product));
    };

    const results = async () => {
      console.log(`FETCH MORE ${page}`);
      listing = await ntuc.getSearchResults(page, searchValue, sortMethod);
      setPage(page + 1);
      setProducts(products.concat(listing.product));
    };

    if (searchValue === "") {
      getItems();
    } else {
      results();
    }

    // console.log(page);
  };
  console.log(products);

  const handleSortChange = (event) => {
    setSortMethod(event.target.value);
  };

  const tabs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className={classes.root}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Fragment>
          {/* <FuzzySearch
            width="85%"
            placeholder="Search from the Selected Category below"
            list={products}
            keys={["name"]}
            distance={80}
            listWrapperStyle={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            inputWrapperStyle={{
              borderRadius: 10,
            }}
            inputStyle={{ border: 0 }}
            resultsTemplate={(props, state) => {
              return state.results.map((product) => {
                return (
                  <Grid container>
                    <ItemListingCard
                      key={product.id}
                      product={product && product}
                      updateIngredients={updateIngredients}
                      chosenIngredients={chosenIngredients}
                      calculateTotalPrice={calculateTotalPrice}
                    />
                  </Grid>
                );
              });
            }}
          /> */}

          <SearchBar
            style={{
              width: "80%",
              backgroundColor: "#e0e0e0",
            }}
            placeholder="Search for Products"
            value={searchValue}
            onChange={(newValue) => setSearchValue(newValue)}
            onRequestSearch={getSearchResults}
            onCancelSearch={() => setSearchValue("")}
          />
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
        </Fragment>
      </div>

      <div className={classes.separator} />
      <AppBar position="static" classes={{ root: classes.appBar }}>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ style: { backgroundColor: "#ffffff" } }}
          TabScrollButtonProps={{ style: { color: "#ffffff" } }}
          classes={{ root: classes.tabText }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Chicken" />
          <Tab label="Pork" />
          <Tab label="Beef & Lamb" />
          <Tab label="Fish & Seafood" />
          <Tab label="Meatballs" />
          <Tab label="Vegetables" />
          <Tab label="Eggs" />
          <Tab label="Delicatessen" />
          <Tab label="Chilled Food" />
          <Tab label="Search Results" />
        </Tabs>
      </AppBar>

      {tabs.map((tab) => {
        return (
          <TabPanel
            value={value}
            index={tab}
            id={tab.toString()}
            style={{
              height: 500,
              overflow: "auto",
              borderBottom: "2px solid #e8e8e8",
              borderLeft: "2px solid #e8e8e8",
            }}
          >
            <InfiniteScroll
              dataLength={page}
              next={fetchMoreData}
              hasMore={hasMore}
              scrollableTarget={tab.toString()}
              scrollThreshold={0.95}
            >
              <Grid container>
                {products ? (
                  products.length > 0 ? (
                    products.map((product) => (
                      <ItemListingCard
                        key={product.id}
                        product={product && product}
                        updateIngredients={updateIngredients}
                        chosenIngredients={chosenIngredients}
                        calculateTotalPrice={calculateTotalPrice}
                      />
                    ))
                  ) : value === 9 && searchValue === "" ? (
                    <div className={classes.noResults}>
                      <SearchIcon style={{ fontSize: 50 }} color="disabled" />
                      <Typography variant="body1" style={{ fontSize: "18px" }}>
                        No keywords found in searchbar
                      </Typography>
                      <Typography variant="subtitle1">
                        Start searching for products by typing in the searchbar
                      </Typography>
                    </div>
                  ) : (
                    <div className={classes.progress}>
                      <CircularProgress />
                    </div>
                  )
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
            </InfiniteScroll>
          </TabPanel>
        );
      })}
    </div>
  );
};

export default withStyles(styles)(IngredientsTabs);
