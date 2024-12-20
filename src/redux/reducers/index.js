// reducers/index.js
import { combineReducers } from 'redux';
import taskReducer from './taskReducers'; // Import your task reducer

const rootReducer = combineReducers({
  task: taskReducer, // Add your task reducer here
});

export default rootReducer;
