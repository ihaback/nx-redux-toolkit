import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  props: {
    MuiAppBar: {
      position: 'static',
    },
    MuiContainer: {
      maxWidth: 'lg',
    },
    MuiToolbar: {
      disableGutters: true,
    },
    MuiTable: {
      cellPadding: 20,
    },
    MuiTextField: {
      fullWidth: true,
    },
  },
  overrides: {
    MuiList: {
      root: {
        background: 'transparent',
        width: '100%',
      },
    },
    MuiCard: {
      root: {
        width: '100%',
      },
    },
  },
});

export { CssBaseline, ThemeProvider, theme };
