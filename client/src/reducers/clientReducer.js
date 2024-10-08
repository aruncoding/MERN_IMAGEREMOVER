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
              ...state,
                clientmade: false,
            };
        case CLIENT_ADD_SUCCESS:
            return {
                ...state,
                clientmade: true,
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
          clientmade: false,
        };
      case CLIENT_FETCH_SUCCESS:
        return {
          ...state,
          clientmade: true,
          folders: action.payload
        };
  
      case CLIENT_FETCH_FAILED:
        return {
            ...state,
            clientmade: false,
        };
  
      default:
        return state;
    }
  };