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
    "& h5": {
      textTransform: "capitalize",
      textAlign: "center",
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
  dropzone: {
    padding: "0 10px",
    minHeight: "200px",
    width: "220px",
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
  };

  const handleSubmit = () => {
    setOpen(false);

    setRecipeInfo({
      ...recipeInfo,
      recipe_name: recipeName,
      fulfillment_date: formatDate(selectedDate),
    });
    setDateForDisplay(selectedDate);
  };

  return (
    <div>
      <Dialog
        disableBackdropClick
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
        <DialogTitle className={classes.root}>
          <Typography variant="h5">
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
              />
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogContent>
            <DropzoneAreaBase
              dropzoneClass={classes.dropzone}
              dropzoneText="Drag and drop an image or click here (Max 5mb)"
              acceptedFiles={["image/*"]}
              filesLimit={1}
              fileObjects={recipePhoto}
              maxFileSize={5000000}
              onAdd={(newPhoto) => {
                // console.log("onAdd", newPhoto);
                setRecipePhoto([].concat(newPhoto));
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
                color="secondary"
              >
                Update Recipe
              </Button>
            ) : recipeName.length > 0 ? (
              <Button
                className={classes.button}
                onClick={handleSubmit}
                color="secondary"
              >
                Create Recipe
              </Button>
            ) : (
              <Button
                className={classes.button}
                onClick={handleClose}
                color="secondary"
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
