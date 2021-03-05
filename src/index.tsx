import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';

import { MuiThemeProvider } from '@material-ui/core/styles';
import DefaultTheme from 'theme/DefaultTheme';

ReactDOM.render(
  <MuiThemeProvider theme={DefaultTheme}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>,
  document.getElementById('root'),
);
