import { createMuiTheme } from "@material-ui/core/styles";
import { orange, green, grey, red } from "@material-ui/core/colors";

const rawTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#E55434",
    },
    secondary: {
      main: "#FADDD6",
      light: "#E6BEAE",
      dark: "#8f7054",
    },
    warning: {
      main: orange[500],
      white: "#ffc071",
      dark: "#ffb25e",
    },
    error: {
      xLight: red[50],
      main: red[500],
      dark: red[700],
    },
    success: {
      main: green[500],
      xLight: green[50],
      dark: green[700],
    },
    white: {
      main: "#ffffff",
    },
    cancel: {
      main: "#828282",
    },
  },
  typography: {
<<<<<<< HEAD
    fontFamily: "Sen",
=======
    fontFamily: "Arial",
>>>>>>> 8c1b03a9862c61bf8859f3dbe7b4064993bb0447
    fontSize: 14,
    fontWeightLight: 300, // Work Sans
    fontWeightRegular: 400, // Work Sans
    fontWeightMedium: 300, // SeoulHangang CL
<<<<<<< HEAD
    fontFamilySecondary: "Sen",
=======
    fontFamilySecondary:
      "-apple-system,system-ui,BlinkMacSystemFont," +
      '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
>>>>>>> 8c1b03a9862c61bf8859f3dbe7b4064993bb0447
  },
});

const fontHeader = {
  color: rawTheme.palette.text.primary,
  fontWeight: rawTheme.typography.fontWeightMedium,
  fontFamily: rawTheme.typography.fontFamily,
  textTransform: "uppercase",
};

const fontBody = {
  color: rawTheme.palette.text.primary,
  fontWeight: rawTheme.typography.fontWeightMedium,
  fontFamily: rawTheme.typography.fontFamilySecondary,
};

const theme = {
  ...rawTheme,
  palette: {
    ...rawTheme.palette,
    background: {
      ...rawTheme.palette.background,
      default: rawTheme.palette.common.white,
      placeholder: grey[200],
    },
  },
  typography: {
    ...rawTheme.typography,
    fontHeader,
    fontBody,
    h1: {
      ...rawTheme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 60,
    },
    h2: {
      ...rawTheme.typography.h2,
      ...fontHeader,
      fontSize: 48,
    },
    h3: {
      ...rawTheme.typography.h3,
      ...fontHeader,
      fontSize: 42,
    },
    h4: {
      ...rawTheme.typography.h4,
      ...fontHeader,
      fontSize: 36,
    },
    h5: {
      ...rawTheme.typography.h5,
      ...fontHeader,
      fontSize: 20,
      fontWeight: rawTheme.typography.fontWeightLight,
    },
    h6: {
      ...rawTheme.typography.h6,
      ...fontHeader,
      fontSize: 18,
    },
    subtitle1: {
      ...rawTheme.typography.subtitle1,
      ...fontBody,
      fontSize: 18,
    },
    body1: {
      ...rawTheme.typography.body2,
      ...fontBody,
      fontWeight: rawTheme.typography.fontWeightRegular,
      fontSize: 16,
    },
    body2: {
      ...rawTheme.typography.body1,
      ...fontBody,
      fontSize: 14,
    },
    button: {
      textTransform: "none",
    },
  },
};

export default theme;
