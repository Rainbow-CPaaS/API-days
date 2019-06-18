import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import './styles.css';
import Initialize from './initialize';

Initialize();

ReactDOM.render(<App />, document.getElementById("root"));
