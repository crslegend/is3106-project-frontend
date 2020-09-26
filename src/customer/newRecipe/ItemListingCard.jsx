import React, { Fragment, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
// import { fade } from "@material-ui/core/styles/colorManipulator";

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    flexShrink: 1,
    margin: 15,
    width: "19vw",
    [theme.breakpoints.down("md")]: {
      width: "25vw",
    },
    [theme.breakpoints.down("sm")]: {
      margin: 10,
      width: "33vw",
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
    // maxHeight: "50%",
    // maxWidth: "50%",
  },
  cardHeader: {
    fontFamily: theme.typography.fontFamilySecondary,
    textTransform: "uppercase",
    fontWeight: 550,
    fontSize: 22,
    [theme.breakpoints.down("md")]: {
      fontSize: 16,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 10,
    },
  },
  cardBody: {
    fontFamily: "Raleway",
    fontWeight: 500,
    fontSize: 20,
    [theme.breakpoints.down("md")]: {
      fontSize: 16,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 10,
    },
  },
  dialog: {
    backgroundColor: theme.palette.primary.main,
    "& h2": {
      textTransform: "capitalize",
    },
  },
}));

const ItemListingCard = (props) => {
  const classes = styles();
  const {
    product,
    updateIngredients,
    chosenIngredients,
    calculateTotalPrice,
  } = props;
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [cost, setCost] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
    setSelectedItem({
      name: product.name,
      productId: product.id,
      imageURL: product.images[0],
      amount: product.metaData.DisplayUnit,
      price: product.storeSpecificData[0].mrp,
    });
  };

  const setAmount = (amount) => {
    const price = parseFloat(
      (parseFloat(selectedItem.price) /
        parseFloat(selectedItem.amount.replace(/\D/g, ""))) *
        parseFloat(amount)
    );

    if (isNaN(price)) {
      setCost(0);
    } else {
      setCost(price);
    }

    setSelectedItem({
      ...selectedItem,
      selectedAmount: amount,
      estimatedPrice: price.toFixed(2),
    });
  };

  const handleClose = () => {
    setOpen(false);
    setCost(0);
    setSelectedItem();
  };

  const handleAddToRecipe = () => {
    setOpen(false);
    chosenIngredients.push(selectedItem);
    updateIngredients([...chosenIngredients]);
    setCost(0);
    setSelectedItem();
    calculateTotalPrice();
  };

  // console.log(selectedItem);

  return (
    <Fragment>
      <Card className={classes.root}>
        <CardActionArea onClick={handleClickOpen}>
          <CardMedia
            className={classes.media}
            image={product && product.images[0]}
          />
          <CardContent height="150" width="150">
            <Typography className={classes.cardHeader}>
              {product && product.name}
            </Typography>
            <Typography className={classes.cardBody}>
              ${product && product.storeSpecificData[0].mrp}
            </Typography>
            <Typography className={classes.cardBody}>
              {product && product.metaData.DisplayUnit}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className={classes.dialog}>
          <CardMedia
            className={classes.media}
            image={product && product.images[0]}
          />
          {product.name} <br />${product.storeSpecificData[0].mrp}{" "}
          {product.metaData.DisplayUnit}
        </DialogTitle>
        <form>
          <DialogContent>
            <DialogContentText>
              Estimated Cost: ${cost.toFixed(3)}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Amount"
              type="number"
              placeholder="Enter a Number"
              InputProps={{ inputProps: { min: 0 } }}
              required
              onChange={(e) => setAmount(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={handleAddToRecipe}>
              Add To Recipe
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(ItemListingCard);
