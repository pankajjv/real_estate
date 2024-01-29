import React from 'react'
import {Link} from 'react-router-dom'
export default function SignUp() {
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-2xl text-center font-semibold'>Sign Up</h1>
      <form className='flex flex-col gap-4 my-7'>
        <input type="text" placeholder='Username' className='p-2 rounded-lg hover:outline-none'/>
        <input type="text" placeholder='Email' className='p-2 rounded-lg hover:outline-none'/>
        <input type="text" placeholder='Password' className='p-2 rounded-lg hover:outline-none'/>
        <button className='p-2 rounded-lg bg-slate-800 text-white hover:opacity-80'>Sign Up</button>
        {/* <button className='p-2 rounded-lg bg-red-800 text-white hover:opacity-80'>Continue With Google</button> */}
      <div>
      <span>Have an account? <span className='text-blue-700'><Link to='/sign-in'>Sign in</Link></span></span>
      </div>

      </form>
    </div>
  )
}
