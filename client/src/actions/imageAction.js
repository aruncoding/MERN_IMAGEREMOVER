import {
    IMAGE_ADD_REQUEST,
    IMAGE_ADD_SUCCESS,
    IMAGE_LOGIN_FAIL,
    IMAGE_GET_REQUEST,
    IMAGE_FETCH_SUCCESS,
    IMAGE_FETCH_FAILED,
} from "../constants/imageConstants";

export const uploadImage = (formData) => async (dispatch) => {
    try {
        console.log("datassss",formData)
        dispatch({ type: IMAGE_ADD_REQUEST });
        console.log('datadata', formData)
        const response = await fetch('http://localhost:8000/api/image/uploadimage', {
                method: 'POST',
                body: formData,
                credentials: 'include',  
            });
        // Parse the response data as JSON
        const data = await response.json();
        console.log("image data", data);
        if (data.status === 'success') {
            dispatch({ type: IMAGE_ADD_SUCCESS, payload: data.data });
        } else {
            dispatch({ type: IMAGE_LOGIN_FAIL, payload: data.message });
        }
    } catch (error) {
        dispatch({ type: IMAGE_LOGIN_FAIL, payload: data.message });
    }
};