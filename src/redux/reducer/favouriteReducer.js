import {
  ADD_TO_FAVOURITE,
  REMOVE_FROM_FAVOURITE,
} from "../actions/actionTypes";

const initialState = {
  favourites: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVOURITE:
      return {
        ...state,
        favourites: [...state.favourites, action.data],
      };

    case REMOVE_FROM_FAVOURITE:
      return {
        ...state,
        favourites: [
          ...state.favourites.filter((f) => f.recipe_id !== action.id),
        ],
      };

    default:
      return state;
  }
};

export default reducer;
