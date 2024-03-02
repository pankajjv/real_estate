import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
function GoogleAuth() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleAuth =async()=>{
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    try {
      const result = await signInWithPopup(auth, provider)
      console.log(result)
      dispatch(signInStart());
      const res = await fetch('http://localhost:3001/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: result.user.displayName.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
          email: result.user.email,
          photo: result.user.photoURL
        }),
        credentials: 'include'
      });
      const response = await res.json();
      if(response.success == false){
       return dispatch(signInFailure(response.message))
      }
      dispatch(signInSuccess(response))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <button onClick={handleGoogleAuth} type='button' className='rounded-lg bg-red-600 p-2 hover:opacity-85 text-white'>Continue With Google</button>
  )
}

export default GoogleAuth
