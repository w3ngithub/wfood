import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import classes from "./searchbar.module.css";
import { searchedData } from "../../redux/actions/action";

const Search = ({ setHaveSearched, docs }) => {
  const [searchedValue, setSearchedValue] = useState("");

  const dispatch = useDispatch();

  async function fetchData(value, e) {
    e.preventDefault();
    if (searchedValue.trim() !== "" && searchedValue !== "") {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/search?q=${value}`
      );
      const data = await response.json();

      let recipeFromFirebase = docs.filter(
        (doc) => doc.title === searchedValue
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
        className={classes.input}
        onChange={(e) => setSearchedValue(e.target.value)}
      />
      <FaSearch
        className={classes.searchIcon}
        onClick={(e) => {
          fetchData(searchedValue, e);
        }}
      />
    </form>
  );
};

export default Search;
