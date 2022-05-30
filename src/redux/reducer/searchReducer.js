import { SEARCHED_DATA, FILTERED_DATA } from "../actions/actionTypes";

const initialState = {
  recipes: [],
  recipesFromFirebase: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCHED_DATA:
      return {
        ...state,
        recipes: action.data,
        recipesFromFirebase: action.fromFirebase,
      };

    default:
      return state;
  }
};

export default reducer;
