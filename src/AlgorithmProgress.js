import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

function AlgorithmProgress() {
  const [algorithm, setAlgorithm] = useState("");
  const [progress, setProgress] = useState("");

  const handleAlgorithmChange = e => {
    setAlgorithm(e.target.value);
  };

  const handleProgressChange = e => {
    setProgress(e.target.value);
  };

  const handleSave = () => {
    const db = firebase.firestore();
    const userId = firebase.auth().currentUser.uid;
    db.collection("users").doc(userId).collection("algorithmProgress").add({
      algorithm: algorithm,
      progress: progress
    });
    setAlgorithm("");
    setProgress("");
  };

  return (
    <div>
      <h2>Algorithm Progress</h2>
      <form>
        <label>
          Algorithm:
          <input type="text" value={algorithm} onChange={handleAlgorithmChange} />
        </label>
        <br />
        <label>
          Progress:
          <input type="text" value={progress} onChange={handleProgressChange} />
        </label>
        <br />
        <button type="button" onClick={handleSave}>Save</button>
      </form>
    </div>
  );
}

export default AlgorithmProgress;
