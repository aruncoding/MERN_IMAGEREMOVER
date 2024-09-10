import {
    CLIENT_ADD_REQUEST,
    CLIENT_ADD_SUCCESS,
    CLIENT_LOGIN_FAIL,
    CLIENT_FETCH_FAILED,
    CLIENT_FETCH_SUCCESS,
    CLIENT_GET_REQUEST
  } from "../constants/clientConstants";
import axios from "axios";


export const addClient = (name, mobile) => async (dispatch) => {
    try {
      dispatch({ type: CLIENT_ADD_REQUEST });
      console.log('name', name)
      console.log('mobile', mobile)
      const response= await fetch('http://localhost:8000/api/clients/create/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, mobile },), // Send form data as JSON
        credentials: 'include',  
      });
      // Parse the response data as JSON
      const data = await response.json();
      console.log("datadata", data);
      if(data.status === 'success'){
        dispatch({ type: CLIENT_ADD_SUCCESS, payload: data.user });
      }else{
        dispatch({ type: CLIENT_LOGIN_FAIL, payload: data.message });
      }
    } catch (error) {
      dispatch({ type: CLIENT_LOGIN_FAIL, payload: data.message });
    }
  };

  export const getFolder = () => async (dispatch) => {
    dispatch({ type: CLIENT_GET_REQUEST });
    const response = await fetch('http://localhost:8000/api/clients/getclient', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // This includes cookies in the request, useful for authentication
      });

      if (response.ok) {
        const data = await response.json();  // Convert the response to JSON
        console.log("dsfsdfsdf",data)
        dispatch({ type: CLIENT_FETCH_SUCCESS, payload: data.data });
        console.log(data);  // Handle the data from the API
      } else {
        dispatch({ type: CLIENT_FETCH_FAILED,  });
        console.error('Failed to fetch data:', response.statusText);
      }
  };