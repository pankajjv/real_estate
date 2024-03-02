import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Headers() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const authenticated = useSelector(state => state.user.currentUser);

    const handleSubmit = (e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm)
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
    }
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromURL = urlParams.get('searchTerm');
        if(searchTermFromURL){
            setSearchTerm(searchTermFromURL);
        }
    }, [location.search])

    
  return (
    <header className='p-4 bg-slate-200'>
        <div className='flex max-w-6xl items-center justify-between mx-auto'>
            <Link to='/'>
                <h2 className='font-bold flex flex-wrap'>
                    <span className='text-slate-500'>Sahand</span>
                    <span className='text-slate-800'>Estate</span>
                </h2>
            </Link>
            <form onSubmit={handleSubmit} className='flex items-center p-3 bg-slate-100 rounded'>
                <input type='text' value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)} className='bg-transparent focus:outline-none w-24 sm:w-64' placeholder='Search...'/>
                <button type='submit' >
                    <FaSearch className='text-slate-600'/>
                </button>
            </form>

            <ul className='flex gap-4 text-slate-600 items-center'>
                <Link to='/'><li className='hidden sm:inline hover:underline'>Home</li></Link>
                <Link to='/about'><li className='hidden sm:inline hover:underline'>About</li></Link>
                <span>{authenticated ? <Link to='/profile'><img className='rounded-full h-8 w-8' src={authenticated.avatar} alt='404img'/></Link>: <Link to={'/sign-in'}><li> Sign In</li></Link>}</span>


            </ul>

        </div>
    </header>
    )
}
