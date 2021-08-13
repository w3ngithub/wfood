import {
  GET_DATA,
  SEARCHED_DATA,
  FILTERED_DATA,
  ADD_TO_FAVOURITE,
  REMOVE_FROM_FAVOURITE,
} from "./actionTypes";

export const searchedData = (data) => {
  return {
    type: SEARCHED_DATA,
    data: data,
  };
};

export const getData = (data) => {
  return {
    type: GET_DATA,
    data: data,
  };
};

export const addFavourite = (data) => {
  return {
    type: ADD_TO_FAVOURITE,
    data: data,
  };
};

export const removeFavourite = (data) => {
  return {
    type: REMOVE_FROM_FAVOURITE,
    id: data,
  };
};
