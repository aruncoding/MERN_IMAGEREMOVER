import {
    CLIENT_ADD_REQUEST,
    CLIENT_ADD_SUCCESS,
    CLIENT_LOGIN_FAIL,
    CLIENT_FETCH_FAILED,
    CLIENT_FETCH_SUCCESS,
    CLIENT_GET_REQUEST
} from "../constants/clientConstants";
export const clientReducer = (state = { client: {} }, action) => {
    switch (action.type) {
        case CLIENT_LOGIN_FAIL:
        case CLIENT_ADD_REQUEST:
            return {
                isAuthenticated: false,
            };
        case CLIENT_ADD_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                client: action.payload,
            };
        default:
            return state;
    }
};

export const clientfolderReducer = (state = {folders:[]}, action) => {
    switch (action.type) {
      case CLIENT_GET_REQUEST:
        return {
          ...state,
          folderDetail: false,
        };
      case CLIENT_FETCH_SUCCESS:
        return {
          ...state,
          folderDetail: true,
          folders: action.payload
        };
  
      case CLIENT_FETCH_FAILED:
        return {
            ...state,
            folderDetail: false,
        };
  
      default:
        return state;
    }
  };