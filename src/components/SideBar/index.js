import React from "react";
import { useSelector } from "react-redux";
import classes from "./sidebar.module.css";

const Sidebar = () => {
  let recipes = useSelector((state) => state.recipes);
  console.log(recipes, "asdf");

  return (
    <div className={classes.sidebarContainer}>
      <div className={classes.sidebarWrapper}>
        {recipes.map((recipe) => (
          <div className={classes.recipeWrapper}>
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
