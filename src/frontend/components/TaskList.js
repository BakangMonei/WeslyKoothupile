import React from 'react';

const TaskList = ({ tasks, deleteTask, setEditingTask }) => (
  <div>
    {tasks.map(task => (
      <div key={task.id} className="mb-4 p-4 border rounded shadow">
        <h2 className="text-xl">{task.name}</h2>
        <p>{task.description}</p>
        <div className="mt-2">
          <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => setEditingTask(task)}>Edit</button>
          <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      </div>
    ))}
  </div>
);

export default TaskList;
