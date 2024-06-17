import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./reset-user-agent.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Flickering from "./pages/direct-dom-access/Flickering";
import { Provider } from "react-redux";
import store from './store'
import CurrencyPairs from "./pages/pairs/CurrencyPairs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Flickering />,
  },
  {
    path: "/pairs",
    element: <CurrencyPairs />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
