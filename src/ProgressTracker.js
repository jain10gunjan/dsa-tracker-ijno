import React, { useState, useEffect } from 'react';
import firebase from './Firebase/firebase';

const ProgressTracker = () => {
  const [task1, setTask1] = useState(false);
  const [task2, setTask2] = useState(false);
  const [task3, setTask3] = useState(false);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const tasksRef = firebase.database().ref(`users/${user.uid}/tasks`);
    tasksRef.on('value', (snapshot) => {
      const tasks = snapshot.val();
      if (tasks) {
        setTask1(tasks.task1);
        setTask2(tasks.task2);
            setTask3(tasks.task3);
        }
      });
    }, []);

    
   
    return (
      <div>
        <h2>Progress Tracker</h2>
        <ul>
          <li>
            Task 1: {task1 ? 'Completed' : 'Incomplete'}
          </li>
          <li>
            Task 2: {task2 ? 'Completed' : 'Incomplete'}
          </li>
          <li>
            Task 3: {task3 ? 'Completed' : 'Incomplete'}
          </li>
        </ul>
      </div>
    );
};

export default ProgressTracker;