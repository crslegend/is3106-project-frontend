import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
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
    "& h2": {
      textTransform: "capitalize",
      fontSize: 25,
    },
  },
  calender: {
    postion: "fixed !important",
    right: "calc(100% - 479px) !important",
  },
});

const NewRecipeForm = (props) => {
  const { classes, setRecipeInfo } = props;
  const [open, setOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [recipeName, setName] = useState("");

  const handleDateChange = (e) => {
    setSelectedDate(e);
  };

  const handleNameChange = (e) => {
    setName(e);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    const updatedInfo = {
      name: recipeName,
      date: selectedDate,
    };

    setRecipeInfo(updatedInfo);
  };

  return (
    <div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className={classes.root}>
          Give your recipe a name!
        </DialogTitle>
        <form>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Recipe Name"
              type="text"
              placeholder="Grilled Lamb Chop"
              required
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
                minDate={new Date()}
                label="Choose a Fulfillment Date"
                value={selectedDate}
                onChange={(e) => handleDateChange(e)}
              />
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

NewRecipeForm.propTypes = {
  classes: PropTypes.object.isRequired,
  setRecipeInfo: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewRecipeForm);
