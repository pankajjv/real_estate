import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import GoogleAuth from '../components/GoogleAuth';

export default function SignUp() {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({});
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);


  const handleForm =(e)=>{

    setFormdata({
      ...formdata,
      [e.target.id] : e.target.value
    })
  }

  const handleSignUp = async(e)=>{
    e.preventDefault();
    setLoading(true)
    const res = await fetch('http://localhost:3001/api/auth/signup', {
      method: 'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(formdata)
      
    })
    const result = await res.json();
    setLoading(false)
    console.log(result)
    if(result?.success == false){
      return setError(result.message)
    }
    navigate('/sign-in')
  }



  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-2xl text-center font-semibold'>Sign Up</h1>
      <form  className='flex flex-col gap-4 my-7' onSubmit={handleSignUp}>
        <input type="text" id='username' placeholder='Username' className='p-2 rounded-lg hover:outline-none'  onChange={handleForm}/>
        <input type="email" id='email' placeholder='Email' className='p-2 rounded-lg hover:outline-none'  onChange={handleForm}/>
        <input type="password" id='password' placeholder='Password' className='p-2 rounded-lg hover:outline-none'  onChange={handleForm}/>
        <button type='submit' className='p-2 rounded-lg bg-slate-800 text-white hover:opacity-80'>{loading ? 'Loading...' : 'Sign Up'}</button>
        {/* <GoogleAuth/> */}

      <div>
      <span>Have an account? <span className='text-blue-700'><Link to={'/sign-in'} >Sign in</Link></span></span>
      </div>
      <div>
        {error && <span className='text-sm text-red-500 '>{error}</span> }
      </div>

      </form>
    </div>
  )
}
