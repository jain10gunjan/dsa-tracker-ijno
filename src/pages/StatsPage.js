import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import firebaseConfig from '../Firebase/firebase.config';

firebase.initializeApp(firebaseConfig);

function StatsPage() {
  const [user, setUser] = useState(null);
  const [taskState, setTaskState] = useState([]);
  const [PercentagetaskState, setPercentageTaskState] = useState([]);


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
          // Merge the tasks from the database with the default tasks
          setTaskState((prevState) => {
            const mergedTasks = { ...prevState, ...tasksFromDB };
            return mergedTasks;
          });
        }

        //Percentage
        
      });

      //Percentage


      
      const dbRefPercentage = firebase.database().ref(`users/${uid}/percentage`);
      dbRefPercentage.on('value', (snapshot) => {
        const tasksFromDBPercentage = snapshot.val();
        if (tasksFromDBPercentage) {
          // Merge the tasks from the database with the default tasks
          setPercentageTaskState((prevState) => {
            const mergedTasksPercentage = { ...prevState, ...tasksFromDBPercentage };
            return mergedTasksPercentage;
          });
        }
      });


    }
  }, [user]);

  const tasksCompleted = taskState ? Object.values(taskState).filter(task => task.completed).length : 0;
  const tasksTotal = taskState ? Object.keys(taskState).length : 0;

  //Percentage
  const PercentagetasksCompleted = PercentagetaskState ? Object.values(PercentagetaskState).filter(task => task.completed).length : 0;
  const PercentagetasksTotal = PercentagetaskState ? Object.keys(PercentagetaskState).length : 0;

  return (
    <div>
      <h1>Task Stats</h1>
      <p>{tasksCompleted} out of {tasksTotal} tasks completed this is for tasks</p>
      <p>{PercentagetasksCompleted} out of {PercentagetasksTotal} tasks completed this is for Percentage</p>

    </div>
  );
}

export default StatsPage;
