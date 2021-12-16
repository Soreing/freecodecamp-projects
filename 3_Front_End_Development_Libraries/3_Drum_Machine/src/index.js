import React from "react";
import ReactDOM from "react-dom";
import App from  "./Components/App.jsx"

import keys from "./keys.js";
import "./index.css";

ReactDOM.render(<App keys={keys} />, document.querySelector("#root"));