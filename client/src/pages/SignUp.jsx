import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
export default function SignUp() {
  const [formdata, setFormdata] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading]= useState(null);
  const navigate = useNavigate();

  function handleChange(e){
    setFormdata({
      ...formdata, 
      [e.target.id] : e.target.value
  })
  }

  const handleSubmit =async (e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/auth/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata)
      })
      const res = await response.json();
      console.log(res)
      if(res.success === 'false'){
        setLoading(false)
        setError(res.message)
        return
      }
        setLoading(false);
        setError('');
        navigate('/signin')

      
    } catch (error) {
      setLoading(false)

    }



  }

  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-2xl text-center font-semibold'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 my-7'>
        <input type="text" id='username' placeholder='Username' className='p-2 rounded-lg hover:outline-none' onChange={handleChange}/>
        <input type="email" id='email' placeholder='Email' className='p-2 rounded-lg hover:outline-none' onChange={handleChange}/>
        <input type="password" id='password' placeholder='Password' className='p-2 rounded-lg hover:outline-none' onChange={handleChange}/>
        <button type='submit' className='p-2 rounded-lg bg-slate-800 text-white hover:opacity-80'>{loading ? 'Loading' : 'Sign Up'}</button>
        {/* <button className='p-2 rounded-lg bg-red-800 text-white hover:opacity-80'>Continue With Google</button> */}
      <div>
      <span>Have an account? <span className='text-blue-700'><Link to={'/sign-in'}>Sign in</Link></span></span>
      </div>
      <div>
        {error && <span className='text-sm text-red-500 '>{error}</span> }
      </div>

      </form>
    </div>
  )
}
