import classes from "./sidebar.module.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { getData, hideSidebar, showSidebar } from "../../redux/actions/action";

const Sidebar = ({ selectedRecipe, setSelectedRecipe, haveSearched }) => {
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);

  let sidebarDisplay = useSelector((state) => state.sidebarReducer.showSidebar);

  console.log(sidebarDisplay);

  let r = useSelector((state) => state.searchReducer.recipes);
  let rFromFirebase = useSelector(
    (state) => state.searchReducer.recipesFromFirebase
  );

  useEffect(() => {
    r ? setRecipes(r.concat(rFromFirebase)) : setRecipes(rFromFirebase);
  }, [r, rFromFirebase]);

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

  const filterSearch = (e) => {
    let filteredRecipes = r?.filter((recipe) =>
      recipe.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    let filteredRecipesFromFirebase = rFromFirebase?.filter((recipe) =>
      recipe.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    r
      ? setRecipes(filteredRecipes.concat(filteredRecipesFromFirebase))
      : setRecipes(filteredRecipesFromFirebase);
  };

  return (
    <>
      <div
        className={
          haveSearched && sidebarDisplay
            ? classes.sidebarContainer
            : classes.noSidebarContainer
        }
      >
        {haveSearched && (
          <div className={classes.desktopArrow}>
            {sidebarDisplay ? (
              <div
                className={classes.sideBarHideBtn}
                onClick={() => dispatch(hideSidebar())}
              >
                <FiArrowLeft className={classes.arrowIcon} />
              </div>
            ) : (
              <div
                className={classes.sideBarShowBtn}
                onClick={() => dispatch(showSidebar())}
              >
                <FiArrowRight className={classes.arrowIcon} />
              </div>
            )}
          </div>
        )}

        {haveSearched && !sidebarDisplay && (
          <div
            className={classes.sideBarShowBtn}
            onClick={() => dispatch(showSidebar())}
          >
            <FiArrowRight className={classes.arrowIcon} />
          </div>
        )}

        <div className={classes.sidebarWrapper}>
          {(recipes?.length !== undefined && r !== undefined) ||
          (recipes.length !== undefined && rFromFirebase.length !== 0) ? (
            recipes?.length !== 0 || r?.length !== 0 ? (
              <div className={classes.search}>
                <input
                  type="text"
                  placeholder="Search..."
                  className={classes.input}
                  onChange={(e) => filterSearch(e)}
                />

                {haveSearched && sidebarDisplay && (
                  <div
                    className={classes.sideBarHideBtn}
                    onClick={() => dispatch(hideSidebar())}
                  >
                    <FiArrowLeft className={classes.arrowIcon} />
                  </div>
                )}
              </div>
            ) : null
          ) : (
            <>
              {sidebarDisplay && (
                <div
                  className={classes.sideBarHideBtnEmpty}
                  onClick={() => dispatch(hideSidebar())}
                >
                  <FiArrowLeft className={classes.arrowIcon} />
                </div>
              )}
              <div className={classes.empty}>Recipe Not Found!</div>
            </>
          )}
          {recipes ? (
            recipes.length !== 0 ? (
              <>
                <div className={classes.desktopView}>
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
                        <span style={{ color: "#c73326" }}>{recipe.title}</span>
                        <span style={{ color: "grey" }}>
                          {recipe.publisher}
                        </span>
                      </div>
                    </div>
                  ))}
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
                        <span style={{ color: "grey" }}>
                          {recipe.publisher}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : null
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
