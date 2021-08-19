import SearchBar from "../SearchBar";
import { FiEdit } from "react-icons/fi";
import React, { useState } from "react";
import classes from "./navbar.module.css";
import AddRecipeModal from "../AddRecipeModal";
import { IoCloseCircle } from "react-icons/io5";
import useFirestore from "../../hook/useFirestore";
import { getData } from "../../redux/actions/action";
import { useSelector, useDispatch } from "react-redux";
import { removeFavourite } from "../../redux/actions/action";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import Image from "../../assets/image/wflogo.png";

const Nav = ({
  setSelectedRecipe,
  setHaveSearched,
  setFavourite,
  favourite,
}) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const { docs } = useFirestore("Recipes");

  let favouriteList = useSelector((state) => state.favouriteReducer.favourites);

  async function getSingleRecipe(favRecipe, id) {
    if (!favRecipe.checkMark) {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/get?rId=${id}`
      );
      const data = await response.json();
      dispatch(getData(data.recipe));
    } else {
      dispatch(getData(favRecipe));
    }
  }

  function removeFromFavourite(id) {
    setFavourite(favourite.filter((f) => f != id));

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
    <>
      {showModal && <AddRecipeModal setShowModal={setShowModal} />}
      <div className={classes.navContainer}>
        <div className={classes.firstPart}>
          <img src={Image} alt="" className={classes.image} />
          <SearchBar {...{ setHaveSearched, docs }} />
        </div>
        <div className={classes.addPart}>
          <p onClick={() => setShowModal(true)}>
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
                    getSingleRecipe(fav, fav.recipe_id);
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
                    onClick={() => {
                      removeFromFavourite(fav.recipe_id);
                    }}
                  />
                </div>
              ))}
            </div>
          </p>
        </div>
      </div>
    </>
  );
};

export default Nav;
