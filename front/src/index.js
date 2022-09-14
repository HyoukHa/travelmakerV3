import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./stores/Context";
import { RootStore } from "./stores/RootStore.jsx";

axios.defaults.baseURL = "http://localhost:8080/api";
// axios.defaults.baseURL = "http://192.168.230.54:8080/api";

const rootStore = new RootStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <StoreProvider value={rootStore}>
      <App />
    </StoreProvider>
    {/* </React.StrictMode> */}
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
