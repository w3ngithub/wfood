import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import classes from "./searchbar.module.css";
import { searchedData } from "../../redux/actions/action";

const Search = () => {
  const [searchedValue, setSearchedValue] = useState(null);

  const dispatch = useDispatch();

  async function fetchData(value, e) {
    e.preventDefault();
    if (searchedValue.trim() !== "") {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/search?q=${value}`
      );
      const data = await response.json();
      dispatch(searchedData(data.recipes));
    }
  }

  return (
    <form
      onSubmit={(e) => fetchData(searchedValue, e)}
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
        onClick={(e) => fetchData(searchedValue, e)}
      />
    </form>
  );
};

export default Search;
