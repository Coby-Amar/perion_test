import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import { Router } from './Router';

const theme = createTheme({});

export const GlobalState = createContext({});

const email = localStorage.getItem('email')

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalState.Provider value={{ email, weatherData: null }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </GlobalState.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
