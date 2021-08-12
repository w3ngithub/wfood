import {SEARCHED_DATA} from '../actions/actionTypes'

const initialState = {
    recipes: []
}

const reducer = (state = initialState,action) => {
 switch(action.type){
    case SEARCHED_DATA:
        return{
            ...state,
            recipes: action.data
        }

    default:
        return state
 }
 }

export default reducer