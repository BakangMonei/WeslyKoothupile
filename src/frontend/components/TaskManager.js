import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

  const addTask = (task) => {
    axios.post('http://localhost:5000/tasks', task)
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => console.error(error));
  };

  const updateTask = (task) => {
    axios.put(`http://localhost:5000/tasks/${task.id}`, task)
      .then(response => {
        const updatedTasks = tasks.map(t => t.id === task.id ? response.data : t);
        setTasks(updatedTasks);
        setEditingTask(null);
      })
      .catch(error => console.error(error));
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter(t => t.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskForm addTask={addTask} updateTask={updateTask} editingTask={editingTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} setEditingTask={setEditingTask} />
    </div>
  );
};

export default TaskManager;
