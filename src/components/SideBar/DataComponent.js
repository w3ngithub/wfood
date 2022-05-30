import React from "react";
import classes from "./sidebar.module.css";
import { getData } from "../../redux/actions/action";
import { hideSidebar } from "../../redux/actions/action";

import { LazyLoadComponent } from "react-lazy-load-image-component";

const DataComponent = ({
  recipes,
  dispatch,
  selectedRecipe,
  setSelectedRecipe,
}) => {
  async function getSingleRecipe(recipe, id) {
    if (!recipe.checkMark) {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/get?rId=${id}`
      );
      const data = await response.json();
      dispatch(getData(data.recipe));
    } else {
      dispatch(getData(recipe));
    }
  }

  function focusBackgroundColor(id) {
    setSelectedRecipe({
      [id]: true,
    });
  }

  console.log(recipes);

  return (
    <>
      <div className={classes.desktopView}>
        <LazyLoadComponent>
          {recipes.map((recipe) => (
            <div
              key={recipe.recipe_id}
              className={
                selectedRecipe[recipe.recipe_id]
                  ? classes.recipeWrapperWithBakcgroundColor
                  : classes.recipeWrapper
              }
              onClick={() => {
                getSingleRecipe(recipe, recipe.recipe_id);
                focusBackgroundColor(recipe.recipe_id);
              }}
            >
              <img src={recipe.image_url} alt="Food Image" />
              <div>
                <span style={{ color: "#1f80d4" }}>{recipe.title}</span>
                <span style={{ color: "grey" }}>{recipe.publisher}</span>
              </div>
            </div>
          ))}
        </LazyLoadComponent>
      </div>
      <div className={classes.mobileView}>
        {recipes.map((recipe) => (
          <div
            key={recipe.recipe_id}
            className={
              selectedRecipe[recipe.recipe_id]
                ? classes.recipeWrapperWithBakcgroundColor
                : classes.recipeWrapper
            }
            onClick={() => {
              getSingleRecipe(recipe, recipe.recipe_id);
              focusBackgroundColor(recipe.recipe_id);
              dispatch(hideSidebar());
            }}
          >
            <img src={recipe.image_url} alt="Food Image" />
            <div>
              <span style={{ color: "#c73326" }}>{recipe.title}</span>
              <span style={{ color: "grey" }}>{recipe.publisher}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DataComponent;
