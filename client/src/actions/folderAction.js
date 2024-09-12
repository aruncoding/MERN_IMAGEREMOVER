import {
    FOLDER_ADD_REQUEST,
    FOLDER_ADD_SUCCESS,
    FOLDER_LOGIN_FAIL,
    FOLDER_GET_REQUEST,
    FOLDER_FETCH_SUCCESS,
    FOLDER_FETCH_FAILED
 } from "../constants/folderConstants";

 export const addFolder = (folderId, input) => async (dispatch) => {
    try {
      dispatch({ type: FOLDER_ADD_REQUEST });
      console.log('input', input)
      console.log('folderId', folderId)
      const response= await fetch('http://localhost:8000/api/folder/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fparentId:folderId , name: input },), // Send form data as JSON
        credentials: 'include',  
      });
      // Parse the response data as JSON
      const data = await response.json();
      console.log("addFolder data", data);
      if(data.status === 'success'){
        dispatch({ type: FOLDER_ADD_SUCCESS, payload: data.user });
      }else{
        dispatch({ type: FOLDER_LOGIN_FAIL, payload: data.message });
      }
    } catch (error) {
      dispatch({ type: FOLDER_LOGIN_FAIL, payload: data.message });
    }
  };