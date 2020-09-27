import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Box, Container, Grid, Tab, Tabs } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import ItemListingCard from "./ItemListingCard";
import getListing from "./getListing";

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

  useEffect(() => {
    let listing = null;
    const getItems = async () => {
      listing = await getListing(page);
      console.log(listing);
      setPage(page + 1);
      setPaginationInfo(listing.pagination);
      setProducts(listing.product);
    };
    getItems();
  }, []);

  const handleChange = (event, newValue) => {
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
      listing = await getListing(page);
      // console.log(listing);
      setProducts(products.concat(listing.product));
    };
    getItems();
    // console.log(page);
  };

  // const handleSubmit = () => {
  //   chosenIngredients.push(parseInt(amount, 10));
  //   // console.log(chosenIngredients);
  //   console.log(amount);
  //   updateIngredients([...chosenIngredients]);
  // };

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
          <Tab label="Item Two" />
          <Tab label="Item Three" />
          <Tab label="Item Four" />
          <Tab label="Item Five" />
          <Tab label="Item Six" />
          <Tab label="Item Seven" />
        </Tabs>
      </AppBar>
      <TabPanel
        value={value}
        index={0}
        id="scrollableDiv"
        style={{ height: 500, overflow: "auto" }}
      >
        <Grid container spacing={2}>
          <InfiniteScroll
            dataLength={page}
            next={fetchMoreData}
            hasMore={hasMore}
            scrollableTarget="scrollableDiv"
          >
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
          </InfiniteScroll>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </div>
  );
};

export default withStyles(styles)(IngredientsTabs);
