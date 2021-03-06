import React, { useState } from "react";
import PropTypes from "prop-types";
import { DropzoneAreaBase } from "material-ui-dropzone";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    "& p": {
      textTransform: "capitalize",
      textAlign: "center",
      fontSize: "18px",
    },
  },
  popup: {
    backgroundColor: theme.palette.primary.main,
    "& p": {
      textTransform: "none",
      textAlign: "center",
      fontSize: "16px",
    },
  },
  calender: {
    postion: "fixed !important",
    right: "calc(100% - 479px) !important",
  },
  button: {
    "&:hover": {
      backgroundColor: "#EEF1EF",
    },
  },
  dropzoneInvalid: {
    padding: "0 10px",
    minHeight: "200px",
    borderColor: "red",
    "@global": {
      ".MuiDropzoneArea-text.MuiTypography-h5": {
        textTransform: "capitalize",
      },
    },
  },
  dropzoneValid: {
    padding: "0 10px",
    minHeight: "200px",
    "@global": {
      ".MuiDropzoneArea-text.MuiTypography-h5": {
        textTransform: "none",
        fontSize: "16px",
      },
    },
  },
});

const NewRecipeForm = (props) => {
  const getTomorrowDate = () => {
    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);
    return tmr;
  };

  const {
    classes,
    recipeInfo,
    setRecipeInfo,
    open,
    setOpen,
    editMode,
    setDateForDisplay,
    recipePhoto,
    setRecipePhoto,
    validateRecipeNameField,
    setValidateRecipeNameField,
    validatePhoto,
    setValidatePhoto,
  } = props;
  const [selectedDate, setSelectedDate] = useState(getTomorrowDate());
  const [recipeName, setName] = useState("");

  const handleDateChange = (e) => {
    setSelectedDate(e);
  };

  const handleNameChange = (e) => {
    setName(e);
  };

  const formatDate = (date) => {
    if (date !== null) {
      const newDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
      return newDate;
    }
    return null;
  };

  const handleClose = () => {
    setOpen(false);

    setRecipeInfo({
      ...recipeInfo,
      recipe_name: recipeName,
      fulfillment_date: formatDate(selectedDate),
    });
    setDateForDisplay(selectedDate);

    if (recipeName !== "") {
      setValidateRecipeNameField(false);
    }
  };

  const handleSubmit = () => {
    setOpen(false);

    setRecipeInfo({
      ...recipeInfo,
      recipe_name: recipeName,
      fulfillment_date: formatDate(selectedDate),
    });
    setDateForDisplay(selectedDate);

    if (recipeName !== "") {
      setValidateRecipeNameField(false);
    }
  };

  return (
    <div>
      <Dialog
        // disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            minWidth: "400px",
            maxWidth: "400px",
          },
        }}
      >
        <DialogTitle className={classes.popup}>
          <Typography style={{ color: "white" }}>
            Give your recipe a name and a picture!
          </Typography>
        </DialogTitle>
        <form>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Recipe Name"
              type="text"
              placeholder="Grilled Lamb Chop"
              value={recipeName}
              onChange={(e) => handleNameChange(e.target.value)}
              error={validateRecipeNameField}
              helperText={
                validateRecipeNameField ? "Recipe Name Cannot Be Empty" : ""
              }
              fullWidth
            />
          </DialogContent>
          <DialogContent>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="normal"
                format="dd/MM/yyyy"
                margin="normal"
                minDate={getTomorrowDate()}
                label="Choose a Fulfillment Date"
                value={selectedDate}
                onChange={(e) => handleDateChange(e)}
                fullWidth
              />
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogContent>
            <DropzoneAreaBase
              dropzoneClass={
                validatePhoto ? classes.dropzoneInvalid : classes.dropzoneValid
              }
              dropzoneText="&nbsp;Drag and drop an image or click here&nbsp;"
              acceptedFiles={["image/*"]}
              filesLimit={1}
              fileObjects={recipePhoto}
              maxFileSize={5000000}
              onAdd={(newPhoto) => {
                // console.log("onAdd", newPhoto);
                setRecipePhoto([].concat(newPhoto));
                setValidatePhoto(false);
              }}
              onDelete={(deletePhotoObj) => {
                console.log("onDelete", deletePhotoObj);
                setRecipePhoto([]);
              }}
              previewGridProps={{
                item: {
                  xs: "auto",
                },
              }}
            />
          </DialogContent>

          <DialogActions>
            {editMode ? (
              <Button
                className={classes.button}
                onClick={handleSubmit}
                color="primary"
              >
                Update Recipe
              </Button>
            ) : recipeName.length > 0 ? (
              <Button
                className={classes.button}
                onClick={handleSubmit}
                color="primary"
              >
                Create Recipe
              </Button>
            ) : (
              <Button
                className={classes.button}
                onClick={handleClose}
                color="primary"
              >
                Skip For Now
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

NewRecipeForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewRecipeForm);
