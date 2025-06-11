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
import { Provider } from "react-redux";
import store from "./redux/store";
import { HomePage } from "./pages/home/HomePage";
import { Albom } from "./pages/albom/Albom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./mui-theme";
import { createHashRouter } from 'react-router-dom';

const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/albom",
    element: <Albom />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
