import { createTheme } from "@mui/material";
import { blue, amber, red } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: blue,
    secondary: amber,
    warning: red,

    background: {
      paper: blue[100],
    },
  },
  typography: {
    fontWeightBold: 700,
  },
});
