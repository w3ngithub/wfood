import "./App.css";
import React, { useEffect } from "react";
import Nav from "./components/NavBar";
import Sidebar from "./components/SideBar";
import MainView from "./components/MainView";

function App() {
  useEffect(() => {
    const localStorageID = JSON.parse(localStorage.getItem("ids"));
    if (!localStorageID) {
      localStorage.setItem("ids", JSON.stringify([]));
    }
  }, []);

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
