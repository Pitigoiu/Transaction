import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogout=()=>{
    const [isCancelled,setIsCancelled]=useState(false)
    const [error,setError]=useState(null)
    const [isPending,setIsPending]=useState(false)
    const {dispatch}=useAuthContext()

    const logout=async()=>{
        setError(null)
        setIsPending(true)
        //sign the user out
        try {
            await projectAuth.signOut()
            //dispatch logout action
            dispatch({type:'LOGOUT'})//payload can be null here because we don't set a user

            //update state
            if(!isCancelled){//until isCancelled isn't true it won't set anything
            setIsPending(false)
            setError(null)
        }
        } catch (err) {
            if(!isCancelled){
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
            }
        }
    }
    useEffect(()=>{
        return ()=>setIsCancelled(true)//use a clean up function so that un error won't appear when change from singup to login
    },[])
    return {logout,error,isPending}
}