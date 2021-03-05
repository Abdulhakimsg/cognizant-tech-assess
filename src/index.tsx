import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';

import { MuiThemeProvider } from '@material-ui/core/styles';
import themeDark from './theme/themeDark';

ReactDOM.render(
  <MuiThemeProvider theme={themeDark}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>,
  document.getElementById('root'),
);
