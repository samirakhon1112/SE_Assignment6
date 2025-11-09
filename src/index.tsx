import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

let rootHtmlElem = document.getElementById("root");
let reactAppRoot = createRoot(rootHtmlElem);
reactAppRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
