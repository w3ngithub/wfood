import { GET_DATA } from "../actions/actionTypes";

const initialState = {
  singleRecipe: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        singleRecipe: action.data,
      };

    default:
      return state;
  }
};

export default reducer;
