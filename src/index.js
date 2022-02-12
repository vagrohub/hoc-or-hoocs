import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { todos } from "./data";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App list={todos} />
  </StrictMode>,
  rootElement
);
