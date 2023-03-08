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
    Topic: "Array",
    Problem: "Reverse the array",
    URL: "https://www.geeksforgeeks.org/write-a-program-to-reverse-an-array-or-string/",
    completed: false
  },
  task2: {
    Topic: "Array",
    Problem: "Find the maximum and minimum element in an array",
    URL: "https://www.geeksforgeeks.org/maximum-and-minimum-in-an-array/",
    completed: false
  },
  task3: {
    Topic: "Array",
            Problem: "Find the \"Kth\" max and min element of an array ",
            completed: false,
            URL: "https://practice.geeksforgeeks.org/problems/kth-smallest-element/0"
  },
  task4: {
    Topic: "Array",
            Problem: "Given an array which consists of only 0, 1 and 2. Sort the array without using any sorting algo",
            completed: false,
            URL: "https://practice.geeksforgeeks.org/problems/sort-an-array-of-0s-1s-and-2s/0"
  },
  task5: {
    Topic: "Array",
            Problem: "Move all the negative elements to one side of the array ",
            completed: false,
            URL: "https://www.geeksforgeeks.org/move-negative-numbers-beginning-positive-end-constant-extra-space/"
  },
  task6: {
    Topic: "Array",
            Problem: "Find the Union and Intersection of the two sorted arrays.",
            completed: false,
            URL: "https://practice.geeksforgeeks.org/problems/union-of-two-arrays/0"
  },
  task7: {
    Topic: "Array",
            Problem: "find Largest sum contiguous Subarray [V. IMP]",
            completed: false,
            URL: "https://practice.geeksforgeeks.org/problems/kadanes-algorithm/0"
  },
  task8: {
    Topic: "Array",
            Problem: "Minimise the maximum difference between heights [V.IMP]",
            completed: false,
            URL: "https://practice.geeksforgeeks.org/problems/minimize-the-heights3351/1"
  },
  task9: {
    Topic: "Array",
    Problem: "Minimum no. of Jumps to reach end of an array",
    completed: false,
    URL: "https://practice.geeksforgeeks.org/problems/minimum-number-of-jumps/0"
  },
  task10: {
    Topic: "Array",
            Problem: "find duplicate in an array of N+1 Integers",
            completed: false,
            URL: "https://leetcode.com/problems/find-the-duplicate-number/"
  },
  task11: {
    Topic: "Array",
    Problem: "Merge 2 sorted arrays without using Extra space.",
    completed: false,
    URL: "https://practice.geeksforgeeks.org/problems/merge-two-sorted-arrays5135/1"
  },
  task12: {
    Topic: "Array",
            Problem: "Kadane's Algo [V.V.V.V.V IMP]",
            completed: false,
            URL: "https://practice.geeksforgeeks.org/problems/kadanes-algorithm/0"
  },
  task13: {
    Topic: "Array",
            Problem: "Merge Intervals",
            completed: false,
            URL: "https://leetcode.com/problems/merge-intervals/"
  },
  task14: {
    Topic: "Array",
    Problem: "Next Permutation",
    completed: false,
    URL: "https://leetcode.com/problems/next-permutation/"
  },
  task15: {
    Topic: "Array",
    Problem: "Count Inversion",
    completed: false,
    URL: "https://practice.geeksforgeeks.org/problems/inversion-of-array/0"
  },
  task16: {
    Topic: "Array",
            Problem: "Best time to buy and Sell stock",
            completed: false,
            URL: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
  },
  task17: {
    Topic: "Array",
            Problem: "find all pairs on integer array whose sum is equal to given number",
            completed: false,
            URL: "https://practice.geeksforgeeks.org/problems/count-pairs-with-given-sum5022/1"
  },
  task18: {
    Topic: "Array",
    Problem: "find common elements In 3 sorted arrays",
    completed: false,
    URL: "https://practice.geeksforgeeks.org/problems/common-elements1132/1"
  },
  task19: {
    Topic: "Array",
    Problem: "Rearrange the array in alternating positive and negative items with O(1) extra space",
    completed: false,
    URL: "https://www.geeksforgeeks.org/rearrange-array-alternating-positive-negative-items-o1-extra-space/"
  },
  task20: {
    Topic: "Array",
            Problem: "Find if there is any subarray with sum equal to 0",
            completed: false,
            URL: "https://practice.geeksforgeeks.org/problems/subarray-with-0-sum/0"
  },
  task21: {
    Topic: "Array",
    Problem: "Find factorial of a large number",
    completed: false,
    URL: "https://practice.geeksforgeeks.org/problems/factorials-of-large-numbers/0"
  },
  task22: {
    Topic: "Array",
            Problem: "find maximum product subarray ",
            completed: false,
            URL: "https://practice.geeksforgeeks.org/problems/maximum-product-subarray3604/1"
  },
  task23: {
    Topic: "Array",
            Problem: "Find longest coinsecutive subsequence",
            completed: false,
            URL: "https://practice.geeksforgeeks.org/problems/longest-consecutive-subsequence/0"
  },
  task24: {
   Topic: "Array",
            Problem: "Given an array of size n and a number k, fin all elements that appear more than \" n/k \" times.",
            completed: false,
            URL: "https://www.geeksforgeeks.org/given-an-array-of-of-size-n-finds-all-the-elements-that-appear-more-than-nk-times/"
  },
  task25: {
    Topic: "Array",
    Problem: "Maximum profit by buying and selling a share atmost twice",
    completed: false,
    URL: "https://www.geeksforgeeks.org/maximum-profit-by-buying-and-selling-a-share-at-most-twice/"
  },
  task26: {
    Topic: "Array",
            Problem: "Find whether an array is a subset of another array",
            completed: false,
            URL: "https://practice.geeksforgeeks.org/problems/array-subset-of-another-array/0"
  },
  task27: {
    Topic: "Array",
    Problem: "Find the triplet that sum to a given value",
    completed: false,
    URL: "https://practice.geeksforgeeks.org/problems/triplet-sum-in-array/0"
  },
  task28: {
    Topic: "Array",
    Problem: "Trapping Rain water problem",
    completed: false,
    URL: "https://practice.geeksforgeeks.org/problems/trapping-rain-water/0"
  },
  task29: {
    Topic: "Array",
            Problem: "Chocolate Distribution problem",
            completed: false,
            URL: "https://practice.geeksforgeeks.org/problems/chocolate-distribution-problem/0"
  },
  task30: {
    Topic: "Array",
    Problem: "Smallest Subarray with sum greater than a given value",
    completed: false,
    URL: "https://practice.geeksforgeeks.org/problems/smallest-subarray-with-sum-greater-than-x/0"
  },
  task31: {
    Topic: "Array",
    Problem: "Three way partitioning of an array around a given value",
    completed: false,
    URL: "https://practice.geeksforgeeks.org/problems/three-way-partitioning/1"
  },
  task32: {
    Topic: "Array",
    Problem: "Minimum swaps required bring elements less equal K together",
    completed: false,
    URL: "https://practice.geeksforgeeks.org/problems/minimum-swaps-required-to-bring-all-elements-less-than-or-equal-to-k-together/0"
  },
  task33: {
    Topic: "Array",
    Problem: "Minimum no. of operations required to make an array palindrome",
    completed: false,
    URL: "https://practice.geeksforgeeks.org/problems/palindromic-array/0"
  },
  task34: {
    Topic: "Array",
    Problem: "Median of 2 sorted arrays of equal size",
    completed: false,
    URL: "https://practice.geeksforgeeks.org/problems/find-the-median0527/1"
  },
  task35: {
    Topic: "Array",
    Problem: "Median of 2 sorted arrays of different size",
    completed: false,
    URL: "https://www.geeksforgeeks.org/median-of-two-sorted-arrays-of-different-sizes/"
  },

};


function Arrays() {
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
      const dbRef = firebase.database().ref(`users/${uid}/arrays`);
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
      const tasksFromLocalStorage = JSON.parse(localStorage.getItem('arrays'));
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
        localStorage.setItem('arrays', JSON.stringify(tasks));
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
      const taskRef = firebase.database().ref(`users/${uid}/arrays/${taskKey}`);
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
localStorage.setItem('arrays', JSON.stringify(updatedTaskState));
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
      const taskRef = firebase.database().ref(`users/${uid}/arrays/${taskKey}`);
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
localStorage.setItem('arrays', JSON.stringify(updatedTaskState));



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
        Arrays
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
        Arrays
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

export default Arrays;





