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
        Topic: "String",
        Problem: "Reverse a String",
        completed: false,
        URL: "https://leetcode.com/problems/reverse-string/"
    },
    task2:{
        Topic: "String",
        Problem: "Check whether a String is Palindrome or not",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/palindrome-string0817/1"
    },
    task3:{
        Topic: "String",
        Problem: "Find Duplicate characters in a string",
        completed: false,
        URL: "https://www.geeksforgeeks.org/print-all-the-duplicates-in-the-input-string/"
    },
    task4:{
        Topic: "String",
        Problem: "Why strings are immutable in Java?",
        completed: false,
        URL: "<->"
    },
    task5:{
        Topic: "String",
        Problem: "Write a Code to check whether one string is a rotation of another",
        completed: false,
        URL: "https://www.geeksforgeeks.org/a-program-to-check-if-strings-are-rotations-of-each-other/"
    },
    task6:{
        Topic: "String",
        Problem: "Write a Program to check whether a string is a valid shuffle of two strings or not",
        completed: false,
        URL: "https://www.programiz.com/java-programming/examples/check-valid-shuffle-of-strings"
    },
    task7:{
        Topic: "String",
        Problem: "Count and Say problem",
        completed: false,
        URL: "https://leetcode.com/problems/count-and-say/"
    },
    task8:{
        Topic: "String",
        Problem: "Write a program to find the longest Palindrome in a string.[ Longest palindromic Substring]",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/longest-palindrome-in-a-string/0"
    },
    task9:{
        Topic: "String",
        Problem: "Find Longest Recurring Subsequence in String",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/longest-repeating-subsequence/0"
    },
    task10:{
        Topic: "String",
        Problem: "Print all Subsequences of a string.",
        completed: false,
        URL: "https://www.geeksforgeeks.org/print-subsequences-string/"
    },
    task11:{
        Topic: "String",
        Problem: "Print all the permutations of the given string",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/permutations-of-a-given-string/0"
    },
    task12:{
        Topic: "String",
        Problem: "Split the Binary string into two substring with equal 0’s and 1’s",
        completed: false,
        URL: "https://www.geeksforgeeks.org/split-the-binary-string-into-substrings-with-equal-number-of-0s-and-1s/"
    },
    task13:{
        Topic: "String",
        Problem: "Word Wrap Problem [VERY IMP].",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/word-wrap/0"
    },
    task14:{
        Topic: "String",
        Problem: "EDIT Distance [Very Imp]",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/edit-distance3702/1"
    },
    task15:{
        Topic: "String",
        Problem: "Find next greater number with same set of digits. [Very Very IMP]",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/next-permutation/0"
    },
    task16:{
        Topic: "String",
        Problem: "Balanced Parenthesis problem.[Imp]",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/parenthesis-checker/0"
    },
    task17:{
        Topic: "String",
        Problem: "Word break Problem[ Very Imp]",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/word-break/0"
    },
    task18:{
        Topic: "String",
        Problem: "Rabin Karp Algo",
        completed: false,
        URL: "https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/"
    },
    task19:{
        Topic: "String",
        Problem: "KMP Algo",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/longest-prefix-suffix2527/1"
    },
    task20:{
        Topic: "String",
        Problem: "Convert a Sentence into its equivalent mobile numeric keypad sequence.",
        completed: false,
        URL: "https://www.geeksforgeeks.org/convert-sentence-equivalent-mobile-numeric-keypad-sequence/"
    },
    task21:{
        Topic: "String",
        Problem: "Minimum number of bracket reversals needed to make an expression balanced.",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/count-the-reversals/0"
    },
    task22:{
        Topic: "String",
        Problem: "Count All Palindromic Subsequence in a given String.",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/count-palindromic-subsequences/1"
    },
    task23:{
        Topic: "String",
        Problem: "Count of number of given string in 2D character array",
        completed: false,
        URL: "https://www.geeksforgeeks.org/find-count-number-given-string-present-2d-character-array/"
    },
    task24:{
        Topic: "String",
        Problem: "Search a Word in a 2D Grid of characters.",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/find-the-string-in-grid/0"
    },
    task25:{
        Topic: "String",
        Problem: "Boyer Moore Algorithm for Pattern Searching.",
        completed: false,
        URL: "https://www.geeksforgeeks.org/boyer-moore-algorithm-for-pattern-searching/"
    },
    task26:{
        Topic: "String",
        Problem: "Converting Roman Numerals to Decimal",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/roman-number-to-integer/0"
    },
    task27:{
        Topic: "String",
        Problem: "Longest Common Prefix",
        completed: false,
        URL: "https://leetcode.com/problems/longest-common-prefix/"
    },
    task28:{
        Topic: "String",
        Problem: "Number of flips to make binary string alternate",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/min-number-of-flips/0"
    },
    task29:{
        Topic: "String",
        Problem: "Find the first repeated word in string.",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/second-most-repeated-string-in-a-sequence/0"
    },
    task30:{
        Topic: "String",
        Problem: "Minimum number of swaps for bracket balancing.",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/minimum-swaps-for-bracket-balancing/0"
    },
    task31:{
        Topic: "String",
        Problem: "Find the longest common subsequence between two strings.",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/longest-common-subsequence/0"
    },
    task32:{
        Topic: "String",
        Problem: "Program to generate all possible valid IP addresses from given  string.",
        completed: false,
        URL: "https://www.geeksforgeeks.org/program-generate-possible-valid-ip-addresses-given-string/"
    },
    task33:{
        Topic: "String",
        Problem: "Write a program to find the smallest window that contains all characters of string itself.",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/smallest-distant-window/0"
    },
    task34:{
        Topic: "String",
        Problem: "Rearrange characters in a string such that no two adjacent are same",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/rearrange-characters/0"
    },
    task35:{
        Topic: "String",
        Problem: "Minimum characters to be added at front to make string palindrome",
        completed: false,
        URL: "https://www.geeksforgeeks.org/minimum-characters-added-front-make-string-palindrome/"
    },
    task36:{
        Topic: "String",
        Problem: "Given a sequence of words, print all anagrams together",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/k-anagrams-1/0"
    },
    task37:{
        Topic: "String",
        Problem: "Find the smallest window in a string containing all characters of another string",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/smallest-window-in-a-string-containing-all-the-characters-of-another-string/0"
    },
    task38:{
        Topic: "String",
        Problem: "Recursively remove all adjacent duplicates",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/consecutive-elements/0"
    },
    task39:{
        Topic: "String",
        Problem: "String matching where one string contains wildcard characters",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/wildcard-string-matching/0"
    },
    task40:{
        Topic: "String",
        Problem: "Function to find Number of customers who could not get a computer",
        completed: false,
        URL: "https://www.geeksforgeeks.org/function-to-find-number-of-customers-who-could-not-get-a-computer/"
    },
    task41:{
        Topic: "String",
        Problem: "Transform One String to Another using Minimum Number of Given Operation",
        completed: false,
        URL: "https://www.geeksforgeeks.org/transform-one-string-to-another-using-minimum-number-of-given-operation/"
    },
    task42:{
        Topic: "String",
        Problem: "Check if two given strings are isomorphic to each other",
        completed: false,
        URL: "https://practice.geeksforgeeks.org/problems/isomorphic-strings/0"
    },
    task43:{
        Topic: "String",
        Problem: "Recursively print all sentences that can be formed from list of word lists",
        completed: false,
        URL: "https://www.geeksforgeeks.org/recursively-print-all-sentences-that-can-be-formed-from-list-of-word-lists/"
    },
};


function String() {
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
      const dbRef = firebase.database().ref(`users/${uid}/string`);
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
      const tasksFromLocalStorage = JSON.parse(localStorage.getItem('string'));
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
        localStorage.setItem('string', JSON.stringify(tasks));
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
      const taskRef = firebase.database().ref(`users/${uid}/string/${taskKey}`);
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
localStorage.setItem('string', JSON.stringify(updatedTaskState));
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
      const taskRef = firebase.database().ref(`users/${uid}/string/${taskKey}`);
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
localStorage.setItem('string', JSON.stringify(updatedTaskState));



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
    String
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
        String
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

export default String;





