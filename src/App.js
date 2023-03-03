import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import firebaseConfig from './Firebase/firebase.config';
import SignIn from './pages/SignIn';



firebase.initializeApp(firebaseConfig);

const tasks = {
  task1: {
    name: "Drinking water",
    completed: false
  },
  task2: {
    name: "Drinking soda",
    completed: false
  },
  task3: {
    name: "Eating",
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
    name: "Reading",
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
    name: "Cleaning",
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


function App() {
  const [user, setUser] = useState(null);
  const [taskState, setTaskState] = useState([]);

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
        } else {
          // Use the default tasks if there are no tasks in the database
          setTaskState(tasks);
          dbRef.set(tasks);
        }
      });
    }else {
      // Use the default tasks if user is not signed in
      setTaskState(tasks);
    }
  }, [user]);

  const handleSignOut = () => {
    firebase.auth().signOut();
  };

  /*const handleTaskCompleted = (taskKey) => {
    const uid = user.uid;
    const taskRef = firebase.database().ref(`users/${uid}/tasks/${taskKey}`);
    const updatedTask = {
      ...taskState[taskKey],
      completed: true
    };
    taskRef.set(updatedTask);
    setTaskState({
      ...taskState,
      [taskKey]: updatedTask
    });
  };*/

  const handleTaskCompleted = (taskKey) => {
    if (user) {
      const uid = user.uid;
      const taskRef = firebase.database().ref(`users/${uid}/tasks/${taskKey}`);
      const updatedTask = {
        ...taskState[taskKey],
        completed: true
      };
      taskRef.set(updatedTask);
      setTaskState({
        ...taskState,
        [taskKey]: updatedTask
      });
    } else {
      const updatedTask = {
        ...taskState[taskKey],
        completed: true
      };
      const updatedTaskState = {
        ...taskState,
        [taskKey]: updatedTask
      };
      setTaskState(updatedTaskState);
      localStorage.setItem('tasks', JSON.stringify(updatedTaskState));
    }
  };

  /*
  const handleTaskUnchecked = (taskKey) => {
    const uid = user.uid;
    const taskRef = firebase.database().ref(`users/${uid}/tasks/${taskKey}`);
    const updatedTask = {
      ...taskState[taskKey],
      completed: false
    };
    taskRef.set(updatedTask);
    setTaskState({
      ...taskState,
      [taskKey]: updatedTask
    });
  };
  */

  const handleTaskUnchecked = (taskKey) => {
    if (user) {
      const uid = user.uid;
      const taskRef = firebase.database().ref(`users/${uid}/tasks/${taskKey}`);
      const updatedTask = {
        ...taskState[taskKey],
        completed: false
      };
      taskRef.set(updatedTask);
      setTaskState({
        ...taskState,
        [taskKey]: updatedTask
      });
    } else {
      const updatedTask = {
        ...taskState[taskKey],
        completed: false
      };
      const updatedTaskState = {
        ...taskState,
        [taskKey]: updatedTask
      };
      setTaskState(updatedTaskState);
      localStorage.setItem('tasks', JSON.stringify(updatedTaskState));
    }
  };

  const tasksCompleted = taskState ? Object.values(taskState).filter(task => task.completed).length : 0;
  const tasksTotal = taskState ? Object.keys(taskState).length : 0;

  return (
    <div>      
      {user ? (
        <div>
          <header>
          <h1>My Task List</h1>
          </header>
          <button onClick={handleSignOut}>Sign Out</button>
          <main>
        <p>{tasksCompleted} out of {tasksTotal} tasks completed</p>
        <ul>
          {Object.entries(taskState).map(([taskKey, task]) => (
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
    <div>
    <SignIn />
    <main>
        <p>{tasksCompleted} out of {tasksTotal} tasks completed</p>
        <ul>
          {Object.entries(taskState).map(([taskKey, task]) => (
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
        
  )}


  

  
</div>
);
}

export default App;





