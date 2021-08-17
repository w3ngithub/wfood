import reducer from "../reducer/index";
import { IoIosClose } from "react-icons/io";
import classes from "./addRecipeModal.module.css";
import React, { useState, useReducer } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { firestore, storage } from "../../firebase/config";

const AddRecipeModal = ({ setShowModal }) => {
  const [foodImage, setFoodImage] = useState(null);
  const [imageError, setImageError] = useState(null);

  // const initialValues = {
  //   title: "",
  //   publisher: "",
  //   preparationTime: "",
  //   servings: 2,
  //   imageUrl: {},
  //   ingredients: [
  //     { id: 1, ingredient: "0.5,kg,rice OR 0.5,,rice " },
  //     { id: 2, ingredient: "" },
  //     { id: 3, ingredient: "" },
  //     { id: 4, ingredient: "" },
  //     { id: 5, ingredient: "" },
  //   ],
  // };

  const initialValues = {
    title: "",
    publisher: "",
    preparationTime: "",
    servings: 2,
    imageUrl: {},
    checkMark: "fromFirebase",
    recipe_id: `${Math.floor(Math.random() * 99999)}`,
    ingredients: ["0.5,kg,rice OR 0.5,,rice ", "", "", "", ""],
  };

  const [state, dispatch] = useReducer(reducer, initialValues);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: "ADD_FORM_DATA",
      payload: { name, value },
    });
  };

  const onIngredientChange = (e, id) => {
    const { name, value } = e.target;

    dispatch({
      type: "ADD_INGREDIENTS",
      payload: { name, value, id },
    });
  };

  const addIngredient = () => {
    dispatch({
      type: "ADD_INGREDIENT_FIELD",
    });
  };

  const imageHandler = (e) => {
    const types = ["image/jpeg", "image/png"];
    const selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFoodImage(selected);
      setImageError(null);
    } else {
      setImageError("Please select (jpeg or png) Image");
      setFoodImage(null);
    }
  };

  const uploadRecipe = async () => {
    //STORAGE
    const storageRef = storage.ref();
    let imageUrl = null;

    if (foodImage !== null) {
      const imageRef = storageRef.child(foodImage.name);
      await imageRef.put(foodImage);
      imageUrl = await imageRef.getDownloadURL();
    } else {
      imageUrl = null;
    }

    let recipe = {
      title: state?.title,
      publisher: state?.publisher,
      preparationTime: state?.preparationTime,
      servings: state.servings,
      recipe_id: state?.recipe_id,
      image_url: imageUrl,
      checkMark: state.checkMark,
      ingredients: state?.ingredients,
    };

    // let ingredientList = [];

    // state.ingredients.forEach((ingredient) => {
    //   const ing = {
    //     id: ingredient?.id,
    //     ingredient: ingredient.ingredient,
    //   };
    // });

    //FIRESTORE
    firestore.collection("Recipes").doc(state?.title).set({ recipe });
  };

  return (
    <div className={classes.modalContainer}>
      <div
        className={classes.modalBackground}
        onClick={() => setShowModal(false)}
      ></div>
      <div className={classes.modalWrapper}>
        <IoIosClose
          className={classes.closeIcon}
          onClick={() => setShowModal(false)}
        />
        <div className={classes.twoForms}>
          <div className={classes.firstForm}>
            <h3 className={classes.title}>RECIPE DATA</h3>
            <div className={classes.form}>
              <div className={classes.row}>
                <label htmlFor="">Title</label>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  onChange={onChangeHandler}
                  value={state.title}
                />
              </div>
              <div className={classes.row}>
                <label htmlFor="">Publisher</label>
                <input
                  type="text"
                  placeholder="Publisher"
                  name="publisher"
                  value={state.publisher}
                  onChange={onChangeHandler}
                />
              </div>
              <div className={classes.row}>
                <label htmlFor="">Preparation Time</label>
                <input
                  type="text"
                  placeholder="(in minutes)"
                  name="preparationTime"
                  value={state.preparationTime}
                  onChange={onChangeHandler}
                />
              </div>
              <div className={classes.row}>
                <label htmlFor="">Image</label>
                <label htmlFor="image">
                  <p className={classes.imageBtn}>Select Image</p>
                </label>
                <input
                  type="file"
                  id="image"
                  className={classes.imageInput}
                  onChange={imageHandler}
                />
              </div>
              {imageError && <p className={classes.error}>{imageError}</p>}
              {foodImage && (
                <p className={classes.foodName}>{foodImage.name}</p>
              )}
            </div>
          </div>
          <div className={classes.secondForm}>
            <h3 className={classes.title}> INGREDIENTS </h3>
            <div className={classes.form}>
              {/* {state.ingredients.map((ingredient) => {
                let ingredientName = `${Object.keys(ingredient)[1]} ${
                  ingredient.id
                }`;

                let capitalizeWord =
                  ingredientName.charAt(0).toUpperCase() +
                  ingredientName.slice(1);

                return (
                  <div key={ingredient.id} className={classes.row}>
                    <label htmlFor="">{capitalizeWord}</label>
                    <input
                      type="text"
                      placeholder="Format: 'Quantity, Unit, Description'"
                      name="ingredient"
                      value={ingredient.ingredient}
                      onChange={(e) => onIngredientChange(e, ingredient.id)}
                    />
                  </div>
                );
              })} */}

              {state.ingredients.map((ingredient, i) => {
                let ingredientName = `Ingredient ${i + 1}`;

                return (
                  <div key={ingredient.id} className={classes.row}>
                    <label htmlFor="">{ingredientName}</label>
                    <input
                      type="text"
                      placeholder="Format: 'Quantity, Unit, Description'"
                      name="ingredient"
                      value={ingredient}
                      onChange={(e) =>
                        onIngredientChange(e, `${ingredient}${i}`)
                      }
                    />
                  </div>
                );
              })}
            </div>
            <button
              className={classes.addIngredientBtn}
              onClick={addIngredient}
            >
              Add Ingredients
            </button>
          </div>
        </div>
        <div className={classes.uploadButton} onClick={() => uploadRecipe()}>
          <AiOutlineCloudUpload />
          UPLOAD
        </div>
      </div>
    </div>
  );
};

export default AddRecipeModal;
