import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { fetchTasks, deleteTask } from '../redux/actions/taskActions';

const TaskTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Select tasks and loading from Redux state
  const tasks = useSelector((state) => state.task.tasks);
  const loading = useSelector((state) => state.task.loading);

  useEffect(() => {
    // Only fetch tasks if they are not already loaded
    if (tasks.length === 0) {
      dispatch(fetchTasks());
    }
  }, [dispatch, tasks]);

  const handleDelete = (taskId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if (isConfirmed) {
      dispatch(deleteTask(taskId));
    }
  };

  const handleEditClick = (id) => {
    navigate(`/edit/${id}`); // Navigate to the /edit/:id route
  };

  // Define the columns for the DataGrid
  const columns = [
    { field: 'id', headerName: 'Task ID', width: 200 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'assignedTo', headerName: 'Assigned To', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'priority', headerName: 'Priority', width: 150 },
    { field: 'startDate', headerName: 'Start Date', width: 150 },
    { field: 'endDate', headerName: 'End Date', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEditClick(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  // Map tasks to rows data for DataGrid
  const rows = tasks.map((task) => ({
    id: task.id,
    title: task.title,
    assignedTo: task.assignedTo,
    status: task.status,
    priority: task.priority,
    startDate: task.startDate,
    endDate: task.endDate,
  }));

  // Show loading indicator if data is still being fetched
  if (loading) return <div>Loading...</div>;

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        pagination
        paginationMode="client"
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default TaskTable;
