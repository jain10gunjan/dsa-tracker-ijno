import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"; // Import Firestore
import firebaseConfig from "./Firebase/firebase.config";
import SignIn from "./pages/SignIn";
import toast, { Toaster } from "react-hot-toast";
import Localbase from "localbase";

firebase.initializeApp(firebaseConfig);

const tasks = {
  task1: {
    name: "This is the question 1",
    topic: "arrays",
    completed: false,
  },
  task2: {
    name: "Drinking soda Percentage",
    topic: "arrays",
    completed: false,
  },
  task3: {
    name: "Eating Percentage",
    topic: "arrays",
    completed: false,
  },
  task4: {
    name: "Swimming",
    topic: "arrays",
    completed: false,
  },
  task5: {
    name: "Walking",
    topic: "arrays",
    completed: false,
  },
  task6: {
    name: "Reading Percentage",
    topic: "arrays",
    completed: false,
  },
  task7: {
    name: "Writing",
    topic: "arrays",
    completed: false,
  },
  task8: {
    name: "Cooking",
    topic: "arrays",
    completed: false,
  },
  task9: {
    name: "Cleaning Percentage",
    topic: "arrays",
    completed: false,
  },
  task10: {
    name: "Exercising",
    topic: "arrays",
    completed: false,
  },
  task11: {
    name: "firebase",
    topic: "arrays",
    completed: false,
  },
  task12: {
    name:
      "A vernier calliper has 1 mm mark on the main scale. It has 20 equal divisions on the vernier scalewhich match with 16 main scale divisions. For this vernier callipers, the least count is ",
    option1: "0.02 mm",
    option2: "0.03 mm",
    option3: "0.04 mm",
    option4: "0.01 mm",
  },
};

function Percentage() {
  const [user, setUser] = useState(null);
  const [percentageTaskState, setPercentageTaskState] = useState([]);
  const [localbase, setLocalbase] = useState(null);

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
      console.log("effect 1 working");
      const uid = user.uid;
      const db = firebase.firestore(); // Get a Firestore instance
      const docRef = db
        .collection("users")
        .doc(uid)
        .collection("percentage")
        .doc("tasks");
      docRef.get().then((doc) => {
        if (doc.exists) {
          setPercentageTaskState(doc.data());
        } else {
          setPercentageTaskState(tasks);
          docRef.set(tasks);
        }
      });
      const localbase = new Localbase("percentage"); // Create a Localbase instance
      setLocalbase(localbase);
    } else {
      setPercentageTaskState([]);
    }
  }, [user]);

  useEffect(() => {
    if (localbase) {
      console.log("effect 3 working");
      localbase.collection("tasks").set(percentageTaskState);
    }
  }, [percentageTaskState, localbase]);

  const handleCheckboxClick = (event) => {
    const taskId = event.target.value;
    setPercentageTaskState((prevState) => {
      const newState = { ...prevState };
      newState[taskId].completed = !newState[taskId].completed;
      return newState;
    });
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Percentage Tasks</h1>
          <ul>
            {Object.keys(percentageTaskState).map((taskId) => {
              const task = percentageTaskState[taskId];
              return (
                <li key={taskId}>
                  <label>
                    <input
                      type="checkbox"
                      value={taskId}
                      checked={task.completed}
                      onChange={handleCheckboxClick}
                    />
                    {task.name}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <SignIn />
      )}
      <Toaster />
    </div>
  );
}

export default Percentage;
