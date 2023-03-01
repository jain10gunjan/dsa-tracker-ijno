import React, { useEffect, useState } from 'react';
import {db} from './Firebase/firebase.config'
import {collection, getDocs} from 'firebase/firestore'; 

const CreateDSATasks = ({ tasks, handleTaskChange }) => {

  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, "percentage");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      const totalQuestions = setUsers.length;

    }

    getUsers()
  }, [])

  return (
    <div>
      <h2>Task List</h2>
      {users.map((user) => {return <div>
        <form>
        <label>
        <input type="checkbox" checked={tasks} onChange={handleTaskChange} />
        Question: {user.question}
        </label>
        console.log(totalQuestions);

        </form>
      </div>})}
      
    </div>
  );
};

export default CreateDSATasks;
