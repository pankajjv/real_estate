import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
    const authenticated = useSelector(state => state.user.currentUser);
    console.log('authenticated', authenticated)
  return (
    <div>
     {authenticated ? <Outlet/> : <Navigate to={'sign-in'}/>}
    </div>
  )
}

export default PrivateRoute
