import React from "react";
import { IoIosClose } from "react-icons/io";
import classes from "./addRecipeModal.module.css";
import { AiOutlineCloudUpload } from "react-icons/ai";

const AddRecipeModal = ({ setShowModal }) => {
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
                <input type="text" placeholder="Title" />
              </div>
              <div className={classes.row}>
                <label htmlFor="">Publisher</label>
                <input type="text" placeholder="Publisher" />
              </div>
              <div className={classes.row}>
                <label htmlFor="">Preparation Time</label>
                <input type="text" placeholder="Prep. Time" />
              </div>
              <div className={classes.row}>
                <label htmlFor="">Image</label>
                <label htmlFor="image">
                  <p className={classes.imageBtn}>Select Image</p>
                </label>
                <input type="file" id="image" className={classes.imageInput} />
              </div>
            </div>
          </div>
          <div className={classes.secondForm}>
            <h3 className={classes.title}> INGREDIENTS </h3>
            <div className={classes.form}>
              <div className={classes.row}>
                <label htmlFor="">Ingredient 1</label>
                <input
                  type="text"
                  placeholder="Format: 'Quantity, Unit, Description'"
                />
              </div>
              <div className={classes.row}>
                <label htmlFor="">Ingredient 2</label>
                <input
                  type="text"
                  placeholder="Format: 'Quantity, Unit, Description'"
                />
              </div>
              <div className={classes.row}>
                <label htmlFor="">Ingredient 3</label>
                <input
                  type="text"
                  placeholder="Format: 'Quantity, Unit, Description'"
                />
              </div>
              <div className={classes.row}>
                <label htmlFor="">Ingredient 4</label>
                <input
                  type="text"
                  placeholder="Format: 'Quantity, Unit, Description'"
                />
              </div>
              <div className={classes.row}>
                <label htmlFor="">Ingredient 5</label>
                <input
                  type="text"
                  placeholder="Format: 'Quantity, Unit, Description'"
                />
              </div>

              <button className={classes.addIngredientBtn}>
                Add Ingredients
              </button>
            </div>
          </div>
        </div>
        <div className={classes.uploadButton}>
          <AiOutlineCloudUpload />
          UPLOAD
        </div>
      </div>
    </div>
  );
};

export default AddRecipeModal;
