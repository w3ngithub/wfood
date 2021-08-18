import React from "react";
import { AiFillCaretRight } from "react-icons/ai";
import classes from "./ingredients.module.css";

const Ingredients = ({ singleRecipe, increaseOne }) => {
  return (
    <div className={classes.ingredientContainer}>
      <div className={classes.ingredientWrapper}>
        <h2>Recipe Ingredients</h2>
        <div className={classes.list}>
          {singleRecipe.ingredients.map((recipe) => {
            let newStringWithoutParenthesis = recipe
              .replace(/\s*\(.*?\)\s*/g, "")
              .replace(/\s*\[.*?\]\s*/g, "")
              .replace(/,/g, " ");

            let number1 = +newStringWithoutParenthesis.replace(
              /[^0-9\/]/g,
              ""
            )[0];

            let number2 = +newStringWithoutParenthesis.replace(
              /[^0-9\/]/g,
              ""
            )[1];

            let dynamicString = null;

            if (!/\d/.test(newStringWithoutParenthesis)) {
              dynamicString = newStringWithoutParenthesis;
            } else if (number2) {
              let remaining = newStringWithoutParenthesis.substr(3);
              dynamicString =
                number1 +
                increaseOne +
                "-" +
                parseInt(number2 + increaseOne) +
                remaining;
            } else {
              let remaining = newStringWithoutParenthesis.substr(1);
              dynamicString = number1 + increaseOne + remaining;
            }

            return (
              <div className={classes.row} key={recipe}>
                <AiFillCaretRight className={classes.circleIcon} />
                <span>{dynamicString}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Ingredients;

//Regex -- str.replace(/[^0-9\/]/g, '')
