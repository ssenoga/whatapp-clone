import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { StateProvider } from "./stateProvider";
import { initialState, reducer } from "./redux";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  rootElement
);
