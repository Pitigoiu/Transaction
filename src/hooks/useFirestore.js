import { useEffect, useReducer, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  succes: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        isPending: true,
        document: null,
        succes: false,
        error: null,
      }; //reset the state
    case "ADDED_DOC":
      return {
        isPending: false,
        document: action.payload,
        succes: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        succes: false,
        error: action.payload,
      };
      case "DELETE":
        return{
          isPending:false,
          document:null,
          succes:true,
          error:null
        }
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  //collection refference
  const ref = projectFirestore.collection(collection);
  //only dispatch is not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  //add document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt: createdAt });
      dispatchIfNotCancelled({ type: "ADDED_DOC", payload: addedDocument });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
      console.log(err.message);
    }
  };

  //delete document
  const deleteDocument = async (id) => {
    dispatch({type:"DELETE"})
    try {
      await ref.doc(id).delete()
      dispatchIfNotCancelled({type:'DELETE'})
    } catch (err) {
      dispatchIfNotCancelled({type:'ERROR',payload:'Could not delete'})
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { addDocument, deleteDocument, response };
};
