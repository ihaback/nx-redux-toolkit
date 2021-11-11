import React from 'react';
import { Router } from './components/router/router';
import { CssBaseline, ThemeProvider, theme } from './theme';
import axios from 'axios';

axios.defaults.withCredentials = true;

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}

export default App;
