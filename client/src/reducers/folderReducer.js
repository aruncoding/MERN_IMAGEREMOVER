import {
    FOLDER_ADD_REQUEST,
    FOLDER_ADD_SUCCESS,
    FOLDER_LOGIN_FAIL,
    FOLDER_GET_REQUEST,
    FOLDER_FETCH_SUCCESS,
    FOLDER_FETCH_FAILED
} from "../constants/folderConstants";

export const createFolderReducer = (state = { client: {} }, action) => {
    switch (action.type) {
        case FOLDER_LOGIN_FAIL:
        case FOLDER_ADD_REQUEST:
            return {
              ...state,
                foldermade: false,
            };
        case FOLDER_ADD_SUCCESS:
            return {
                ...state,
                foldermade: true,
                client: action.payload,
            };
        default:
            return state;
    }
};