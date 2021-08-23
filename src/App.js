import "./App.css";
import Nav from "./components/NavBar";
import Sidebar from "./components/SideBar";
import MainView from "./components/MainView";
import React, { useEffect, useState } from "react";

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [haveSearched, setHaveSearched] = useState(false);
  const [favourite, setFavourite] = useState([]);
  const [showFav, setShowFav] = useState(false);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const localStorageID = JSON.parse(localStorage.getItem("ids"));
    if (!localStorageID) {
      localStorage.setItem("ids", JSON.stringify([]));
    }
  }, []);

  return (
    <div>
      <Nav
        {...{
          favourite,
          setFavourite,
          selectedRecipe,
          setHaveSearched,
          setSelectedRecipe,
          showInput,
          setShowInput,
          showFav,
          setShowFav,
        }}
      />
      <div className="App">
        <Sidebar
          {...{
            haveSearched,
            selectedRecipe,
            setSelectedRecipe,
            setShowFav,
            setShowInput,
          }}
        />
        <MainView {...{ favourite, setFavourite, setShowFav, setShowInput }} />
      </div>
    </div>
  );
}

export default App;
