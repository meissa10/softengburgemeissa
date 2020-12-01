import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
function UserResponses() {
 
  const [dataList, setDataList] = useState(/* initial state= */ []);
  function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}

  useEffect(
    () => {
      // get the users collection
      const unsubscribe = firebase.firestore().collection("user")
      // get the most current verion of the collection
      .onSnapshot((querySnapshot) => {
          let firestoreData = [];
          // for each document in the collection, add the name, hometown, and
          // id to the firestoreData array
          querySnapshot.forEach(function(doc) {
            firestoreData.push({Name: doc.data().Name, Score: doc.data().Score});
          });
          // update the state
          firestoreData.sort(compareSecondColumn)
          
          setDataList(firestoreData);
          
        });
        // this stops the snapshot watching process when the component is deleted
        // or cleaned up
        return () => unsubscribe()

    },
    []
  )

  return (
    <div>
       <ul> 
         

        {dataList.map((data) => {
          return (<li >{data.Name}, {data.Score}</li>)
        })}
      </ul>
    </div>);
 };
 
export default UserResponses;