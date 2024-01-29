import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function SignIn() {
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
      const response = await fetch('http://localhost:3001/api/auth/signin',
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
        navigate('/')

      
    } catch (error) {
      setLoading(false)

    }



  }

  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-2xl text-center font-semibold'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 my-7'>
        <input type="email" id='email' placeholder='Email' className='p-2 rounded-lg hover:outline-none' onChange={handleChange}/>
        <input type="password" id='password' placeholder='Password' className='p-2 rounded-lg hover:outline-none' onChange={handleChange}/>
        <button type='submit' className='p-2 rounded-lg bg-slate-800 text-white hover:opacity-80'>{loading ? 'Loading' : 'Sign In'}</button>
        {/* <button className='p-2 rounded-lg bg-red-800 text-white hover:opacity-80'>Continue With Google</button> */}
      <div>
      <span>Dont have an account? <span className='text-blue-700'><Link to={'/signup'}>Sign up</Link></span></span>
      </div>
      <div>
        {error && <span className='text-sm text-red-500 '>{error}</span> }
      </div>

      </form>
    </div>
  )
}
