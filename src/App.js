import "./App.css";
import React from "react";
import Nav from "./components/NavBar";
import Sidebar from "./components/SideBar";
import MainView from "./components/MainView";

function App() {
  return (
    <div>
      <Nav />
      <div className="App">
        <Sidebar />
        <MainView />
      </div>
    </div>
  );
}

export default App;
