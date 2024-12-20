import {
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    FETCH_TASKS,
    SORT_TASKS,
  } from '../actions/taskActions';
  
  const initialState = {
    tasks: [],
    loading: false,
  };
  
  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TASKS:
        return {
          ...state,
          tasks: action.payload,
          loading: false, // Set loading to false once tasks are fetched
        };
      case ADD_TASK:
        return {
          ...state,
          tasks: [...state.tasks, action.payload],
          loading: false, // Optionally, you can control loading state here
        };
      case UPDATE_TASK:
        return {
          ...state,
          tasks: state.tasks.map((task) =>
            task.id === action.payload.id ? action.payload : task
          ),
          loading: false, // Optionally set loading to false after the update
        };
      case DELETE_TASK:
        return {
          ...state,
          tasks: state.tasks.filter((task) => task.id !== action.payload),
          loading: false, // Optionally set loading to false after deletion
        };
      case SORT_TASKS:
        return {
          ...state,
          tasks: [...state.tasks].sort((a, b) => {
            const field = action.payload; // field to sort by
            if (a[field] > b[field]) return 1;
            if (a[field] < b[field]) return -1;
            return 0;
          }),
        };
      default:
        return state;
    }
  };
  
  export default taskReducer;
  