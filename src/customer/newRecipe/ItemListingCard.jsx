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
    marginTop: 10,
    marginBottom: 10,
    width: "13vw",
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
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    "& p": {
      textAlign: "left",
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
      amount: product.metaData["Unit Of Weight"]
        ? product.metaData["Unit Of Weight"].replace(/ +/g, "").toLowerCase()
        : product.metaData.DisplayUnit.replace(/ +/g, "").toLowerCase(),
      price: product.storeSpecificData[0].mrp,
    });
  };

  const setAmount = (amount) => {
    let price = 0;
    if (selectedItem.amount.endsWith("kg")) {
      price = parseFloat(
        (parseFloat(selectedItem.price) /
          (parseFloat(selectedItem.amount.replace(/\D/g, "")) * 1000)) *
          parseFloat(amount)
      );
    } else {
      price = parseFloat(
        (parseFloat(selectedItem.price) /
          parseFloat(selectedItem.amount.replace(/\D/g, ""))) *
          parseFloat(amount)
      );
    }

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
        <CardActionArea onClick={handleClickOpen} style={{ height: "100%" }}>
          <CardMedia
            className={classes.media}
            image={product && product.images[0]}
          />
          <CardContent className={classes.cardContent}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              $
              {product &&
                parseFloat(product.storeSpecificData[0].mrp).toFixed(2)}
            </Typography>
            <br />
            <Typography variant="body1">{product && product.name}</Typography>
            <Typography variant="body2">
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
            image={product && product.images && product.images[0]}
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
