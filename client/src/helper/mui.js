import { createMuiTheme, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

export const MuiButton = withStyles({
  root: {
    fontSize: '1rem',
    letterSpacing: 'inherit',
    fontWeight: 'normal',
    textTransform: 'none'
  }
})(Button);

const MuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff6633',
      contrastText: 'white'
    },
  },
  typography: {
    fontFamily: [
      '"Inter"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export default MuiTheme;