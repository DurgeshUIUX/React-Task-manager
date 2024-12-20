// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Assuming you have reducers set up
import { thunk } from 'redux-thunk';
import logger from 'redux-logger'; // Optional logger middleware

const store = configureStore({
  reducer: rootReducer, // Set up rootReducer here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true, // Ensure redux-thunk is included
    }).concat(logger), // Optionally add redux-logger
});

export default store;
