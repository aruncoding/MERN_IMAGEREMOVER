import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk"; // Correct import for thunk
import { userReducer } from "./reducers/userReducer"; // Import your userReducer
import { clientReducer } from "./reducers/clientReducer";
import { clientfolderReducer } from "./reducers/clientReducer";
// Define the reducer object
const rootReducer = {
  user: userReducer, // Your reducers go here
  client: clientReducer,
  clientfolder : clientfolderReducer

};

// Middleware setup
const middleware = [thunk];

// Configure the store
const store = configureStore({
  reducer: rootReducer, // Pass the reducer object directly
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

export default store;
