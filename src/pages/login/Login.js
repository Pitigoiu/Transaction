import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin';
import styles from './Login.module.css'

export default function Login() {
 const [email,setEmail]=useState('');
 const [pass,setPass]=useState('');
 const {login,error,isPending}=useLogin()
 
 const handleSubmit=(e)=>{
  e.preventDefault()
  login(email,pass)
 }
  return (
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <h2>Login</h2>
      <label >
        <span>Email:</span>
        <input type="email" 
        onChange={e=>setEmail(e.target.value)}
        value={email}
        />
      </label>
      <label >
        <span>Password:</span>
        <input type="password"
        onChange={e=>setPass(e.target.value)}
        value={pass}
        />
      </label>
      {!isPending&&<button className='btn'>Login</button>}
      {isPending&&<button className='btn' disabled>Loading</button>}
      {error&&<p>{error}</p>}
    </form>
  )
}
