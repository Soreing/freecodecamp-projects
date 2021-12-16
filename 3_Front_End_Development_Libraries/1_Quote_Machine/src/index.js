import React from "react";
import ReactDOM from "react-dom";
import Quote from  "./Components/Quote.jsx"

import quotes from "./quotes.js";
import "./index.css";

ReactDOM.render(<Quote quotes={quotes} />, document.querySelector("#quote-box"));