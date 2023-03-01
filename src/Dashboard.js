import React from 'react';

const Dashboard = ({ task1, task2, task3 }) => {
  const completedTasks = [task1, task2, task3].filter((task) => task === true).length;
  const totalTasks = 3;

  return (
    <div>
      <p>{`${completedTasks}/${totalTasks} tasks completed`}</p>
    </div>
  );
};

export default Dashboard;
