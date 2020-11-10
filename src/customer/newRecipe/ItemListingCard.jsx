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
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chef from "../../assets/placeholder.jpg";
import processData from "./processData";
import { Rating } from "@material-ui/lab";

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
    backgroundColor: theme.palette.primary.secondary,
    "& p": {
      textTransform: "capitalize",
      color: "#ffffff",
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
      foreign_id: product.id,
      ing_name: product.name,
      image_url: product.images ? product.images[0] : Chef,
      category: product.primaryCategory.parentCategory.name,
      selling_price:
        parseFloat(product.storeSpecificData[0].mrp) -
        parseFloat(product.storeSpecificData[0].discount).toFixed(2),
      metadata: {
        "Country of Origin": product.metaData["Country of Origin"],
        "Dietary Attributes": product.metaData["Dietary Attributes"]
          ? product.metaData["Dietary Attributes"]
          : [""],
        amount:
          product.metaData["Unit Of Weight"] &&
          !product.metaData.DisplayUnit.endsWith("per pack)") &&
          !product.metaData["Unit Of Weight"].endsWith("OZ")
            ? product.metaData["Unit Of Weight"]
            : product.metaData.DisplayUnit,
      },
    });
  };

  const setAmount = (amount) => {
    const price = processData.calculatePrice(
      selectedItem.selling_price,
      selectedItem.metadata.amount,
      amount
    );

    if (isNaN(price)) {
      setCost(0);
    } else {
      setCost(price);
    }

    const amountWithUnit =
      amount + processData.addUnitToAmount(selectedItem.metadata.amount);

    setSelectedItem({
      ...selectedItem,
      quantity: amountWithUnit,
      estimated_price: price.toFixed(2),
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

  const inputAdornment = () => {
    if (selectedItem) {
      const unit = processData.addUnitToAmount(selectedItem.metadata.amount);
      return <InputAdornment position="end">{unit}</InputAdornment>;
    }
    return null;
  };

  return (
    <Fragment>
      <Card className={classes.root}>
        {/* <CardActionArea onClick={handleClickOpen} style={{ height: "100%" }}> */}
        <CardMedia
          className={classes.mediaCard}
          image={product && product.images ? product.images[0] : Chef}
        />
        <CardContent className={classes.cardContent}>
          <Typography
            variant="h5"
            style={{
              fontWeight: "bold",
              textTransform: "capitalize",
              fontSize: "15px",
              textAlign: "left",
            }}
          >
            {product && product.name}
          </Typography>
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              // justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Typography variant="body1" style={{ color: "#E55434" }}>
                $
                {product &&
                  (
                    parseFloat(product.storeSpecificData[0].mrp) -
                    parseFloat(product.storeSpecificData[0].discount)
                  ).toFixed(2)}
              </Typography>
              <Typography variant="body2">
                {product &&
                product.metaData["Unit Of Weight"] &&
                product.metaData["Unit Of Weight"] !== "EA" &&
                !product.metaData["Unit Of Weight"].endsWith("S") &&
                !product.metaData["Unit Of Weight"].endsWith("LT") &&
                !product.metaData["Unit Of Weight"].endsWith("OZ") &&
                !product.metaData.DisplayUnit.endsWith("per pack)")
                  ? product.metaData["Unit Of Weight"]
                  : product.metaData.DisplayUnit}
              </Typography>
              <Rating name="read-only" value={4} readOnly size="small" />
            </div>
            <div style={{ marginLeft: "2vw" }}>
              <IconButton
                onClick={handleClickOpen}
                style={{ background: "#E55434", color: "#ffffff" }}
              >
                <AddIcon />
              </IconButton>
            </div>
          </div>
        </CardContent>
        {/* </CardActionArea> */}
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
          <Typography
            variant="body1"
            style={{ fontWeight: "bold", fontSize: "19px" }}
          >
            $
            {(
              parseFloat(product.storeSpecificData[0].mrp) -
              parseFloat(product.storeSpecificData[0].discount)
            ).toFixed(2)}
          </Typography>

          <Typography variant="body1">{product.name}</Typography>
          <Typography variant="body2">
            {product.metaData["Unit Of Weight"] &&
            product.metaData["Unit Of Weight"] !== "EA" &&
            !product.metaData["Unit Of Weight"].endsWith("S") &&
            !product.metaData["Unit Of Weight"].endsWith("LT") &&
            !product.metaData["Unit Of Weight"].endsWith("OZ") &&
            !product.metaData.DisplayUnit.endsWith("per pack)")
              ? product.metaData["Unit Of Weight"]
              : product.metaData.DisplayUnit}
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
              InputProps={{
                endAdornment: inputAdornment(),
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className={classes.button}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={handleAddToRecipe}
              className={classes.button}
              disabled={
                selectedItem &&
                (selectedItem.quantity === undefined ||
                  selectedItem.quantity === "0" ||
                  selectedItem.quantity === "")
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
