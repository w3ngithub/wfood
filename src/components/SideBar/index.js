import React, { useState, useEffect } from "react";
import classes from "./sidebar.module.css";
import { getData, filterData } from "../../redux/actions/action";
import { useSelector, useDispatch } from "react-redux";

const Sidebar = ({ selectedRecipe, setSelectedRecipe }) => {
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);

  let r = useSelector((state) => state.searchReducer.recipes);

  // const [recipes, setRecipes] = useState(
  //   useSelector((state) => state.searchReducer.recipes)
  // );

  useEffect(() => {
    setRecipes(r);
  }, [r]);

  async function getSingleRecipe(id) {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );
    const data = await response.json();
    dispatch(getData(data.recipe));
  }

  function focusBackgroundColor(id) {
    setSelectedRecipe({
      [id]: true,
    });
  }

  console.log("check", selectedRecipe);

  const filterSearch = (e) => {
    let filteredRecipes = r.filter((recipe) =>
      recipe.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setRecipes(filteredRecipes);
    console.log(recipes, "asdf");
  };

  console.log("asdf", recipes);

  return (
    <div className={classes.sidebarContainer}>
      <div className={classes.sidebarWrapper}>
        {recipes !== undefined && r !== undefined ? (
          recipes.length !== 0 || r.length !== 0 ? (
            <div className={classes.search}>
              <input
                type="text"
                placeholder="Search..."
                className={classes.input}
                onChange={(e) => filterSearch(e)}
              />
            </div>
          ) : // <div className={classes.empty}>Recipe Not Found!</div>
          null
        ) : (
          <div className={classes.empty}>Recipe Not Found!</div>
        )}
        {recipes ? (
          recipes.length !== 0 ? (
            <>
              {recipes.map((recipe) => (
                <div
                  key={recipe.recipe_id}
                  className={
                    selectedRecipe[recipe.recipe_id]
                      ? classes.recipeWrapperWithBakcgroundColor
                      : classes.recipeWrapper
                  }
                  onClick={() => {
                    getSingleRecipe(recipe.recipe_id);
                    focusBackgroundColor(recipe.recipe_id);
                  }}
                >
                  <img src={recipe.image_url} alt="Food Image" />
                  <div>
                    <span style={{ color: "#c73326" }}>{recipe.title}</span>
                    <span style={{ color: "grey" }}>{recipe.publisher}</span>
                  </div>
                </div>
              ))}
            </>
          ) : null
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
