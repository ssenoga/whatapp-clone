import React from "react";
import "./styles.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import { UseStateValue } from "./stateProvider";

export default function App() {
  const [{ user }, dispatch] = UseStateValue();
  return (
    <div className="App">
      {!user ? (
        <h1>
          <Login />
        </h1>
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/room/:id">
                <Chat />
              </Route>
              <Route exact path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}
