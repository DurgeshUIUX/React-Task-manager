import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTasks, updateTask } from '../redux/actions/taskActions';
import { useFormik } from 'formik';
import {
  TextField,
  MenuItem,
  Select,
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
  Typography
} from '@mui/material';

const EditTask = () => {
  const { id } = useParams(); // Get task ID from URL params
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch tasks from the Redux store
  const tasks = useSelector((state) => state.task.tasks);
  
  // Find the task from the Redux store based on the id from URL params
  const task = tasks.find((task) => task.id === parseInt(id));

  useEffect(() => {
    // Fetch tasks if they are not yet loaded
    if (!tasks.length) {
      dispatch(fetchTasks());
    }

    if (!task) {
      // If task is not found, navigate to the task list page
      navigate('/');
    }
  }, [task, tasks, id, dispatch, navigate]);

  // useFormik to manage form data and validation
  const formik = useFormik({
    initialValues: {
      title: task?.title || '',
      assignedTo: task?.assignedTo || '',
      status: task?.status || 'Open',
      priority: task?.priority || 'Medium',
      startDate: task?.startDate || '',
      endDate: task?.endDate || '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.title) errors.title = 'Title is required';
      if (!values.assignedTo) errors.assignedTo = 'Assigned To is required';
      if (!values.startDate) errors.startDate = 'Start Date is required';
      if (!values.endDate) errors.endDate = 'End Date is required';
      return errors;
    },
    onSubmit: (values) => {
      // Prepare the updated task data
      const updatedTaskData = {
        ...values,
        id: task.id, // Keep the existing task ID
      };

      // Dispatch update action
      dispatch(updateTask(updatedTaskData));
      navigate('/'); // Navigate to task list after update
    },
  });

  // If task is not found, display an error message
  if (!task) return <div>Task not found!</div>;

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>Edit Task</Typography>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            margin="normal"
          />
        </div>

        <div>
          <TextField
            fullWidth
            label="Assigned To"
            name="assignedTo"
            value={formik.values.assignedTo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            error={formik.touched.assignedTo && Boolean(formik.errors.assignedTo)}
            helperText={formik.touched.assignedTo && formik.errors.assignedTo}
            margin="normal"
          />
        </div>

        <div>
          <FormControl fullWidth margin="normal" error={formik.touched.status && Boolean(formik.errors.status)}>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            >
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="In-Progress">In-Progress</MenuItem>
              <MenuItem value="Under-review">Under-review</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
            {formik.touched.status && formik.errors.status && (
              <FormHelperText>{formik.errors.status}</FormHelperText>
            )}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth margin="normal" error={formik.touched.priority && Boolean(formik.errors.priority)}>
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={formik.values.priority}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
            {formik.touched.priority && formik.errors.priority && (
              <FormHelperText>{formik.errors.priority}</FormHelperText>
            )}
          </FormControl>
        </div>

        <div>
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            name="startDate"
            value={formik.values.startDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            InputLabelProps={{
              shrink: true,
            }}
            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
            helperText={formik.touched.startDate && formik.errors.startDate}
            margin="normal"
          />
        </div>

        <div>
          <TextField
            fullWidth
            label="End Date"
            type="date"
            name="endDate"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            InputLabelProps={{
              shrink: true,
            }}
            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
            helperText={formik.touched.endDate && formik.errors.endDate}
            margin="normal"
          />
        </div>

        <div>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Save Changes
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default EditTask;
