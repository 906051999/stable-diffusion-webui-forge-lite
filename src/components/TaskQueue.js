import React from 'react';

const TaskQueue = ({ tasks }) => (
  <div className="mt-4">
    <h2 className="text-lg font-semibold mb-2">Task Queue</h2>
    {tasks.length === 0 ? (
      <div className="text-gray-500">No pending tasks.</div>
    ) : (
      <ul className="list-disc list-inside">
        {tasks.map((task, index) => (
          <li key={index} className="text-gray-700">
            {task.name}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default TaskQueue;