import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import firebaseConfig from './Firebase/firebase.config';
import SignIn from './pages/SignIn';


firebase.initializeApp(firebaseConfig);

const tasks = {
  task1: {
    name: "Drinking Percentage",
    completed: false
  },
  task2: {
    name: "Drinking soda Percentage",
    completed: false
  },
  task3: {
    name: "Eating Percentage",
    completed: false
  },
  task4: {
    name: "Swimming",
    completed: false
  },
  task5: {
    name: "Walking",
    completed: false
  },
  task6: {
    name: "Reading Percentage",
    completed: false
  },
  task7: {
    name: "Writing",
    completed: false
  },
  task8: {
    name: "Cooking",
    completed: false
  },
  task9: {
    name: "Cleaning Percentage",
    completed: false
  },
  task10: {
    name: "Exercising",
    completed: false
  },
  task11: {
    name: "firebase",
    completed: false
  }
};

function Percentage() {
  const [user, setUser] = useState(null);
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
      const dbRef = firebase.database().ref(`users/${uid}/percentage`);
      dbRef.on('value', (snapshot) => {
        const tasksFromDB = snapshot.val();
        if (tasksFromDB) {
          // Merge the tasks from the database with the default tasks
          setPercentageTaskState((prevState) => {
            const mergedTasks = { ...prevState, ...tasksFromDB };
            return mergedTasks;
          });
        } else {
          // Use the default tasks if there are no tasks in the database
          setPercentageTaskState(tasks);
          dbRef.set(tasks);
        }
      });
    }
  }, [user]);

  const handleSignOut = () => {
    firebase.auth().signOut();
  };

  const handleTaskCompleted = (taskKey) => {
    const uid = user.uid;
    const taskRef = firebase.database().ref(`users/${uid}/percentage/${taskKey}`);
    const updatedTask = {
      ...PercentagetaskState[taskKey],
      completed: true
    };
    taskRef.set(updatedTask);
    setPercentageTaskState({
      ...PercentagetaskState,
      [taskKey]: updatedTask
    });
  };

  const handleTaskUnchecked = (taskKey) => {
    const uid = user.uid;
    const taskRef = firebase.database().ref(`users/${uid}/percentage/${taskKey}`);
    const updatedTask = {
      ...PercentagetaskState[taskKey],
      completed: false
    };
    taskRef.set(updatedTask);
    setPercentageTaskState({
      ...PercentagetaskState,
      [taskKey]: updatedTask
    });
  };

  const PercentagetasksCompleted = PercentagetaskState ? Object.values(PercentagetaskState).filter(task => task.completed).length : 0;
  const PercentagetasksTotal = PercentagetaskState ? Object.keys(PercentagetaskState).length : 0;

  return (
    <div>
      {user ? (
        <div>
          <header>
          <h1>My Task List</h1>
          </header>
          <button onClick={handleSignOut}>Sign Out</button>
      <main>
        <p>{PercentagetasksCompleted} out of {PercentagetasksTotal} tasks completed</p>
        <ul>
          {Object.entries(PercentagetaskState).map(([taskKey, task]) => (
            <li key={taskKey}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => task.completed ? handleTaskUnchecked(taskKey) : handleTaskCompleted(taskKey)}
                />
                {task.name}
              </label>
            </li>
          ))}
        </ul>
      </main>
      
    </div>
  ) : (
    <SignIn />
  )}
</div>
);
}

export default Percentage;





