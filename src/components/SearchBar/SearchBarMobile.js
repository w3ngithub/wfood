import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import classes from "./searchbarMobile.module.css";
import { searchedData } from "../../redux/actions/action";

const SearchBarMobile = ({
  setHaveSearched,
  docs,
  showInput,
  setShowInput,
  setShowFav,
}) => {
  const [searchedValue, setSearchedValue] = useState("");

  const dispatch = useDispatch();
  const inputRef = useRef(null);

  async function fetchData(value, e) {
    e.preventDefault();
    if (searchedValue.trim() !== "" && searchedValue !== "") {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/search?q=${value}`
      );
      const data = await response.json();

      let recipeFromFirebase = docs.filter(
        (doc) => doc.title.toLowerCase() === searchedValue.toLowerCase()
      );

      dispatch(searchedData(data.recipes, recipeFromFirebase));
      setHaveSearched(true);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        fetchData(searchedValue, e);
      }}
      className={classes.searchContainer}
    >
      <input
        type="text"
        placeholder="Search recipes..."
        className={showInput ? classes.input : classes.hideInput}
        onChange={(e) => setSearchedValue(e.target.value)}
        value={searchedValue}
        ref={inputRef}
      />
      {searchedValue ? (
        <IoClose
          onClick={() => setSearchedValue("")}
          className={classes.closeIcon}
        />
      ) : null}
      <FaSearch
        className={showInput ? classes.searchIcon : classes.whiteSearchIcon}
        onClick={() => {
          setShowInput(true);
          inputRef.current.focus();
          setShowFav(false);
        }}
      />
    </form>
  );
};

export default SearchBarMobile;
