import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Headers from './components/Headers'
import PrivateRoute from './components/PrivateRoute';
import CreateLisitng from './pages/CreateLisitng'
import EditListing from './pages/EditListing'
import Listing from './pages/Listing'
import Search from './pages/Search'

export default function App() {
  return (
    <BrowserRouter>
      <Headers/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/listing/:id' element={<Listing/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/search' element={<About/>}/>



        <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/create-listing' element={<CreateLisitng/>}/>
          <Route path='/edit-listing/:id' element={<EditListing/>}/>
        </Route>


      </Routes>
    </BrowserRouter>
  )
}
