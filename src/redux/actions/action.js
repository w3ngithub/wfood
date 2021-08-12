import { SEARCHED_DATA } from "./actionTypes";

export const searchedData = (data) => {
    return {
        type: SEARCHED_DATA,
        data: data
    }
} 