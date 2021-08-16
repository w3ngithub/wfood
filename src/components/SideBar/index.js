import classes from "./sidebar.module.css";
import React, { useState, useEffect } from "react";
import { getData } from "../../redux/actions/action";
import { useSelector, useDispatch } from "react-redux";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const Sidebar = ({ selectedRecipe, setSelectedRecipe, haveSearched }) => {
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);
  const [sidebarDisplay, setSidebarDisplay] = useState(true);

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

  const filterSearch = (e) => {
    let filteredRecipes = r.filter((recipe) =>
      recipe.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setRecipes(filteredRecipes);
  };

  return (
    <>
      {haveSearched &&
        (sidebarDisplay ? (
          <div
            className={classes.sideBarHideBtn}
            onClick={() => setSidebarDisplay(!sidebarDisplay)}
          >
            <FiArrowLeft className={classes.arrowIcon} />
          </div>
        ) : (
          <div
            className={classes.sideBarShowBtn}
            onClick={() => setSidebarDisplay(!sidebarDisplay)}
          >
            <FiArrowRight className={classes.arrowIcon} />
          </div>
        ))}
      <div
        className={
          haveSearched && sidebarDisplay
            ? classes.sidebarContainer
            : classes.noSidebarContainer
        }
      >
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
            ) : null
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
    </>
  );
};

export default Sidebar;
