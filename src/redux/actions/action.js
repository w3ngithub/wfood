import {
  GET_DATA,
  SHOW_SIDEBAR,
  HIDE_SIDEBAR,
  SEARCHED_DATA,
  ADD_TO_FAVOURITE,
  REMOVE_FROM_FAVOURITE,
} from "./actionTypes";

export const searchedData = (data, fromFirebase) => {
  return {
    type: SEARCHED_DATA,
    data: data,
    fromFirebase: fromFirebase,
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

export const showSidebar = () => {
  return {
    type: SHOW_SIDEBAR,
  };
};

export const hideSidebar = () => {
  return {
    type: HIDE_SIDEBAR,
  };
};
