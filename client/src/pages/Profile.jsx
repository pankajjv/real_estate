import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, signoutUserFailure, signoutUserSuccess } from '../redux/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
  const {currentUser, loading, error} = useSelector(state=> state.user)
  const dispatch = useDispatch();
  const [formdata, setFormdata] = useState({})
  const [userListings, setUserListings] = useState(undefined)
  const [showListingError, setShowListingError] = useState('')

  const [updatesuccess, setUpdateSuccess] = useState(false)
  const navigate = useNavigate();
  
  
  const handleChange =(e)=>{
    setFormdata({
      ...formdata,
      [e.target.id] : e.target.value
    })
  }

  const handleUserUpdate = async(e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart())
      const res = await fetch(`http://localhost:3001/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata),
        credentials: 'include',
      })

      const result = await res.json();
      if(result.success== false){
        return dispatch(updateUserFailure(result.message))
      }
      console.log(result)
      setUpdateSuccess(true)
      dispatch(updateUserSuccess(result)) 
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleUserDelete =async()=>{
    dispatch(deleteUserStart())
    try {
      const result = await fetch(`http://localhost:3001/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const res = await result.json();
      if(res.success == false){
      return dispatch(deleteUserFailure(result.message))
      }

      dispatch(deleteUserSuccess())
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleUserSignOut =async()=>{
    try {
      const result = await fetch(`http://localhost:3001/api/auth/signout`,{
        method: 'GET',
        credentials: 'include'
      })
      const res = await result.json();
      if(res.success == false){
        return dispatch(signoutUserFailure(result.message))
      }
      console.log(result)

      dispatch(signoutUserSuccess())

    } catch (error) {
      dispatch(signoutUserFailure(error.message));
    }
  }

  const handleShowListing = async()=>{
    setShowListingError(false)
    try {
      const result = await fetch(`http://localhost:3001/api/user/listing/${currentUser._id}`,{
        method: 'GET',
        credentials:'include'
      })
      const data = await result.json();
      if(data.success == false){
        setShowListingError(data.message)
        return
      }
      if(data == []){
        console.log('emptyyy')
      }
      setUserListings(data)
      console.log(data)
    } catch (error) {
      setShowListingError(error.message)
    }
  }
  const handleDeleteListing =async(listingId)=>{
    try {
      const result = await fetch(`http://localhost:3001/api/listing/delete/${id}`, {
        method:'DELETE',
        credentials:'include'
      })
      const data = await result.json();
      if(data.success == false){
        console.log(data.message);
      }
      const updatedlisting = userListings.filter((listing)=> listing._id != listingId)
      setUserListings(updatedlisting);

    } catch (error) {
      console.log(error.message)
    }
  }

  return(
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-3xl text-center my-7'>Profile</h1>
      <div className='mt-3'>
        <img src={currentUser?.avatar} alt='404 img' className='rounded-full h-24 w-24 mx-auto cursor-pointer'/>

      </div>
      <form onSubmit={handleUserUpdate} className='flex flex-col gap-4 mt-3'>
        <input 
        type="text" 
        id='username'  
        defaultValue={currentUser.username} 
        onChange={handleChange} 
        className='p-2 rounded-lg focus:outline-none'/>

        <input type="text" 
        id='email' 
        defaultValue={currentUser.email} 
        onChange={handleChange} 
        className='p-2 rounded-lg focus:outline-none'/>

        <input 
        type="password" 
        id='password' 
        placeholder='Password' 
        onChange={handleChange} 
        className='p-2 rounded-lg focus:outline-none'/>

        <button disabled={loading} type='submit' className='bg-slate-600 p-2 rounded-lg text-white hover:opacity-85'>{loading ? 'Updating': 'Update'}</button>
        <button onClick={()=>navigate('/create-listing')} className='bg-green-600 p-2 rounded-lg text-white hover:opacity-85'>CREATE LISTING</button>
        <div className='justify-between flex'>
        <span className='text-red-600 cursor-pointer' onClick={handleUserDelete}>Delete Account</span>
        <span className='text-red-600 cursor-pointer' onClick={handleUserSignOut}>Sign Out</span>
        </div>
        <button className='text-green-700 font-semibold' type='button' onClick={handleShowListing}>Show Listings</button>

        <span className='text-red-600 text-center'>{showListingError ? showListingError : ''}</span>
        <span className='text-red-600 text-center'>{error ? error : ''}</span>
        <span className='text-green-700 text-center uppercase'>{updatesuccess ? 'User is updated successfully!' : ''}</span>
      </form>
        {userListings && userListings.length > 0 && (
          <div className=' flex flex-col gap-4'>
            {userListings.map((listing, key)=> 
            (
              <div key={key} className='border p-3 rounded gap-3 flex items-center'>
                <Link to={`/listing/${listing._id}`}>
                  <img src={listing.imageUrls[0]} className='h-16 w-16 object-contain' alt='listing-cover'/>
                </Link>
                <Link to={`/listing/${listing._id}`}  className='flex-1 '>
                  <p className='font-semibold hover:underline truncate'>{listing.name}</p>

                </Link>
                <div className='flex flex-col'>
                  <button className='uppercase text-red-700' onClick={()=>handleDeleteListing(listing._id)}>delete</button>
                  <button className='uppercase text-green-700' onClick={()=>navigate(`/edit-listing/${listing._id}`)}>edit</button>
                </div>

              </div>
            ))}
          </div>
        )
        }

    </div>
  )
}
