import SearchBar from "../SearchBar";
import { FiEdit } from "react-icons/fi";
import React, { useEffect } from "react";
import classes from "./navbar.module.css";
import { IoCloseCircle } from "react-icons/io5";
import { getData } from "../../redux/actions/action";
import { useSelector, useDispatch } from "react-redux";
import { removeFavourite } from "../../redux/actions/action";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const Nav = ({ setSelectedRecipe }) => {
  const dispatch = useDispatch();

  let favouriteList = useSelector((state) => state.favouriteReducer.favourites);

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("ids")));
  }, [favouriteList]);

  async function getSingleRecipe(id) {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );
    const data = await response.json();
    dispatch(getData(data.recipe));
  }

  function removeFromFavourite(id) {
    const localStorageData = JSON.parse(localStorage.getItem("list"));
    let localStorageID = JSON.parse(localStorage.getItem("ids"));

    localStorage.setItem(
      "list",
      JSON.stringify([...localStorageData.filter((f) => f.recipe_id !== id)])
    );

    localStorage.setItem(
      "ids",
      JSON.stringify([...localStorageID.filter((f) => f !== id)])
    );

    dispatch(removeFavourite(id));
  }

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
        <p className={classes.favouriteList}>
          {JSON.parse(localStorage.getItem("list")) === null ||
          JSON.parse(localStorage.getItem("list")).length === 0 ? (
            <AiOutlineHeart className={classes.navIcon} />
          ) : (
            <AiFillHeart className={classes.navIcon} />
          )}
          Favourites
          <div className={classes.notification}>
            {JSON.parse(localStorage.getItem("list"))?.map((fav) => (
              <div
                key={fav.recipe_id}
                className={classes.recipeWrapper}
                onClick={() => {
                  getSingleRecipe(fav.recipe_id);
                  setSelectedRecipe({});
                }}
              >
                <img src={fav.image_url} alt="Food Image" />
                <div>
                  <span style={{ color: "#c73326" }}>{fav.title}</span>
                  <span style={{ color: "grey" }}>{fav.publisher}</span>
                </div>
                <IoCloseCircle
                  className={classes.closeIcon}
                  onClick={() => removeFromFavourite(fav.recipe_id)}
                />
              </div>
            ))}
          </div>
        </p>
      </div>
    </div>
  );
};

export default Nav;
