import tasksData from '../../tasks.json'; // Import the local JSON file
export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const FETCH_TASKS = "FETCH_TASKS";
export const SORT_TASKS = "SORT_TASKS";

export const fetchTasks = () => async (dispatch) => {
  try {
    // Use JSONPlaceholder API for fetching tasks
    //  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    //  const data = await response.json();
    const tasks = tasksData.map((task) => ({
      id: task.id,
      title: task.title,
      assignedTo: task.assignedTo, // Adjust this based on your data
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      endDate: task.endDate,
    }));

    dispatch({ type: FETCH_TASKS, payload: tasks });
  } catch (error) {
    console.error("Failed to load tasks:", error);
  }
};

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const updateTask = (task) => ({
  type: UPDATE_TASK,
  payload: task,
});

export const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  payload: taskId,
});

export const sortTasks = (field) => ({
  type: SORT_TASKS,
  payload: field,
});
