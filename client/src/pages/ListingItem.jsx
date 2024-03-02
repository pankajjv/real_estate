import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { MdLocationOn } from "react-icons/md";
function ListingItem({ listing }) {
    const { _id } = listing

    return (
        <div className='border md:w-[280px] w-full rounded-lg bg-white overflow-hidden'>
            <Link to={`/listing/${_id}`}>
                <img className='h-[190px] object-cover w-full hover:scale-105 transition-scale duration-300' src={listing.imageUrls[0]} alt='listing-404' />
                <div className='p-3 flex flex-col justify-between gap-2'>
                    <span className='font-semibold text-slate-700 truncate text-lg'>{listing.name}</span>
                    <div className='text-slate-600 text-sm flex flex-col gap-1'>
                        <div className='flex items-center'>
                            <MdLocationOn className='text-green-600'/>
                            <span className='truncate'>{listing.address}</span>
                        </div>
                        <span className='line-clamp-2'>{listing.description}</span>
                    </div>
                    <span className='font-semibold text-slate-500'>
                        ${listing.regularPrice}<span>{listing.type === 'rent' && '/ month'}</span>
                    </span>
                    <div className='text-slate-700 font-semibold text-sm flex gap-2'>
                        <span>{listing.bedrooms}<span className='ml-1'>{+listing.bedrooms > 1 ? 'Beds' : 'Bed'}</span></span>
                        <span>{listing.bathrooms}<span className='ml-1'>{+listing.bedrooms > 1 ? 'Baths' : 'Bath'}</span></span>
                    </div>
                </div>
            </Link>

        </div>
    )
}

export default ListingItem
