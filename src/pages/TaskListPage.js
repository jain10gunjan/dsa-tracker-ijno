import React from 'react';


function TaskListPage({ tasks, handleTaskCompleted, handleTaskUnchecked }) {
  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {Object.entries(tasks).map(([key, task]) => (
          <li key={key}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => {
                  if (task.completed) {
                    handleTaskUnchecked(key);
                  } else {
                    handleTaskCompleted(key);
                  }
                }}
              />
              {task.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskListPage;
