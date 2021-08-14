import "./App.css";
import Nav from "./components/NavBar";
import Sidebar from "./components/SideBar";
import MainView from "./components/MainView";
import React, { useEffect, useState } from "react";

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState({});

  useEffect(() => {
    const localStorageID = JSON.parse(localStorage.getItem("ids"));
    if (!localStorageID) {
      localStorage.setItem("ids", JSON.stringify([]));
    }
  }, []);

  return (
    <div>
      <Nav {...{ selectedRecipe, setSelectedRecipe }} />
      <div className="App">
        <Sidebar {...{ selectedRecipe, setSelectedRecipe }} />
        <MainView />
      </div>
    </div>
  );
}

export default App;
