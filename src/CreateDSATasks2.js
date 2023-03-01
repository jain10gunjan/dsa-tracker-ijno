import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const CreateDSATasks2 = ({ tasks, handleTaskChange }) => {
  if (!tasks) {
    return <div>Loading...</div>;
  }

  const notify = (taskName, isCompleted) => {
    const message = isCompleted
      ? `Congrats! You completed the task: ${taskName}`
      : `Task "${taskName}" is not yet completed`;
    toast.success(message);
  };

  return (
    <div>
      <h2>Task List</h2>
      <form>
        {tasks.map((tasks) => (
          <label key={tasks.id}>
            <input
              type="checkbox"
              checked={tasks.completed}
              onChange={() => {
                handleTaskChange(tasks.id);
                notify(tasks.name, !tasks.completed);
              }}
            />
            {tasks.name}
          </label>
        ))}
      </form>
      <Toaster />
    </div>
  );
};


export default CreateDSATasks2;
