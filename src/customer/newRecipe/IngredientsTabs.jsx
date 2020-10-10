import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Box, Container, Grid, Tab, Tabs } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
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

  // for changing between tabs
  useEffect(() => {
    console.log("change");
    let listing = null;
    setProducts([]);
    const getItems = async () => {
      setPage(1);
      // console.log(page);
      listing = await ntuc.getListing(1, value);
      setPage(1 + 1);
      setPaginationInfo(listing.pagination);
      setProducts(listing.product);
      console.log(listing);
    };
    getItems();
  }, [value]);
  console.log(page);

  // for loading more pages of data
  useEffect(() => {
    console.log("load more data");
    let listing = null;
    const getItems = async () => {
      listing = await ntuc.getListing(page, value);
      setPage(page + 1);
      setPaginationInfo(listing.pagination);
      setProducts(listing.product);
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
      listing = await ntuc.getListing(page, value);
      // console.log(listing);
      setProducts(products.concat(listing.product));
    };
    getItems();
    // console.log(page);
  };

  return (
    <div className={classes.root}>
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
            {products &&
              products.map((product) => (
                <ItemListingCard
                  key={product.id}
                  product={product && product}
                  updateIngredients={updateIngredients}
                  chosenIngredients={chosenIngredients}
                  calculateTotalPrice={calculateTotalPrice}
                />
              ))}
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
            {products &&
              products.map((product) => (
                <ItemListingCard
                  key={product.id}
                  product={product && product}
                  updateIngredients={updateIngredients}
                  chosenIngredients={chosenIngredients}
                  calculateTotalPrice={calculateTotalPrice}
                />
              ))}
          </Grid>
        </InfiniteScroll>
      </TabPanel>
      <TabPanel
        value={value}
        index={2}
        id="scrollableDiv"
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
            {products &&
              products.map((product) => (
                <ItemListingCard
                  key={product.id}
                  product={product && product}
                  updateIngredients={updateIngredients}
                  chosenIngredients={chosenIngredients}
                  calculateTotalPrice={calculateTotalPrice}
                />
              ))}
          </Grid>
        </InfiniteScroll>
      </TabPanel>
    </div>
  );
};

export default withStyles(styles)(IngredientsTabs);
