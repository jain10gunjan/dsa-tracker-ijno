import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

function TaskSummaryPage() {
  const [user, setUser] = useState(null);
  const [tasksCompleted, setTasksCompleted] = useState(0);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      const uid = user.uid;
      const dbRef = firebase.database().ref(`users/${uid}/tasks`);
      dbRef.on('value', (snapshot) => {
        const tasksFromDB = snapshot.val();
        if (tasksFromDB) {
          const completedTasks = Object.values(tasksFromDB).filter(task => task.completed).length;
          setTasksCompleted(completedTasks);
        } else {
          setTasksCompleted(0);
        }
      });
    }
  }, [user]);

  return (
    <div>
      <h1>Task Summary</h1>
      <p>Total tasks completed: {tasksCompleted}</p>
    </div>
  );
}

export default TaskSummaryPage;
