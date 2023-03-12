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
    task1:{
        Topic: "Searching & Sorting",
        Problem: "Find first and last positions of an element in a sorted array",
        completed: false,
        "URL": "https://practice.geeksforgeeks.org/problems/first-and-last-occurrences-of-x/0"
    },
    task2:{
        Topic: "Searching & Sorting",
        Problem: "Find a Fixed Point (Value equal to index) in a given array",
        completed: false,
        "URL": "https://practice.geeksforgeeks.org/problems/value-equal-to-index-value1330/1"
    },
    task3:{
        Topic: "Searching & Sorting",
        Problem: "Search in a rotated sorted array",
        completed: false,
        "URL": "https://leetcode.com/problems/search-in-rotated-sorted-array/"
    },
    task4:{
        Topic: "Searching & Sorting",
        Problem: "square root of an integer",
        completed: false,
        "URL": "https://practice.geeksforgeeks.org/problems/count-squares3649/1"
    },
    task5:{
        Topic: "Searching & Sorting",
        Problem: "Maximum and minimum of an array using minimum number of comparisons",
        completed: false,
        "URL": "https://practice.geeksforgeeks.org/problems/middle-of-three2926/1"
    },
    task6:{
        Topic: "Searching & Sorting",
        Problem: "Optimum location of point to minimize total distance",
        completed: false,
        "URL": "https://www.geeksforgeeks.org/optimum-location-point-minimize-total-distance/"
    },
    task7:{
        Topic: "Searching & Sorting",
        Problem: "Find the repeating and the missing",
        completed: false,
        "URL": "https://practice.geeksforgeeks.org/problems/find-missing-and-repeating2512/1"
    },
    task8:{
        Topic: "Searching & Sorting",
        Problem: "find majority element",
        completed: false,
        "URL": "https://practice.geeksforgeeks.org/problems/majority-element/0"
    },
    task9:{
        Topic: "Searching & Sorting",
        Problem: "Searching in an array where adjacent differ by at most k",
        completed: false,
        "URL": "https://www.geeksforgeeks.org/searching-array-adjacent-differ-k/"
    },
    task10:{
        Topic: "Searching & Sorting",
        Problem: "find a pair with a given difference",
        completed: false,
        "URL": "https://practice.geeksforgeeks.org/problems/find-pair-given-difference/0"
    },
    task11:{
        Topic: "Searching & Sorting",
        Problem: "find four elements that sum to a given value",
        completed: false,
        "URL": "https://practice.geeksforgeeks.org/problems/find-all-four-sum-numbers/0"
    },
    task12:{
        Topic: "Searching & Sorting",
        Problem: "maximum sum such that no 2 elements are adjacent",
        completed: false,
        "URL": "https://practice.geeksforgeeks.org/problems/stickler-theif/0"
    },
    task13:{
        Topic: "Searching & Sorting",
        Problem: "Count triplet with sum smaller than a given value",
        completed: false,
        "URL": "https://practice.geeksforgeeks.org/problems/count-triplets-with-sum-smaller-than-x5549/1"
    },
    task14:{
        Topic: "Searching & Sorting",
        Problem: "merge 2 sorted arrays",
        completed: false,
        "URL": "https://practice.geeksforgeeks.org/problems/merge-two-sorted-arrays5135/1"
    },
    task15:{
        Topic: "Searching & Sorting",
        Problem: "print all subarrays with 0 sum",
        completed: false,
        "URL": "https://practice.geeksforgeeks.org/problems/zero-sum-subarrays/0"
    },
    task16:{
        Topic: "Searching & Sorting",
        Problem: "Product array Puzzle",
        completed: false,
        "URL": "https://practice.geeksforgeeks.org/problems/product-array-puzzle/0"
    },
    task17:{
        Topic: "Searching & Sorting",
        Problem: "Sort array according to count of set bits",
        completed: false,
        "URL": "https://practice.geeksforgeeks.org/problems/sort-by-set-bit-count/0"
    },
    task18:{
        Topic: "Searching & Sorting",
        Problem: "minimum no. of swaps required to sort the array",
        completed: false,
        "URL": "https://practice.geeksforgeeks.org/problems/minimum-swaps/1"
    },
    task19:{
        Topic: "Searching & Sorting",
        Problem: "Bishu and Soldiers",
        completed: false,
        "URL": "https://www.hackerearth.com/practice/algorithms/searching/binary-search/practice-problems/algorithm/bishu-and-soldiers/"
    },
    task20:{
        Topic: "Searching & Sorting",
        Problem: "Rasta and Kheshtak",
        completed: false,
        "URL": "https://www.hackerearth.com/practice/algorithms/searching/binary-search/practice-problems/algorithm/rasta-and-kheshtak/"
    },
    task21:{
        Topic: "Searching & Sorting",
        Problem: "Kth smallest number again",
        completed: false,
        "URL": "https://www.hackerearth.com/practice/algorithms/searching/binary-search/practice-problems/algorithm/kth-smallest-number-again-2/"
    },
    task22:{
        Topic: "Searching & Sorting",
        Problem: "Find pivot element in a sorted array",
        completed: false,
        "URL": "http://theoryofprogramming.com/2017/12/16/find-pivot-element-sorted-rotated-array/"
    },
    task23:{
        Topic: "Searching & Sorting",
        Problem: "K-th Element of Two Sorted Arrays",
        completed: false,
        "URL": "https://practice.geeksforgeeks.org/problems/k-th-element-of-two-sorted-array/0"
    },
    task24:{
        Topic: "Searching & Sorting",
        Problem: "Aggressive cows",
        completed: false,
        "URL": "https://www.spoj.com/problems/AGGRCOW/"
    },
    task25:{
        Topic: "Searching & Sorting",
        Problem: "Book Allocation Problem",
        completed: false,
        "URL": "https://practice.geeksforgeeks.org/problems/allocate-minimum-number-of-pages/0"
    },
    task26:{
        Topic: "Searching & Sorting",
        Problem: "EKOSPOJ:",
        completed: false,
        "URL": "https://www.spoj.com/problems/EKO/"
    },
    task27:{
        Topic: "Searching & Sorting",
        Problem: "Job Scheduling Algo",
        completed: false,
        "URL": "https://www.geeksforgeeks.org/weighted-job-scheduling-log-n-time/"
    },
    task28:{
        Topic: "Searching & Sorting",
        Problem: "Missing Number in AP",
        completed: false,
        "URL": "https://practice.geeksforgeeks.org/problems/arithmetic-number/0"
    },
    task29:{
        Topic: "Searching & Sorting",
        Problem: "Smallest number with atleastn trailing zeroes infactorial",
        completed: false,
        "URL": "https://practice.geeksforgeeks.org/problems/smallest-factorial-number5929/1"
    },
    task30:{
        Topic: "Searching & Sorting",
        Problem: "Painters Partition Problem:",
        completed: false,
        "URL": "https://practice.geeksforgeeks.org/problems/allocate-minimum-number-of-pages/0"
    },
    task31:{
        Topic: "Searching & Sorting",
        Problem: "ROTI-Prata SPOJ",
        completed: false,
        "URL": "https://www.spoj.com/problems/PRATA/"
    },
    task32:{
        Topic: "Searching & Sorting",
        Problem: "DoubleHelix SPOJ",
        completed: false,
        "URL": "https://www.spoj.com/problems/ANARC05B/"
    },
    task33:{
        Topic: "Searching & Sorting",
        Problem: "Subset Sums",
        completed: false,
        "URL": "https://www.spoj.com/problems/SUBSUMS/"
    },
    task34:{
        Topic: "Searching & Sorting",
        Problem: "Findthe inversion count",
        completed: false,
        "URL": "https://practice.geeksforgeeks.org/problems/inversion-of-array/0"
    },
    task35:{
        Topic: "Searching & Sorting",
        Problem: "Implement Merge-sort in-place",
        completed: false,
        "URL": "https://www.geeksforgeeks.org/in-place-merge-sort/"
    },
    task36:{
        Topic: "Searching & Sorting",
        Problem: "Partitioning and Sorting Arrays with Many Repeated Entries",
        completed: false,
        "URL": "https://www.baeldung.com/java-sorting-arrays-with-repeated-entries"
    },
};


function Searchandsort() {
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
      const dbRef = firebase.database().ref(`users/${uid}/searchandsort`);
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
      const tasksFromLocalStorage = JSON.parse(localStorage.getItem('searchandsort'));
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
        localStorage.setItem('searchandsort', JSON.stringify(tasks));
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
      const taskRef = firebase.database().ref(`users/${uid}/searchandsort/${taskKey}`);
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
localStorage.setItem('searchandsort', JSON.stringify(updatedTaskState));
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
      const taskRef = firebase.database().ref(`users/${uid}/searchandsort/${taskKey}`);
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
localStorage.setItem('searchandsort', JSON.stringify(updatedTaskState));



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
    Search and Sort
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
    Search and Sort
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

export default Searchandsort;





