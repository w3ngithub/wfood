import classes from "./sidebar.module.css";
import DataComponent from "./DataComponent.js";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { hideSidebar, showSidebar } from "../../redux/actions/action";

const Sidebar = ({
  selectedRecipe,
  setSelectedRecipe,
  haveSearched,
  setShowInput,
  setShowFav,
}) => {
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);

  let sidebarDisplay = useSelector((state) => state.sidebarReducer.showSidebar);

  let r = useSelector((state) => state.searchReducer.recipes);
  let rFromFirebase = useSelector(
    (state) => state.searchReducer.recipesFromFirebase
  );

  useEffect(() => {
    r ? setRecipes(r.concat(rFromFirebase)) : setRecipes(rFromFirebase);
  }, [r, rFromFirebase]);

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
        onClick={() => {
          setShowInput(false);
          setShowFav(false);
        }}
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
              <DataComponent
                {...{ recipes, selectedRecipe, dispatch, setSelectedRecipe }}
              />
            ) : null
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
