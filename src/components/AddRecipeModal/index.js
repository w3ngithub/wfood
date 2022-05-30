import reducer from "../reducer/index";
import { useForm } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import classes from "./addRecipeModal.module.css";
import React, { useState, useReducer } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { firestore, storage } from "../../firebase/config";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const AddRecipeModal = ({ setShowModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const success = () =>
    toast.success("Upload Successful!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      onClose: () => setShowModal(false),
    });

  const title = register("title", { required: true });
  const publisher = register("publisher", { required: true });
  const preparationTime = register("preparationTime", { required: true });
  const ing1 = register("ingredient1", { required: true });
  const ing2 = register("ingredient2", { required: true });

  const [foodImage, setFoodImage] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectImage, setSelectImage] = useState(null);

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
      setSelectImage("");
    } else {
      setImageError("Please select (jpeg or png) Image");
      setFoodImage(null);
    }
  };

  const uploadRecipe = async () => {
    if (foodImage !== null) {
      setLoading(true);

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
        ingredients: state?.ingredients.filter(
          (ingredient) => ingredient.length !== 0
        ),
      };

      //FIRESTORE
      firestore
        .collection("Recipes")
        .doc(state?.title)
        .set({ recipe })
        .then(() => success());
    } else {
      setSelectImage("*choose an Image");
    }
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
                  onChange={(e) => {
                    onChangeHandler(e);
                    title.onChange(e);
                  }}
                  value={state.title}
                  className={errors.title ? classes.redInput : classes.input}
                />
                {errors.title && (
                  <p className={classes.inputError}>*required</p>
                )}
              </div>
              <div className={classes.row}>
                <label htmlFor="">Publisher</label>
                <input
                  type="text"
                  placeholder="Publisher"
                  name="publisher"
                  value={state.publisher}
                  onChange={(e) => {
                    onChangeHandler(e);
                    publisher.onChange(e);
                  }}
                  className={
                    errors.publisher ? classes.redInput : classes.input
                  }
                />
                {errors.publisher && (
                  <p className={classes.inputError}>*required</p>
                )}
              </div>
              <div className={classes.row}>
                <label htmlFor="">Preparation Time</label>
                <input
                  type="number"
                  placeholder="(in minutes)"
                  name="preparationTime"
                  value={state.preparationTime}
                  onChange={(e) => {
                    onChangeHandler(e);
                    preparationTime.onChange(e);
                  }}
                  className={
                    errors.preparationTime ? classes.redInput : classes.input
                  }
                />
                {errors.preparationTime && (
                  <p className={classes.inputError}>*required</p>
                )}
              </div>
              <div className={classes.row}>
                <label htmlFor="">Servings</label>(2)
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
                  onChange={(e) => {
                    imageHandler(e);
                  }}
                  // ref={image}
                />
                {selectImage && (
                  <p className={classes.inputError}>{selectImage}</p>
                )}
              </div>
              {imageError && <p className={classes.error}>{imageError}</p>}
              {foodImage && (
                <p className={classes.foodName}>{foodImage.name}</p>
              )}
            </div>
          </div>
          <div className={classes.secondForm}>
            <div className={classes.title}>
              <h3> INGREDIENTS </h3>
              <small>(for 2 servings)</small>
            </div>
            <div className={classes.form}>
              {state.ingredients.map((ingredient, i) => {
                let ingredientName = `Ingredient ${i + 1}`;

                return (
                  <div key={ingredient.id} className={classes.row}>
                    <label htmlFor="">{ingredientName}</label>
                    {i == 0 ? (
                      <input
                        type="text"
                        placeholder="Format: 'Quantity, Unit, Description'"
                        name="ingredient1"
                        value={ingredient}
                        onChange={(e) => {
                          onIngredientChange(e, `${ingredient}${i}`);
                          ing1.onChange(e);
                        }}
                        className={
                          errors.ingredient1 ? classes.redInput : classes.input
                        }
                      />
                    ) : i == 1 ? (
                      <input
                        type="text"
                        placeholder="Format: 'Quantity, Unit, Description'"
                        name="ingredient2"
                        value={ingredient}
                        onChange={(e) => {
                          onIngredientChange(e, `${ingredient}${i}`);
                          ing2.onChange(e);
                        }}
                        className={
                          errors.ingredient2 ? classes.redInput : classes.input
                        }
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder="Format: 'Quantity, Unit, Description'"
                        name="ingredient"
                        value={ingredient}
                        onChange={(e) =>
                          onIngredientChange(e, `${ingredient}${i}`)
                        }
                        className={classes.input}
                      />
                    )}
                    {i == 0 && errors.ingredient1 && (
                      <p className={classes.inputError}>*required</p>
                    )}
                    {i == 1 && errors.ingredient2 && (
                      <p className={classes.inputError}>*required</p>
                    )}
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
        {!loading ? (
          <div
            className={classes.uploadButton}
            onClick={handleSubmit(uploadRecipe)}
          >
            <AiOutlineCloudUpload />
            UPLOAD
          </div>
        ) : (
          <div className={classes.uploadingButton}>
            <AiOutlineCloudUpload />
            UPLOADING...
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddRecipeModal;
