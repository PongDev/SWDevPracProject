import { createTheme } from "@mui/material";
import { blue, amber } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: blue,
    secondary: amber,

    background: {
      paper: blue[100],
    },
  },
  typography: {
    fontWeightBold: 700,
  },
});
