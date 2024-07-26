import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask, updateTask, editingTask }) => {
  const [task, setTask] = useState({ name: '', description: '' });

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask);
    } else {
      setTask({ name: '', description: '' });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      updateTask(task);
    } else {
      addTask(task);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label className="block text-sm font-bold mb-1">Task Name</label>
        <input 
          type="text" 
          name="name" 
          value={task.name} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-bold mb-1">Description</label>
        <textarea 
          name="description" 
          value={task.description} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        />
      </div>
      <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">
        {editingTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
