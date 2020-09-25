import React, { Fragment, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
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
  cardWarning: {
    display: "flex",
    paddingLeft: "15px",
    color: "#ED2939",
    fontFamily: "Raleway",
    fontWeight: 500,
    fontSize: 16,
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  dialog: {
    backgroundColor: theme.palette.primary.main,
    "& h2": {
      textTransform: "capitalize",
      fontSize: 25,
    },
  },
}));

const ItemListingCard = (props) => {
  const classes = styles();
  const { product, updateIngredients, chosenIngredients } = props;
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  // const [amount, setAmount] = useState();

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
    const price =
      (parseFloat(selectedItem.price) /
        parseFloat(selectedItem.amount.replace(/\D/g, ""))) *
      amount;

    setSelectedItem({
      ...selectedItem,
      selectedAmount: amount,
      estimatedPrice: price,
    });
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem();
  };

  const handleAddToRecipe = () => {
    setOpen(false);
    chosenIngredients.push(selectedItem);
    updateIngredients([...chosenIngredients]);
    setSelectedItem();
  };

  console.log(selectedItem);

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
        <DialogTitle className={classes.dialog}>Ingredient name</DialogTitle>
        <form>
          <DialogContent>
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
