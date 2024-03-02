import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { MdLocationOn } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { GiFurnace } from "react-icons/gi";
import { TbLocationShare } from "react-icons/tb";
import { FaParking } from "react-icons/fa";
import Contact from '../components/Contact';
import {useSelector} from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

function Listing() {
    const { id } = useParams();
    SwiperCore.use([Navigation]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [listing, setListing] = useState(null)
    const [copied, setCopied] = useState(null)
    const [contact, setContact] = useState(false)
    const {currentUser} = useSelector(state => state.user);



    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const data = await fetch(`http://localhost:3001/api/listing/get/${id}`,
                    {
                        method: 'GET',
                        credentials: 'include'
                    });
                const listingData = await data.json();
                console.log('data', listingData)
                if (listingData.success == false) {
                    setError(true);
                    setLoading(false)
                    return
                }
                setListing(listingData);
                setLoading(false)
                setError(false);

            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }
        fetchListing();
    }, [id])
    console.log(listing)

    return (
        <main>
            {loading && <p className='text-center my-5 text-2xl text-slate-700'>Loading...</p>}
            {error && (
                <div>
                    <p className='text-center my-5 text-2xl'>Something went wrong!</p>
                    <Link to={'/'}><p className='text-center text-blue-800'>Go to home</p></Link>
                </div>
            )}

            {listing && !loading && !error && (
                <div>

                    <Swiper navigation>
            {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                      background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

                    <div className='max-w-4xl p-3 mx-auto gap-3 flex flex-col'>
                        <div>
                            <div className='font-semibold flex'>
                                <p className='uppercase'>{listing.name} - </p>
                                <p>${listing.offer ? listing.discountedPrice : listing.regularPrice}</p>
                                <p>{listing.type == 'rent' ? '/month' : ''}</p>
                            </div>
                            <div className='flex items-center gap-1 text-sm'>
                                <MdLocationOn className='text-green-600' />
                                <p>{listing.address}</p>
                            </div>

                        </div>

                        <div className='flex gap-2 my-5'>
                            <p className='sm:max-w-[150px] max-w-[100px] text-center text-sm text-white rounded-lg w-full bg-red-700 p-1'>{listing.type == 'rent' ? 'For Rent' : 'For Sale'}</p>
                            <p className='sm:max-w-[150px] max-w-[100px] text-center text-sm text-white rounded-lg w-full bg-green-700 p-1'>{listing.offer && +listing.regularPrice - +listing.discountedPrice} OFF</p>
                        </div>
                        <div>
                            <span className='font-semibold'>Description - <span className='font-normal'>{listing.description}</span></span>
                        </div>
                        <div className='flex gap-3 flex-wrap text-green-700'>
                            <div className='flex gap-1 items-center'>
                                <FaBed />
                                <p>{listing.bedrooms}<span>{listing.bedrooms > 1 ? 'beds' : 'bed'}</span></p>
                            </div>
                            <div className='flex gap-1 items-center'>
                                <FaBath />
                                <p>{listing.bathrooms}<span>{listing.bathrooms > 1 ? 'baths' : 'bath'}</span></p>
                            </div>
                            <div className='flex gap-1 items-center'>
                                <FaParking />
                                <span>{listing.parking ? 'Parking Spot' : 'No Parking'}</span>
                            </div>
                            <div className='flex gap-1 items-center'>
                                <GiFurnace />
                                <span>{listing.furnished ? 'Furnished' : 'Unfurnished'}</span>
                            </div>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <p className='p-1 flex bg-green-600 max-w-[170px] text-white rounded items-center gap-2'
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href)
                                    setCopied(true);
                                    setTimeout(() => {
                                        setCopied(false)
                                    }, 2000);
                                }}
                            >Community Share<span className='text-lg'><TbLocationShare /></span></p>
                            {copied && (
                                <p className='text-lg'>Link Copied</p>
                            )}
                        </div>
                        {
                            !currentUser && <p className='text-sm text-red-700'>SignIn to contact with Landlord</p>
                        }
                        {
                            currentUser && currentUser._id != listing.useRef && !contact &&
                            <button onClick={()=>setContact(true)} className='bg-slate-700 p-2 rounded-lg text-white hover:opacity-90'>Contact Landlord</button>
                        }
                        {
                            contact && <Contact listing= {listing}/>
                        }

                    </div>
                </div>
            )}
        </main>
    )
}

export default Listing
