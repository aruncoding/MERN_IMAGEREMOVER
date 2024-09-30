import { 
    IMAGE_ADD_REQUEST,
    IMAGE_ADD_SUCCESS,
    IMAGE_LOGIN_FAIL,
    IMAGE_GET_REQUEST,
    IMAGE_FETCH_SUCCESS,
    IMAGE_FETCH_FAILED,
 } from "../constants/imageConstants"


 export const ImageReducer = (state = { image: {}, imageAdded: false }, action) => {
    console.log("reducerforimage",state);
    console.log("action.type",action.type);
    switch (action.type) {
        case IMAGE_ADD_REQUEST:
        case IMAGE_ADD_SUCCESS:
            return {
              ...state
            };
        case IMAGE_ADD_SUCCESS:
            return {
                ...state,
                imageAdded: true,
                image: action.payload,
            };
        default:
            return state;
    }
};