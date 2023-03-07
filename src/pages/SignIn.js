import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import GoogleButton from 'react-google-button'

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  return (
    <GoogleButton onClick={signInWithGoogle} style={{justifyContent: 'center'}}/>
  );
}

export default SignIn;
