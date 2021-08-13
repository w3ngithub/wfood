import React from "react";
import { BsCircle } from "react-icons/bs";
import { AiFillCaretRight } from "react-icons/ai";
import classes from "./ingredients.module.css";

const Ingredients = ({ singleRecipe }) => {
  return (
    <div className={classes.ingredientContainer}>
      <div className={classes.ingredientWrapper}>
        <h2>Recipe Ingredients</h2>
        <div className={classes.list}>
          {singleRecipe.ingredients.map((recipe) => (
            <div className={classes.row}>
              <AiFillCaretRight className={classes.circleIcon} />
              <span>{recipe}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ingredients;
