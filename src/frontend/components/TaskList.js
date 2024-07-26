import React from 'react';

const TaskList = ({ tasks, deleteTask, setEditingTask }) => (
  <div className="max-w-md mx-auto p-4 pt-6 md:p-6 lg:p-12">
    {tasks.map((task) => (
      <div key={task.id} className="bg-white shadow-md rounded px-4 py-6 mb-4">
        <h2 className="text-lg font-bold">{task.name}</h2>
        <p className="text-gray-600">{task.description}</p>
        <p className="text-gray-600 text-sm">
          Created by {task.author} on {task.createdAt ? task.createdAt.toLocaleDateString() : 'Unknown'} at{' '}
          {task.createdAt ? task.createdAt.toLocaleTimeString() : 'Unknown'}
        </p>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setEditingTask(task)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default TaskList;