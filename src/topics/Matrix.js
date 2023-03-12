import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import firebaseConfig from '../Firebase/firebase.config';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import toast, { Toaster } from 'react-hot-toast';

firebase.initializeApp(firebaseConfig);

const tasks = {
    task1: {
        Topic: "Matrix",
        Problem: "Spiral traversal on a Matrix",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/spirally-traversing-a-matrix/0"
    },
    task2: {
        Topic: "Matrix",
        Problem: "Search an element in a matriix",
        completed: false,
        URL: "https://leetcode.com/problems/search-a-2d-matrix/"
    },
    task3: {
        Topic: "Matrix",
        Problem: "Find median in a row wise sorted matrix",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/median-in-a-row-wise-sorted-matrix1527/1"
    },
    task4: {
        Topic: "Matrix",
        Problem: "Find row with maximum no. of 1's",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/row-with-max-1s0023/1"
    },
    task5: {
        Topic: "Matrix",
        Problem: "Print elements in sorted order using row-column wise sorted matrix",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/sorted-matrix/0"
    },
    task6: {
        Topic: "Matrix",
        Problem: "Maximum size rectangle",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/max-rectangle/1"
    },
    task7: {
        Topic: "Matrix",
        Problem: "Find a specific pair in matrix",
        completed: false,
        URL: "https://www.geeksforgeeks.org/find-a-specific-pair-in-matrix/"
    },
    task8: {
        Topic: "Matrix",
        Problem: "Rotate matrix by 90 degrees",
        completed: false,
        URL: "https://www.geeksforgeeks.org/rotate-a-matrix-by-90-degree-in-clockwise-direction-without-using-any-extra-space/"
    },
    task9: {
        Topic: "Matrix",
        Problem: "Kth smallest element in a row-cpumn wise sorted matrix",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/kth-element-in-matrix/1"
    },
    task10: {
        Topic: "Matrix",
        Problem: "Common elements in all rows of a given matrix",
        completed: false,
        URL: "https://www.geeksforgeeks.org/common-elements-in-all-rows-of-a-given-matrix/"
    },
};


function Matrix() {
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
    console.log('auth running... per');
    if (user) {
      const uid = user.uid;
      const dbRef = firebase.database().ref(`users/${uid}/matrix`);
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
      const tasksFromLocalStorage = JSON.parse(localStorage.getItem('matrix'));
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
        localStorage.setItem('matrix', JSON.stringify(tasks));
      }
    }
  }, [user]);

  

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
      const taskRef = firebase.database().ref(`users/${uid}/matrix/${taskKey}`);
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
localStorage.setItem('matrix', JSON.stringify(updatedTaskState));
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
      const taskRef = firebase.database().ref(`users/${uid}/matrix/${taskKey}`);
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
localStorage.setItem('matrix', JSON.stringify(updatedTaskState));



    }
  };

  let i = 0;

  const tasksCompleted = taskState ? Object.values(taskState).filter(task => task.completed).length : 0;
  const tasksTotal = taskState ? Object.keys(taskState).length : 0;


  const notify = () => {
    toast.success(`Congrats You completed the task...`);
  };

  const notify2 = () => {
    toast(`Tasks not completed...`);
  };

  return (
    <div>
      <>
      <div>
     <Navbar/>
     
    </div>
      </>      
      {user ? (
        <div>
          
          <div class="max-w-screen-xl mx-10 px-5 bg-white min-h-sceen shadow-lg rounded-2xl dark:bg-gray-700">
    <p class="p-4 font-bold text-black text-md dark:text-white">
        Matrix
        <span class="ml-2 text-sm text-gray-500 dark:text-gray-300 dark:text-white">
        <p>{tasksCompleted} out of {tasksTotal} Questions. completed</p>
        </span>
        
    </p>
      {Object.entries(taskState).map(([taskKey, task]) => (
            
            <div key={taskKey}>

{/*<details className="group">*/}
				<summary className="justify-between items-center cursor-pointer list-none">
        <ul>
        <li class="flex items-center justify-between py-3 text-gray-600 border-b-2 border-gray-100 dark:text-gray-200 dark:border-gray-800">
            <div class="flex items-center justify-start text-sm">
              <span class="mx-4">
              <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => task.completed ? handleTaskUnchecked(taskKey) : handleTaskCompleted(taskKey)}
                  className='relative h-5 w-10 appearance-none rounded-[20px] bg-gray-300 outline-none transition duration-[0.5s] 
                    before:absolute before:top-[50%] before:h-4 before:w-4 before:translate-x-[2px] before:translate-y-[-50%] before:rounded-[20px]
                    before:bg-white before:shadow-[0_2px_5px_rgba(0,_0,_0,_.2)] before:transition before:content-[""]
                    checked:before:translate-x-[22px] hover:cursor-pointer checked:bg-gray-500 dark:checked:bg-brand-400'
                  onClick={()=>{
                    if(task.completed){
                  notify2()
                    }else{
                      notify()
                    }
                  }}
                  
                />
              </span>
                <span class="mx-2">
                    {i = i+1}
                </span>
                
                <a href={task.URL}><span>
                {task.Problem} 
                </span>
<span class="mx-4 px-2 py-1  text-xs rounded text-gray-800 bg-green-300">
    Click Here
</span>
</a>
            </div>
            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
</svg>
        </li>
        </ul>
    
        </summary>
       {/*<p className="flex items-center justify-start text-sm mt-3 group-open:animate-fadeIn">
					 SAAS platform is a cloud-based software service that allows users to access
					and use a variety of tools and functionality.
				</p>
        </div></details>*/}

</div>
              ))}
              </div>
      
    </div>
  ) : (
    <div>
      
    <div class=" max-w-screen-xl mx-10 px-5 bg-white min-h-sceen shadow-lg rounded-2xl dark:bg-gray-700">
    <p class="p-4 font-bold text-black text-md dark:text-white">
        Matrix
        <span class="ml-2 text-sm text-gray-500 dark:text-gray-300 dark:text-white">
        <p>{tasksCompleted} out of {tasksTotal} Questions. completed</p>
        </span>
        
    </p>
      {Object.entries(taskState).map(([taskKey, task]) => (
            
            <div key={taskKey}>

{/*<details className="group">*/}
				<summary className="justify-between items-center cursor-pointer list-none">
        <ul>
        <li class="flex items-center justify-between py-3 text-gray-600 border-b-2 border-gray-100 dark:text-gray-200 dark:border-gray-800">
            <div class="flex items-center justify-start text-sm">
              <span class="mx-4">
              <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => task.completed ? handleTaskUnchecked(taskKey) : handleTaskCompleted(taskKey)}
                  className='relative h-5 w-10 appearance-none rounded-[20px] bg-gray-300 outline-none transition duration-[0.5s] 
                    before:absolute before:top-[50%] before:h-4 before:w-4 before:translate-x-[2px] before:translate-y-[-50%] before:rounded-[20px]
                    before:bg-white before:shadow-[0_2px_5px_rgba(0,_0,_0,_.2)] before:transition before:content-[""]
                    checked:before:translate-x-[22px] hover:cursor-pointer checked:bg-gray-500 dark:checked:bg-brand-400'
                    onClick={()=>{
                      if(task.completed){
                    notify2()
                      }else{
                        notify()
                      }
                    }}
                />
              </span>
                <span class="mx-2">
                    {i = i+1}
                </span>
                
                <a href={task.URL}><span>
                {task.Problem} 
                </span>
<span class="mx-4 px-2 py-1  text-xs rounded text-gray-800 bg-green-300">
    Click Here
</span>
</a>
            </div>
            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
</svg>
        </li>
        </ul>
    
        </summary>
       {/*<p className="flex items-center justify-start text-sm mt-3 group-open:animate-fadeIn">
					 SAAS platform is a cloud-based software service that allows users to access
					and use a variety of tools and functionality.
				</p>
        </div></details>*/}

</div>
              ))}
              </div>
      

      

      
        </div>
        
  )}


  
<Toaster />
<Footer/>  
</div>
);
}

export default Matrix;





