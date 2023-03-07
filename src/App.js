import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import firebaseConfig from './Firebase/firebase.config';
import SignIn from './pages/SignIn';
import { Link } from 'react-router-dom'
import Navbar from './components/Navbar';


firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  

  const handleSignOut = () => {
    firebase.auth().signOut();
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
          
          <button onClick={handleSignOut}>Sign Out</button>
          
    </div>
  ) : (
    <div>
      <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}} className='mt-4'>     <SignIn />
</div>
    
    
<div class="max-w-screen-xl mx-auto min-h-sceen p-8 bg-white rounded-lg dark:bg-gray-800 mt-4">
    <p class="text-3xl font-bold text-center text-gray-800 dark:text-white">
        The big team
    </p>
    <p class="mb-12 text-xl font-normal text-center text-gray-500 dark:text-gray-300">
        Meat the best team in wolrd
    </p>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <div class="p-4">
            <div class="flex-col  flex justify-center items-center">
                <div class="flex-shrink-0">
                    
                </div>
                <div class="mt-2 text-center flex flex-col">
                    <span class="text-lg font-medium text-gray-600 dark:text-white">
                        HCF and LCM
                    </span>
                    <span class="text-xs text-gray-400">
                        Click Here
                    </span>
                </div>
            </div>
        </div>
        <div class="p-4">
            <div class="flex-col  flex justify-center items-center">
                <div class="flex-shrink-0">
                    
                </div>
                <div class="mt-2 text-center flex flex-col">
                    <span class="text-lg font-medium text-gray-600 dark:text-white">
                        Percentage
                    </span>
                    <span class="text-xs text-gray-400">
                    <Link to="/percentage" className="rounded">Click Here</Link>
                                        </span>
                </div>
            </div>
        </div>
        <div class="p-4">
            <div class="flex-col  flex justify-center items-center">
                <div class="flex-shrink-0">
                    
                </div>
                <div class="mt-2 text-center flex flex-col">
                    <span class="text-lg font-medium text-gray-600 dark:text-white">
                        HCF and LCM
                    </span>
                    <span class="text-xs text-gray-400">
                        Click Here
                    </span>
                </div>
            </div>
        </div>
        <div class="p-4">
            <div class="flex-col  flex justify-center items-center">
                <div class="flex-shrink-0">
                    
                </div>
                <div class="mt-2 text-center flex flex-col">
                    <span class="text-lg font-medium text-gray-600 dark:text-white">
                        HCF and LCM
                    </span>
                    <span class="text-xs text-gray-400">
                        Click Here
                    </span>
                </div>
            </div>
        </div>
        <div class="p-4">
            <div class="flex-col  flex justify-center items-center">
                <div class="flex-shrink-0">
                    
                </div>
                <div class="mt-2 text-center flex flex-col">
                    <span class="text-lg font-medium text-gray-600 dark:text-white">
                        HCF and LCM
                    </span>
                    <span class="text-xs text-gray-400">
                        Click Here
                    </span>
                </div>
            </div>
        </div>
        <div class="p-4">
            <div class="flex-col  flex justify-center items-center">
                <div class="flex-shrink-0">
                    
                </div>
                <div class="mt-2 text-center flex flex-col">
                    <span class="text-lg font-medium text-gray-600 dark:text-white">
                        HCF and LCM
                    </span>
                    <span class="text-xs text-gray-400">
                        Click Here
                    </span>
                </div>
            </div>
        </div>
        <div class="p-4">
            <div class="flex-col  flex justify-center items-center">
                <div class="flex-shrink-0">
                    
                </div>
                <div class="mt-2 text-center flex flex-col">
                    <span class="text-lg font-medium text-gray-600 dark:text-white">
                        HCF and LCM
                    </span>
                    <span class="text-xs text-gray-400">
                        Click Here
                    </span>
                </div>
            </div>
        </div>
        
        
     
    </div>
</div>

      

      

      
        </div>
        
  )}


  

  
</div>
);
}

export default App;





