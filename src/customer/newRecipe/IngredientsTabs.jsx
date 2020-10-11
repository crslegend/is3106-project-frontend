import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
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
} from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import FuzzySearch from "react-fuzzy";
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
    backgroundColor: theme.palette.secondary.main,
  },
  progress: {
    marginTop: "200px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxHeight: 50,
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

  // for changing between tabs
  useEffect(() => {
    console.log("change");
    let listing = null;
    setProducts([]);
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
  }, [value]);
  // console.log(page);

  // for changing sort methods
  useEffect(() => {
    let listing = null;
    setProducts([]);
    const getItems = async () => {
      setPage(1);
      // console.log(page);
      listing = await ntuc.getListing(1, value, sortMethod);
      setPage(1 + 1);
      setPaginationInfo(listing.pagination);
      setProducts(listing.product);
      console.log(`CHANGE SORT ${sortMethod}`);
    };
    getItems();
  }, [sortMethod]);

  // for loading more pages of data
  useEffect(() => {
    console.log("load more data");
    let listing = null;
    const getItems = async () => {
      listing = await ntuc.getListing(page, value, sortMethod);
      setPage(page + 1);
      setPaginationInfo(listing.pagination);
      setProducts(listing.product);
      console.log(`LOAD MORE DATA ${sortMethod}`);
    };
    getItems();
  }, []);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const fetchMoreData = () => {
    setPage(page + 1);
    if (page > paginationInfo.total_pages) {
      setHasMore(false);
      return;
    }

    let listing = null;
    const getItems = async () => {
      listing = await ntuc.getListing(page, value, sortMethod);
      // console.log(listing);
      setProducts(products.concat(listing.product));
    };
    getItems();
    // console.log(page);
  };
  // console.log(products);

  const handleSortChange = (event) => {
    setSortMethod(event.target.value);
  };

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
          <FuzzySearch
            width="85%"
            placeholder="Search from the Selected Category below"
            list={products}
            keys={["name"]}
            listWrapperStyle={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            inputWrapperStyle={{
              borderRadius: 10,
            }}
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
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Meat and Seafood" />
          <Tab label="Vegetables" />
          <Tab label="Dairy, Chilled and Eggs" />
          <Tab label="example" />
        </Tabs>
      </AppBar>
      <TabPanel
        value={value}
        index={0}
        id="scrollableDiv"
        style={{ height: 500, overflow: "auto" }}
      >
        <InfiniteScroll
          dataLength={page}
          next={fetchMoreData}
          hasMore={hasMore}
          scrollableTarget="scrollableDiv"
          scrollThreshold={0.95}
        >
          <Grid container justify="space-around">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ItemListingCard
                  key={product.id}
                  product={product && product}
                  updateIngredients={updateIngredients}
                  chosenIngredients={chosenIngredients}
                  calculateTotalPrice={calculateTotalPrice}
                />
              ))
            ) : (
              <div className={classes.progress}>
                <CircularProgress />
              </div>
            )}
          </Grid>
        </InfiniteScroll>
      </TabPanel>
      <TabPanel
        value={value}
        index={1}
        id="scrollableDiv1"
        style={{ height: 500, overflow: "auto" }}
      >
        <InfiniteScroll
          dataLength={page}
          next={fetchMoreData}
          hasMore={hasMore}
          scrollableTarget="scrollableDiv1"
          scrollThreshold={0.95}
        >
          <Grid container justify="space-around">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ItemListingCard
                  key={product.id}
                  product={product && product}
                  updateIngredients={updateIngredients}
                  chosenIngredients={chosenIngredients}
                  calculateTotalPrice={calculateTotalPrice}
                />
              ))
            ) : (
              <div className={classes.progress}>
                <CircularProgress />
              </div>
            )}
          </Grid>
        </InfiniteScroll>
      </TabPanel>
      <TabPanel
        value={value}
        index={2}
        id="scrollableDiv2"
        style={{ height: 500, overflow: "auto" }}
      >
        <InfiniteScroll
          dataLength={page}
          next={fetchMoreData}
          hasMore={hasMore}
          scrollableTarget="scrollableDiv2"
          scrollThreshold={0.95}
        >
          <Grid container justify="space-around">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ItemListingCard
                  key={product.id}
                  product={product && product}
                  updateIngredients={updateIngredients}
                  chosenIngredients={chosenIngredients}
                  calculateTotalPrice={calculateTotalPrice}
                />
              ))
            ) : (
              <div className={classes.progress}>
                <CircularProgress />
              </div>
            )}
          </Grid>
        </InfiniteScroll>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      </TabPanel>
    </div>
  );
};

export default withStyles(styles)(IngredientsTabs);
