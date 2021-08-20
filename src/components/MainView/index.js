import Ingredients from "./Ingredients";
import { BsPeople } from "react-icons/bs";
import classes from "./mainView.module.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AiOutlineClockCircle,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
import { addFavourite, removeFavourite } from "../../redux/actions/action";

import { ToastContainer, toast } from "react-toastify";

const MainView = ({ setFavourite, favourite }) => {
  const dispatch = useDispatch();

  let singleRecipe = useSelector((state) => state.getReducer.singleRecipe);

  const [count, setCount] = useState(2);
  const [increaseOne, setIncreaseOne] = useState(0);
  const [fromLocalStorage, setFromLocalStorage] = useState([]);

  useEffect(() => {
    setFromLocalStorage(JSON.parse(localStorage.getItem("ids")));
  }, [localStorage.getItem("ids")]);

  function addNumber() {
    setCount((prevState) => prevState + 1);
    setIncreaseOne(increaseOne + 0.5);
  }

  function subtractNumber() {
    if (count !== 1) {
      setCount((prevState) => prevState - 1);
      setIncreaseOne(increaseOne - 0.5);
    }
  }

  async function addToFavourite(singleRecipe, id) {
    setFavourite([...favourite, id]);
    if (!singleRecipe.checkMark) {
      let response = await fetch(
        `https://forkify-api.herokuapp.com/api/get?rId=${id}`
      );
      let data = await response.json();

      const localStorageData = JSON.parse(localStorage.getItem("list"));
      const localStorageID = JSON.parse(localStorage.getItem("ids"));

      if (localStorageData) {
        localStorage.setItem(
          "list",
          JSON.stringify([...localStorageData, data.recipe])
        );

        localStorage.setItem("ids", JSON.stringify([...localStorageID, id]));
      } else {
        localStorage.setItem("list", JSON.stringify([data.recipe]));
        localStorage.setItem("ids", JSON.stringify([id]));
      }

      dispatch(addFavourite(data.recipe));
    } else {
      let data = singleRecipe;
      const localStorageData = JSON.parse(localStorage.getItem("list"));
      const localStorageID = JSON.parse(localStorage.getItem("ids"));

      if (localStorageData) {
        localStorage.setItem(
          "list",
          JSON.stringify([...localStorageData, data])
        );

        localStorage.setItem("ids", JSON.stringify([...localStorageID, id]));
      } else {
        localStorage.setItem("list", JSON.stringify([data]));
        localStorage.setItem("ids", JSON.stringify([id]));
      }
      dispatch(addFavourite(data));
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
    <div className={classes.mainViewContainer}>
      <div className={classes.mainViewWrapper}>
        {!singleRecipe.recipe_id ? (
          <div className={classes.empty}>
            Start by searching for a recipe.<br></br> Have FUN!
          </div>
        ) : (
          <>
            <div className={classes.image}>
              <div className={classes.name}>
                <p>{singleRecipe.title}</p>
              </div>
              <img src={singleRecipe.image_url} alt="Food Image" />
            </div>

            <div className={classes.middlePart}>
              <div>
                <div className={classes.time}>
                  <AiOutlineClockCircle className={classes.icon} />
                  <b>{Math.ceil(singleRecipe?.ingredients?.length * 5)}</b>{" "}
                  MINUTES
                </div>
                <div className={classes.servings}>
                  <div className={classes.servings}>
                    <BsPeople className={classes.icon} />
                    <b>{count}</b> SERVINGS
                  </div>
                  <div>
                    <AiOutlineMinusCircle
                      className={classes.iconSign}
                      onClick={() => subtractNumber()}
                    />
                    <AiOutlinePlusCircle
                      className={classes.iconSign}
                      onClick={() => addNumber()}
                    />
                  </div>
                </div>
              </div>
              <div className={classes.favourites}>
                {favourite.indexOf(singleRecipe.recipe_id) != -1 ||
                JSON.parse(localStorage.getItem("ids")).indexOf(
                  singleRecipe.recipe_id
                ) !== -1 ? (
                  <p className={classes.removeOnHover}>
                    Remove from Favourites
                  </p>
                ) : (
                  <p className={classes.showOnHover}>Add To Favourites</p>
                )}

                {favourite.indexOf(singleRecipe.recipe_id) != -1 ||
                fromLocalStorage.indexOf(singleRecipe.recipe_id) !== -1 ? (
                  <AiFillHeart
                    className={classes.heartIcon}
                    onClick={() => removeFromFavourite(singleRecipe.recipe_id)}
                  />
                ) : (
                  <AiOutlineHeart
                    className={classes.heartIcon}
                    onClick={() =>
                      addToFavourite(singleRecipe, singleRecipe.recipe_id)
                    }
                  />
                )}
              </div>
            </div>

            <Ingredients
              singleRecipe={singleRecipe}
              increaseOne={increaseOne}
            />
            <ToastContainer />
          </>
        )}
      </div>
    </div>
  );
};

export default MainView;
