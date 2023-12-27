import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import MobileNotSupport from "./Mobile/MobileNotSupport";
import reportWebVitals from "./reportWebVitals";
import { BrowserView, MobileView } from "react-device-detect";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserView>
      <App />
    </BrowserView>
    <MobileView>
      <MobileNotSupport />
    </MobileView>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
