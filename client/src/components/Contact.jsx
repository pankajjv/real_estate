import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Contact({listing}) {
    const [landlord, setLandlord] = useState(null);
    const [error, setError]  = useState(null);
    const [message, setMessage]  = useState('');
    console.log(message)

    useEffect(()=>{
        const fetchLandlord = async() =>{
            try {
                const res = await fetch(`http://localhost:3001/api/user/${listing.useRef}`,{
                    method:'GET',
                    credentials: 'include'
                })
                const data = await res.json();
                console.log('fetch',data)
                if(data.success == false){
                    return setError(data.message);
                }
                setError(null)
                setLandlord(data);
            } catch (error) {
                console.log(error)
            }

        }
        fetchLandlord()        
    }, [listing._id]);
    console.log('landlord', landlord)
  return (
    <div>
        {error && <p className='text-sm text-red-800'>{error}</p>}
        {
            landlord && (
                <div className='flex flex-col gap-1'>
                    <p>Contact <span className='font-semibold'>{landlord.username}</span> for <span className='font-semibold'>{listing.name}</span></p>
                    <textarea className='rounded p-2' placeholder='Enter your message here' id='message' onChange={(e)=>setMessage(e.target.value)}/>
                    <Link to={`mailto:${landlord.email}?subject=regarding ${listing.name}&body=${message}`}  className='p-2 bg-slate-700 hover:opacity-90 rounded-lg text-center text-white'>Send Message</Link>
                </div>    

            )
        }
    </div>
  )
}

export default Contact
