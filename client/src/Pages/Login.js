import React, { useState } from 'react'
import api from '../api/axios'

function Login() {
    const [userid,setUserid]=useState("")
    const [password,setPassword]=useState("")
    const [message,setMessage]=useState("")
    const [error,setError]=useState("")

    const handleLogin = async(e)=>{
        e.preventDefault();
        setMessage("");
        setError("");
        try {
            const res =await api.post("/login",{userid,password})
            setMessage(res.data.message)
        } catch (err) {
            setError(err.response?.data?.error || "Login failed")
        }
    }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>

        <input type="text" placeholder="Enter Your User ID"value={userid} onChange={(e) => setUserid(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Login</button>

      </form>

      {message && <p className='text-green-500'>{message}</p>}
      {error && <p className='text-red-500'>{error}</p>}
      
    </div>
  )
}

export default Login