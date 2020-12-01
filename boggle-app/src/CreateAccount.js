import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import firebase from 'firebase'

function TextInput({score, user}) {
  function getUserInput() {

    // This user was made when we logged in with our login button, and the google auth provider also returns a uid
    // with each user.
    if (user && user.uid) {
      console.log(user, user.uid)
      // Here we're getting the users collection and writing to a document which was named with the uid 
      firebase.firestore().collection("user").doc(user.uid)
      // set the field to be the prompt response the user made, and merge the documents
      .set({Score: score}, { merge: true })
      .then(() => { // if that was successful, log accordingly
        console.log("Document written!");
      }).catch((error) => {
        // if it failed, log accordingly
        console.error("Error adding document: ", error);
      });


      firebase.firestore().collection("user").doc(user.uid)
      .set({Name: user.displayName}, { merge: true})
    }
    return score;
    }
  return (
    <div>
      <p >
          Your score is: {getUserInput()}.
      </p>
    </div>
  )
}

export default TextInput;