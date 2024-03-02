import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListingItem from './ListingItem'
function Search() {
    // const [showmore, setShowmore] = useState(3);
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        offer: false,
        furnished: false,
        parking: false,
        type: 'all',
        // limit: showmore
    })
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState(undefined);
    const navigate = useNavigate();
    console.log(listings)

    const handleChange = (e) => {
        if (e.target.id === 'search') {
            setSidebardata({
                ...sidebardata,
                searchTerm: e.target.value
            })
        }
        if (e.target.id === 'rent' || e.target.id === 'sell' || e.target.id === 'all') {
            setSidebardata({
                ...sidebardata,
                type: e.target.id
            })
        }
        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setSidebardata({
                ...sidebardata,
                [e.target.id]: e.target.checked
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebardata.searchTerm || '')
        urlParams.set('parking', sidebardata.parking)
        urlParams.set('furnished', sidebardata.furnished)
        urlParams.set('type', sidebardata.type)
        urlParams.set('offer', sidebardata.offer)
        // urlParams.set('limit', sidebardata.limit)

        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
    }
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const parkingfromurl = urlParams.get('parking')
        const furnishedfromurl = urlParams.get('furnished')
        const offerfromurl = urlParams.get('offer')
        const typefromurl = urlParams.get('type')
        const searchtermfromurl = urlParams.get('searchTerm')

        setSidebardata({
            searchTerm: searchtermfromurl || '',
            parking: parkingfromurl === 'true' ? true : false,
            furnished: furnishedfromurl === 'true' ? true : false,
            offer: offerfromurl === 'true' ? true : false,
            type: typefromurl || 'all'
        })
        const fetchdata = async () => {
            const urlParams = new URLSearchParams(location.search)
            const searchQuery = urlParams.toString();
            try {
                setLoading(true)
                const res = await fetch(`http://localhost:3001/api/listing/get?${searchQuery}`);
                const data = await res.json();
                setListings(data);
                setLoading(false)

            } catch (error) {
                console.log(error.message)
            }
        }
        fetchdata();

    }, [location.search])
    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 md:min-h-screen md:border-r-2'>
                <form onSubmit={handleSubmit} className=' flex flex-col gap-6'>
                    <div className='flex gap-3 items-center'>
                        <label className='font-semibold'>Search Term:</label>
                        <input value={sidebardata.searchTerm} className='p-2 rounded focus:outline-none' type="text" placeholder='Search...' id='search' onChange={handleChange} />
                    </div>

                    <div className='flex  gap-3'>
                        <label className='font-semibold' id='type'>Type: </label>
                        <div className='flex gap-2 flex-wrap'>
                            <div className='items-center flex gap-2'>
                                <input checked={sidebardata.type === 'all'} onChange={handleChange} id='all' type="checkbox" />
                                <span>Rent & Sale</span>
                            </div>
                            <div className='items-center flex gap-2'>
                                <input id='rent' checked={sidebardata.type === 'rent'} type="checkbox" onChange={handleChange} />
                                <span>Rent</span>
                            </div>
                            <div className='items-center flex gap-2'>
                                <input id='sell' checked={sidebardata.type === 'sell'} type="checkbox" onChange={handleChange} />
                                <span>Sell</span>
                            </div>
                            <div className='items-center flex gap-2'>
                                <input id='offer' type="checkbox" checked={sidebardata.offer} onChange={handleChange} />
                                <span>Offer</span></div>
                        </div>
                    </div>
                    <div className='flex gap-3'>
                        <label className='font-semibold' id='type'>Amenities: </label>
                        <div className='flex gap-2'>
                            <div className='flex gap-2'>
                                <input id='parking' type="checkbox" checked={sidebardata.parking} onChange={handleChange} />
                                <span>Parking</span>
                            </div>
                            <div className='flex gap-2'>
                                <input id='furnished' type="checkbox" checked={sidebardata.furnished} onChange={handleChange} />
                                <span>Furnished</span>
                            </div>

                        </div>
                    </div>

                    <button type='submit' className='bg-slate-600 hover:opacity-90 rounded text-white uppercase p-2'>Search</button>

                </form>
            </div>
            <div className='flex flex-col p-4'>
                <span className='my-3 font-semibold text-slate-700 text-xl'>Listing Result:</span>
                {loading && <span className='text-slate-700 text-lg'>Loading...</span>}
                {!loading && listings?.length === 0 && (<span className='text-lg text-slate-700 p-3'>No Listing Found</span>)}
                <div className='flex md:flex-row flex-col flex-wrap gap-5'>
                    {!loading && listings && listings.map(listing => <ListingItem key={listing._id} listing={listing} />)}
                </div>

            </div>
        </div>
    )
}

export default Search
