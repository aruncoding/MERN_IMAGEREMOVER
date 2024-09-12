import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux'; // Import combineReducers
import { userReducer } from "./reducers/userReducer";
import { clientReducer, clientfolderReducer } from "./reducers/clientReducer";
import { createFolderReducer } from "./reducers/folderReducer";

// Combine all your reducers into a root reducer function
const rootReducer = combineReducers({
  user: userReducer,
  client: clientReducer,
  clientfolder: clientfolderReducer,
  createfolder: createFolderReducer,
});

// Create a persist configuration
const persistConfig = {
  key: 'root',
  storage, // Use localStorage to persist state
  whitelist: ['user', 'client', 'clientfolder', 'createfolder'], // List of reducers you want to persist
};

// Wrap the combined reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Middleware setup
const middleware = [thunk];

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks for redux-persist
    }).concat(middleware),
});

// Export the persistor
export const persistor = persistStore(store);

export default store;
