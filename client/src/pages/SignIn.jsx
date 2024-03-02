import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import {useDispatch, useSelector} from "react-redux";
import GoogleAuth from '../components/GoogleAuth';
export default function SignIn() {

  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({});
  const loading = useSelector(state=> state.user.loading)
  const error = useSelector(state=> state.user.error)


  
  const dispatch = useDispatch()
  
  const handleChange =(e)=>{
    setFormdata({
      ...formdata,
      [e.target.id] : e.target.value
  })
  }


  const handleSubmit =async(e)=>{
    e.preventDefault();

    try {
      dispatch(signInStart());
      const user_signin = await fetch('http://localhost:3001/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata),
        credentials: 'include',
      })
      const res= await user_signin.json();
      console.log(res)
  
      
      if(res?.success == false){
        return dispatch(signInFailure(res.message))
      }
      dispatch(signInSuccess(res));
      navigate('/')
      
    } catch (error) {
      dispatch(signInFailure(error.message))
    }



  }
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-2xl text-center font-semibold'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 my-7'>
        <input type="email" id='email' placeholder='Email' className='p-2 rounded-lg hover:outline-none' onChange={handleChange}/>
        <input type="password" id='password' placeholder='Password' className='p-2 rounded-lg hover:outline-none' onChange={handleChange}/>
        <button type='submit' className='p-2 rounded-lg bg-slate-800 text-white hover:opacity-80'>{loading ? 'processing...' : 'Sign In'}</button>
        <GoogleAuth/>
        
      </form>
        {error && <span className='text-sm text-red-500 '>{error}</span> }

      <div>
      <span>Dont have an account? <span className='text-blue-700'><Link to={'/signup'}>Sign up</Link></span></span>
      </div>
    </div>
  )
}
