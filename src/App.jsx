import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Updated import
import TaskTable from './components/taskTableComponent';
import EditTask from './components/editTaskComponent';
import './App.css';

function App() {
    return (
        <Router>
          <header style={{ padding: '20px', backgroundColor: '#1976d2', color: '#fff', textAlign: 'center' }}>
                <h1>Task-Manager Application</h1>
            </header>
            <Routes>
                <Route path="/" element={<TaskTable />} />
                <Route path="/edit/:id" element={<EditTask />} />
            </Routes>
        </Router>
    );
}

export default App;
