import { useState,useEffect } from 'react'
import { projectAuth } from '../firebase/config'
import {useAuthContext} from '../hooks/useAuthContext'

export const useSignup = () => {
  const [isCancelled,setIsCancelled]=useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const {dispatch}=useAuthContext()

  const signup = async (email, password, displayName) => {
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)
      
      if (!res) {
        throw new Error('Could not complete signup')
      }

      // add display name to user
      await res.user.updateProfile({ displayName })
      //dispatch login action
      dispatch({type:'LOGIN',payload:res.user})

      if(!isCancelled){//until isCancelled isn't true it won't set anything
      setIsPending(false)
      setError(null)
      }
    } 
    catch(err) {
      if(!isCancelled){
      console.log(err.message)
      setError(err.message)
      setIsPending(false)
    }
  }
}
  useEffect(()=>{
    return ()=>setIsCancelled(true)},[])//use a clean up function so that un error won't appear when change from singup to login
 

  return { signup, error, isPending }
}