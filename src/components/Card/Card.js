import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

import { blackColor, whiteColor, hexToRgb } from "../materialdashboardreact.js";

const styles = {
  card: {
    border: "0",
    marginBottom: "30px",
    marginTop: "30px",
    borderRadius: "6px",
    color: "rgba(" + hexToRgb(blackColor) + ", 0.87)",
    background: "#fcfcfc",
    width: "100%",
    boxShadow: "0 1px 4px 0 rgba(" + hexToRgb(blackColor) + ", 0.14)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minWidth: "0",
    wordWrap: "break-word",
    fontSize: ".875rem",
  },
  cardPlain: {
    background: "transparent",
    boxShadow: "none",
  },
  cardProfile: {
    marginTop: "30px",
    textAlign: "center",
  },
  cardChart: {
    "& p": {
      marginTop: "0px",
      paddingTop: "0px",
    },
  },
};

const useStyles = makeStyles(styles);

export default function Card(props) {
  const classes = useStyles();
  const { className, children, plain, profile, chart, ...rest } = props;
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile,
    [classes.cardChart]: chart,
    [className]: className !== undefined,
  });
  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  chart: PropTypes.bool,
  children: PropTypes.node,
};
