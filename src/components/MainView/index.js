import React, { useState } from "react";
import { BsPeople } from "react-icons/bs";
import classes from "./mainView.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  AiOutlineClockCircle,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
import { addFavourite, removeFavourite } from "../../redux/actions/action";

const MainView = () => {
  const dispatch = useDispatch();

  let singleRecipe = useSelector((state) => state.getReducer.singleRecipe);

  const [count, setCount] = useState(4);
  // const [favourite, setFavourite] = useState({});
  const [favourite, setFavourite] = useState([]);

  // console.log(Object.keys(favourite), "asdf");
  // const [favouriteRecipes, setFavouriteRecipes] = useState(null);

  function addNumber() {
    setCount((prevState) => prevState + 1);
  }

  function subtractNumber() {
    if (count !== 1) setCount((prevState) => prevState - 1);
  }

  async function addToFavourite(id) {
    // setFavourite({
    //   ...favourite,
    //   [id]: !favourite[id],
    // });

    setFavourite([...favourite, id]);
    let response = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );
    let data = await response.json();

    dispatch(addFavourite(data.recipe));
    console.log(data);
  }

  function removeFromFavourite(id) {
    setFavourite(favourite.filter((f) => f != id));
    dispatch(removeFavourite(id));
    console.log("remove");
  }

  console.log(favourite);

  return (
    <div className={classes.mainViewContainer}>
      <div className={classes.mainViewWrapper}>
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
              <b>{Math.ceil(singleRecipe?.ingredients?.length * 5)}</b> MINUTES
            </div>
            <div className={classes.servings}>
              <div className={classes.servings}>
                <BsPeople className={classes.icon} />
                <b>{count}</b> SERVINGS
              </div>
              <div>
                <AiOutlinePlusCircle
                  className={classes.iconSign}
                  onClick={() => addNumber()}
                />
                <AiOutlineMinusCircle
                  className={classes.iconSign}
                  onClick={() => subtractNumber()}
                />
              </div>
            </div>
          </div>
          <div className={classes.favourites}>
            {favourite[singleRecipe.recipe_id] ? (
              <p className={classes.removeOnHover}>Remove from Favourites</p>
            ) : (
              <p className={classes.showOnHover}>Add To Favourites</p>
            )}

            {favourite.indexOf(singleRecipe.recipe_id) != -1 ? (
              <AiFillHeart
                className={classes.heartIcon}
                onClick={() => removeFromFavourite(singleRecipe.recipe_id)}
              />
            ) : (
              <AiOutlineHeart
                className={classes.heartIcon}
                onClick={() => addToFavourite(singleRecipe.recipe_id)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainView;
