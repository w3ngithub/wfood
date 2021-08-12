import React from "react";
import classes from "./sidebar.module.css";
import { getData } from "../../redux/actions/action";
import { useSelector, useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();

  let recipes = useSelector((state) => state.searchReducer.recipes);

  async function getSingleRecipe(id) {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );
    const data = await response.json();
    dispatch(getData(data.recipe));
  }

  return (
    <div className={classes.sidebarContainer}>
      <div className={classes.sidebarWrapper}>
        {recipes.map((recipe) => (
          <div
            key={recipe.recipe_id}
            className={classes.recipeWrapper}
            onClick={() => getSingleRecipe(recipe.recipe_id)}
          >
            <img src={recipe.image_url} alt="Food Image" />
            <div>
              <span style={{ color: "#c73326" }}>{recipe.title}</span>
              <span style={{ color: "grey" }}>{recipe.publisher}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
