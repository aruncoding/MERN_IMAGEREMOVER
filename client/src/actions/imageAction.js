import {
    IMAGE_ADD_REQUEST,
    IMAGE_ADD_SUCCESS,
    IMAGE_LOGIN_FAIL,
    IMAGE_GET_REQUEST,
    IMAGE_FETCH_SUCCESS,
    IMAGE_FETCH_FAILED,
} from "../constants/imageConstants";

// export const uploadImage = (formData) => async (dispatch) => {
//     try {
//         console.log("datassss",formData)
//         dispatch({ type: IMAGE_ADD_REQUEST });
//         console.log('datadata', formData)
//         const response = await fetch('http://localhost:8000/api/image/uploadimage', {
//                 method: 'POST',
//                 body: formData,
//                 credentials: 'include',  
//             });
//         // Parse the response data as JSON
//         const data = await response.json();
//         console.log("image data", data);
//         if (data.status === 'success') {
//             dispatch({ type: IMAGE_ADD_SUCCESS, payload: data });
//         } else {
//             dispatch({ type: IMAGE_LOGIN_FAIL, payload: data.message });
//         }
//     } catch (error) {
//         dispatch({ type: IMAGE_LOGIN_FAIL, payload: data.message });
//     }
// };

// Action to upload images
export const uploadImage = (formData) => async (dispatch) => {
    try {
        dispatch({ type: IMAGE_ADD_REQUEST });  // Dispatch the request action
        const response = await fetch('http://localhost:8000/api/image/uploadimage', {
            method: 'POST',
            body: formData,
            credentials: 'include',  
        });
        
        const data = await response.json(); // Parse the response
        console.log("uploadimagess",data)
        if (data.status === 'success') {
            // Dispatch success action with the newly uploaded images
            // console.log("iffffff");
            console.log("after api status uploadimage", data.status)
            console.log("after api data uploadimage", data)
            await dispatch({ type: IMAGE_ADD_SUCCESS, payload: data.data }); // Assuming `data.images` is an array of images
        } else {
            // Dispatch failure action if upload fails
            // console.log("else")
            dispatch({ type: IMAGE_LOGIN_FAIL, payload: data.message });
        }
    } catch (error) {
        dispatch({ type: IMAGE_LOGIN_FAIL, payload: error.message });
    }
};

// Action to fetch images from the API when the component mounts or refreshes
export const fetchImages = (selectedFolderId, selectedSubFolderId) => async (dispatch) => {
    try {
        dispatch({ type: IMAGE_GET_REQUEST });  // Indicate that fetching has started

        // Construct the query parameters based on folderId and subFolderId
        const queryParams = new URLSearchParams({
            folderId: selectedFolderId || '',
            subFolderId: selectedSubFolderId || '',
        }).toString();
        console.log("cccc",queryParams)
        const response = await fetch(`http://localhost:8000/api/image/getimages?${queryParams}`, {
            method: 'GET',
            credentials: 'include',
        });

        const data = await response.json(); // Parse the response
        console.log("fetchImages data response", data);
        if (response.ok && data.status === 'success') {
            // Dispatch success action with the fetched images
            dispatch({ type: IMAGE_FETCH_SUCCESS, payload: data.images });
        } else {
            // Dispatch failure if something goes wrong
            dispatch({ type: IMAGE_FETCH_FAILED, payload: data.message });
        }
    } catch (error) {
        dispatch({ type: IMAGE_FETCH_FAILED, payload: error.message });
    }
};

