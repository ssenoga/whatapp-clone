import React from "react";
import "./styles.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

export default function App() {
  return (
    <div className="App">
      <div className="app__body">
        {/* sidebar */}
        <Sidebar />
        {/* chat body */}
        <Chat />
      </div>
    </div>
  );
}
