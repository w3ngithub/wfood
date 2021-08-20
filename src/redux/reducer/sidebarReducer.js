import { SHOW_SIDEBAR } from "../actions/actionTypes";
import { HIDE_SIDEBAR } from "../actions/actionTypes";

const initialState = {
  showSidebar: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SIDEBAR:
      return {
        ...state,
        showSidebar: true,
      };

    case HIDE_SIDEBAR:
      return {
        ...state,
        showSidebar: false,
      };

    default:
      return state;
  }
};

export default reducer;
