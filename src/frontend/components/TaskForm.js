import React, { useState } from 'react';

const TaskForm = ({ task, addTask, updateTask }) => {
  const [name, setName] = useState(task ? task.name : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      // Update task logic here
      updateTask({ name, description });
    } else {
      // Add task logic here
      addTask({ name, description });
    }
    setSuccess(true);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Task Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter task name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter task description"
        />
      </div>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        {task ? 'Update Task' : 'Add Task'}
      </button>
      {success && (
        <div className="bg-green-100 border border-green-500 text-green-700 px-4 py-3 rounded relative">
          <p>Task added/updated successfully!</p>
        </div>
      )}
    </form>
  );
};

export default TaskForm;