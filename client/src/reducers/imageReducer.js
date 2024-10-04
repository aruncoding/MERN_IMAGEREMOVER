import { 
    IMAGE_ADD_REQUEST,
    IMAGE_ADD_SUCCESS,
    IMAGE_LOGIN_FAIL,
    IMAGE_GET_REQUEST,
    IMAGE_FETCH_SUCCESS,
    IMAGE_FETCH_FAILED,
} from "../constants/imageConstants";

export const ImageReducer = (state = { images: [], imageAdded: false }, action) => {
    console.log("reducerforimage", state);
    console.log("action.type", action.type);
    switch (action.type) {
        case IMAGE_ADD_REQUEST:
        case IMAGE_LOGIN_FAIL:
            return {
              ...state,
              imageAdded: false
            };
        case IMAGE_ADD_SUCCESS:
            return {
                ...state,
                imageAdded: true,
                images: [...state.images, ...action.payload], // Update the state with newly added images
            };
        case IMAGE_GET_REQUEST:
            return {
                ...state,
                images: [],  // Clear current images during the request
            };
        case IMAGE_FETCH_SUCCESS:
            return {
                ...state,
                images: action.payload, // Load fetched images from API into the state
            };
        case IMAGE_FETCH_FAILED:
            return {
                ...state,
                images: [], // In case of error, set images to empty
            };
        default:
            return state;
    }
};
