import { IoMdAdd } from "react-icons/io";
import React, { useState } from "react";
import classes from "./mobileNav.module.css";
import AddRecipeModal from "../AddRecipeModal";
import { IoCloseCircle } from "react-icons/io5";
import useFirestore from "../../hook/useFirestore";
import Logo from "../../assets/image/wflogomob.png";
import { getData } from "../../redux/actions/action";
import { useSelector, useDispatch } from "react-redux";
import SearchBarMobile from "../SearchBar/SearchBarMobile";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { removeFavourite } from "../../redux/actions/action";

const MobileNav = ({
  setSelectedRecipe,
  setHaveSearched,
  setFavourite,
  favourite,
}) => {
  const dispatch = useDispatch();
  const { docs } = useFirestore("Recipes");
  const [showFav, setShowFav] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
      <div className={classes.mobileNavContainer}>
        <img src={Logo} alt="logo" className={classes.logo} />
        <div className={classes.secondPart}>
          <SearchBarMobile
            {...{ setHaveSearched, docs, showInput, setShowInput, setShowFav }}
          />

          {/* //Add Recipe */}
          <div
            className={classes.addRecipe}
            onClick={() => {
              setShowModal(true);
              setShowInput(false);
            }}
          >
            <IoMdAdd className={classes.navIcon} />
          </div>

          {/* //Favourite List */}
          <div className={classes.favouriteList}>
            {JSON.parse(localStorage.getItem("list")) === null ||
            JSON.parse(localStorage.getItem("list")).length === 0 ? (
              <AiOutlineHeart className={classes.navIcon} />
            ) : (
              <AiFillHeart
                onClick={() => {
                  setShowFav(!showFav);
                  setShowInput(false);
                }}
                className={classes.navIcon}
              />
            )}
            {showFav && (
              <div className={classes.notification}>
                {JSON.parse(localStorage.getItem("list"))?.map((fav) => (
                  <div
                    key={fav.recipe_id}
                    className={classes.recipeWrapper}
                    onClick={() => {
                      getSingleRecipe(fav, fav.recipe_id);
                      setSelectedRecipe({});
                      setShowFav(false);
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
