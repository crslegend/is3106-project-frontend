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
import Chef from "../../assets/placeholder.jpg";

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    flexShrink: 1,
    margin: 10,
    width: "13vw",
    [theme.breakpoints.down("md")]: {
      width: "25vw",
    },
    [theme.breakpoints.down("sm")]: {
      margin: 10,
      width: "33vw",
    },
  },
  mediaCard: {
    height: 0,
    paddingTop: "56.25%",
    width: "60%",
    margin: "auto",
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
    "& p": {
      textTransform: "capitalize",
    },
  },
  button: {
    "&:hover": {
      backgroundColor: "#EEF1EF",
    },
  },
  mediaDialog: {
    height: 0,
    paddingTop: "90.25%",
    width: "85%",
    margin: "auto",
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
      imageURL: product.images ? product.images[0] : Chef,
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
            className={classes.mediaCard}
            image={product && product.images ? product.images[0] : Chef}
          />
          <CardContent className={classes.cardContent}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              $
              {product &&
                (
                  parseFloat(product.storeSpecificData[0].mrp) -
                  parseFloat(product.storeSpecificData[0].discount)
                ).toFixed(2)}
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
        PaperProps={{ style: { minWidth: "350px", maxWidth: "350px" } }}
      >
        <DialogTitle className={classes.dialog}>
          <CardMedia
            className={classes.mediaDialog}
            image={product && product.images ? product.images[0] : Chef}
          />
          <br />
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            $
            {(
              parseFloat(product.storeSpecificData[0].mrp) -
              parseFloat(product.storeSpecificData[0].discount)
            ).toFixed(2)}
          </Typography>

          <Typography variant="body1">{product.name}</Typography>
          <Typography variant="body2">
            {product.metaData.DisplayUnit}
          </Typography>
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
            <Button
              onClick={handleClose}
              color="secondary"
              className={classes.button}
            >
              Cancel
            </Button>
            <Button
              color="secondary"
              onClick={handleAddToRecipe}
              className={classes.button}
              disabled={
                selectedItem &&
                (selectedItem.selectedAmount === undefined ||
                  selectedItem.selectedAmount === 0 ||
                  selectedItem.selectedAmount === "")
              }
            >
              Add To Recipe
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(ItemListingCard);
