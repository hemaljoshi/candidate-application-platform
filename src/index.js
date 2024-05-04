import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const THEME = createTheme({
  typography: {
    "fontFamily": `"Lexend", "Helvetica", "Arial", sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={THEME}>
      <App />
      </ThemeProvider>
    </Provider>,
  </React.StrictMode>
);
