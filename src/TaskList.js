import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import firebaseConfig from './Firebase/firebase.config';
import SignIn from './pages/SignIn';


firebase.initializeApp(firebaseConfig);

function TaskList() {
  const [user, setUser] = useState(null);
  const [task1, setTask1] = useState(false);
  const [task2, setTask2] = useState(false);
  const [task3, setTask3] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      const uid = user.uid;
      const dbRef = firebase.database().ref(`users/${uid}/percentage`);
      dbRef.on('value', (snapshot) => {
        const tasks = snapshot.val();
        if (tasks) {
          setTask1(tasks.task1);
          setTask2(tasks.task2);
          setTask3(tasks.task3);
        }
      });
    }
  }, [user]);

  const handleSignOut = () => {
    firebase.auth().signOut();
  };

  const handleTask1Change = (e) => {
    const newValue = e.target.checked;
    const uid = user.uid;
    firebase.database().ref(`users/${uid}/percentage`).update({ task1: newValue });
    setTask1(newValue);
  };

  const handleTask2Change = (e) => {
    const newValue = e.target.checked;
    const uid = user.uid;
    firebase.database().ref(`users/${uid}/percentage`).update({ task2: newValue });
    setTask2(newValue);
  };

  const handleTask3Change = (e) => {
    const newValue = e.target.checked;
    const uid = user.uid;
    firebase.database().ref(`users/${uid}/percentage`).update({ task3: newValue });
    setTask3(newValue);
  };

  const tasksCompleted = [task1, task2, task3].filter(Boolean).length;
  const tasksTotal = [task1, task2, task3].length;



  return (

    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!<br/>
          {user.email} </p>
          <button onClick={handleSignOut}>Sign Out</button>
          <label>
            <input
              type="checkbox"
              checked={tasks}
              task1={task1}
              onChange={handleTask1Change}
            />
            This is the first value
          </label>
          <p>You have completed {tasksCompleted}/{tasksTotal} tasks!</p>
        </div>
        
      ) : (
        <SignIn />
      )}
    </div>



    
  );
}



  
  export default TaskList;
