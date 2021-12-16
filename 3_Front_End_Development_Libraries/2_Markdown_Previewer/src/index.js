import React from "react";
import ReactDOM from "react-dom";
import Markdown from  "./Components/Markdown.jsx"

import text from "./text.js"
import "./index.css";

ReactDOM.render(<Markdown defaultText={text} />, document.querySelector("#root"));