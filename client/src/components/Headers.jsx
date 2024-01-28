import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
export default function Headers() {
  return (
    <header className='p-4 bg-slate-200'>
        <div className='flex max-w-6xl items-center justify-between mx-auto'>
            <Link to='/'>
                <h2 className='font-bold flex flex-wrap'>
                    <span className='text-slate-500'>Sahand</span>
                    <span className='text-slate-800'>Estate</span>
                </h2>
            </Link>
            <form className='flex items-center p-3 bg-slate-100 rounded'>
                <input type='text' className='bg-transparent focus:outline-none w-24 sm:w-64' placeholder='Search...'/>
                <FaSearch className='text-slate-600'/>
            </form>

            <ul className='flex gap-4 text-slate-600'>
                <Link to='/'><li className='hidden sm:inline hover:underline'>Home</li></Link>
                <Link to='/about'><li className='hidden sm:inline hover:underline'>About</li></Link>
                <Link to='/sign-in'><li>Sign In</li></Link>
            </ul>

        </div>
        
    </header>
    )
}
