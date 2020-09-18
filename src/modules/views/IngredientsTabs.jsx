import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";

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
  const { classes, updateIngredients, chosenIngredients } = props;
  const [value, setValue] = useState(0);
  const [amount, setAmount] = useState();
  // console.log(amount);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = () => {
    chosenIngredients.push(parseInt(amount, 10));
    // console.log(chosenIngredients);
    console.log(amount);
    updateIngredients([...chosenIngredients]);
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
          <Tab label="Item Two" />
          <Tab label="Item Three" />
          <Tab label="Item Four" />
          <Tab label="Item Five" />
          <Tab label="Item Six" />
          <Tab label="Item Seven" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="span">
              Lizard
            </Typography>
            <div className={classes.quantitySelector}>
              <Typography variant="h6" component="span">
                Quantity
              </Typography>
              <TextField
                variant="outlined"
                margin="dense"
                type="number"
                defaultValue="10"
                InputProps={{ inputProps: { min: 10 } }}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </CardContent>

          <CardActions>
            <Button size="small" color="secondary" onClick={handleSubmit}>
              Add To Recipe List
            </Button>
          </CardActions>
        </Card>
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
