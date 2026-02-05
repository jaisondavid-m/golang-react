import React, { useState } from 'react'
import api from '../api/axios'

function Register() {
    const [userid,setUserid]=useState("")
    const [password,setPassword]=useState("")
    const [message,setMessage]=useState("")
    const [error,setError]=useState("")

    const handleRegister = async(e)=>{
        e.preventDefault();
        setMessage("");
        setError("");
        try {
            const res =await api.post("/register",{userid,password})
            setMessage(res.data.message)
        } catch (err) {
            setError(err.response?.data?.error || "Register failed")
        }
    }

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleRegister}>

        <input type="text" placeholder="Set Your User ID"value={userid} onChange={(e) => setUserid(e.target.value)}/>
        <input type="password" placeholder="Set Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Login</button>

      </form>

      {message && <p className='text-green-500'>{message}</p>}
      {error && <p className='text-red-500'>{error}</p>}
      
    </div>
  )
}

export default Register