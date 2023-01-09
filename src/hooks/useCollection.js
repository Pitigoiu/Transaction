import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection,_query,_orderDate) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  //it won't create an infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const query=useRef(_query).current
  const orderDate=useRef(_orderDate).current
  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    if(query){
      ref=ref.where(...query)//ref will get the transaction from the part where uid equal with the user login
    }
    if(orderDate){
      ref=ref.orderBy(...orderDate)
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        //snapshot represent the collection in that moment and then will send a new snapshot for evry action
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        //update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Could not fetch the data");
      }
    );
    //unsubscribe on unmount
    return () => unsubscribe();
  }, [collection,query,orderDate]);

  return { documents, error };
};
