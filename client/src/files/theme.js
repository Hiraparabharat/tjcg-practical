import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    text: {
      primary: "#787676",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small",
        fullWidth: true,
      },
    },
    MuiDialog: {
      defaultProps: {
        maxWidth: "xs",
      },
      styleOverrides: {
        paper: {
          width: "min(600px, 80%)",
          padding: "1.5rem",
        },
      },
    },
  },
});

export default theme;
