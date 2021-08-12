import SearchBar from "../SearchBar";
import { FiEdit } from "react-icons/fi";
import React from "react";
import classes from "./navbar.module.css";
import { useSelector } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";

const Nav = () => {
  let data = useSelector((state) => state.favouriteReducer.favourites);

  return (
    <div className={classes.navContainer}>
      <div className={classes.firstPart}>
        <h3>Logo</h3>
        <SearchBar />
      </div>
      <div className={classes.addPart}>
        <p>
          <FiEdit className={classes.navIcon} /> Add Recipe
        </p>
        <p>
          <AiOutlineHeart className={classes.navIcon} /> Favourites
        </p>
      </div>
    </div>
  );
};

export default Nav;
