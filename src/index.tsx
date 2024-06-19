import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "./reset-user-agent.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Flickering from "./pages/direct-dom-access/Flickering";
import { Provider } from "react-redux";
import store from "./redux/store";
import CurrencyPairs from "./pages/pairs/CurrencyPairs";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const router = createBrowserRouter([
  {
    path: "/flash",
    element: <Flickering />,
  },
  {
    path: "/",
    element: <CurrencyPairs />,
  },
]);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#004447",
    },
    secondary: {
      main: "#00ff4c",
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
