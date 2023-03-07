import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import firebaseConfig from './Firebase/firebase.config';
import SignIn from './pages/SignIn';
import { Transition } from "@headlessui/react";


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
  },
  task12: {
    name: "Test",
    completed: false
  },
  task13: {
    name: "Test 2",
    completed: false
  },
  task14: {
    name: "Test 3",
    completed: false
  },
  task15: {
    name: "Test 4",
    completed: false
  },
  task16: {
    name: "Test 5",
    completed: false
  },
  task17: {
    name: "Test 6",
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
            const merged1 = {...tasks,...tasksFromDB};
            const mergedTasks = { ...prevState, ...merged1 };
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
      const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));
      if (tasksFromLocalStorage) {
        // Merge the tasks from the localStorage with the default tasks
        setTaskState((prevState) => {
          const merged1 = {...tasks,...tasksFromLocalStorage};
          const mergedTasks = { ...prevState, ...merged1};
          return mergedTasks;
        });
      } else {
        // Use the default tasks if there are no tasks in the localStorage
        setTaskState(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
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
      ;

setTaskState(updatedTaskState);
localStorage.setItem('tasks', JSON.stringify(updatedTaskState));



    }
  };

  let i = 0;

  const tasksCompleted = taskState ? Object.values(taskState).filter(task => task.completed).length : 0;
  const tasksTotal = taskState ? Object.keys(taskState).length : 0;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <>
      <div>
      <nav className="bg-gray-5 00">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    href="#"
                    className=" text-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </a>

                  <a
                    href="#"
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Team
                  </a>

                  <a
                    href="#"
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Projects
                  </a>

                  <a
                    href="#"
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Calendar
                  </a>

                  <a
                    href="#"
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Reports
                  </a>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a
                  href="#"
                  className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </a>

                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Team
                </a>

                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Projects
                </a>

                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Calendar
                </a>

                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Reports
                </a>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
      </>      
      {user ? (
        <div>
          <header>
          <h1>My Task List</h1>
          </header>
          <button onClick={handleSignOut}>Sign Out</button>
          <div class="max-w-screen-xl mx-auto px-5 bg-white min-h-sceen shadow-lg rounded-2xl dark:bg-gray-700">
    <p class="p-4 font-bold text-black text-md dark:text-white">
        My Tasks
        <span class="ml-2 text-sm text-gray-500 dark:text-gray-300 dark:text-white">
        <p>{tasksCompleted} out of {tasksTotal} tasks completed</p>
        </span>
    </p>
      {Object.entries(taskState).map(([taskKey, task]) => (
            
            <div key={taskKey}>

<details className="group">
				<summary className="justify-between items-center cursor-pointer list-none">
        <ul>
        <li class="flex items-center justify-between py-3 text-gray-600 border-b-2 border-gray-100 dark:text-gray-200 dark:border-gray-800">
            <div class="flex items-center justify-start text-sm">
              <span class="mx-4">
              <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => task.completed ? handleTaskUnchecked(taskKey) : handleTaskCompleted(taskKey)}
                  className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-3 w-4 rounded"
                />
              </span>
                <span class="mx-2">
                    {i = i+1}
                </span>
                <span>
                {task.name}
                </span>
            </div>
            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
</svg>
        </li>
        </ul>
    
        </summary>
        <p className="flex items-center justify-start text-sm mt-3 group-open:animate-fadeIn">
					 SAAS platform is a cloud-based software service that allows users to access
					and use a variety of tools and functionality.
				</p>
        </details>

</div>
              ))}
              </div>
    </div>
  ) : (
    <div>
      <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}} className='mt-4'>     <SignIn />
</div>
    <div class="max-w-screen-xl mx-auto px-5 bg-white min-h-sceen shadow-lg rounded-2xl dark:bg-gray-700">
    <p class="p-4 font-bold text-black text-md dark:text-white">
        My Tasks
        <span class="ml-2 text-sm text-gray-500 dark:text-gray-300 dark:text-white">
        <p>{tasksCompleted} out of {tasksTotal} tasks completed</p>
        </span>
        
    </p>
      {Object.entries(taskState).map(([taskKey, task]) => (
            
            <div key={taskKey}>

<details className="group">
				<summary className="justify-between items-center cursor-pointer list-none">
        <ul>
        <li class="flex items-center justify-between py-3 text-gray-600 border-b-2 border-gray-100 dark:text-gray-200 dark:border-gray-800">
            <div class="flex items-center justify-start text-sm">
              <span class="mx-4">
              <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => task.completed ? handleTaskUnchecked(taskKey) : handleTaskCompleted(taskKey)}
                  className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-3 w-4 rounded"
                />
              </span>
                <span class="mx-2">
                    {i = i+1}
                </span>
                <span>
                {task.name}
                </span>
            </div>
            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
</svg>
        </li>
        </ul>
    
        </summary>
        <p className="flex items-center justify-start text-sm mt-3 group-open:animate-fadeIn">
					 SAAS platform is a cloud-based software service that allows users to access
					and use a variety of tools and functionality.
				</p>
        </details>

</div>
              ))}
              </div>
      

      

      
        </div>
        
  )}


  

  
</div>
);
}

export default App;





