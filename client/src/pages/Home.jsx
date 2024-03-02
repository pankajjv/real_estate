import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import ListingItem from './ListingItem';


export default function Home() {
  SwiperCore.use([Navigation]);
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [images, setImages] = useState([]);
  console.log('---', images)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/listing/get?limit=5');
        const data = await res.json();
        if (data.success == false) {
          return console.log(data.message);
        }
        setImages(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchImages();
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        if (data.success == false) {
          return console.log(data.message);
        }
        setOfferListings(data);
      } catch (error) {
        console.log(error.message)
      }
      fetchRentListings();
    }
    fetchOfferListings();

    const fetchRentListings = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        if (data.success == false) {
          return console.log(data.message);
        }
        setRentListings(data);
      } catch (error) {
        console.log(error.message)
      }
      fetchSaleListings();
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/listing/get?type=sell&limit=4');
        const data = await res.json();
        if (data.success == false) {
          return console.log(data.message);
        }
        setSaleListings(data);
      } catch (error) {
        console.log(error.message)
      }
    };
  }, []);
  return (
    <div>
      {/* banner  */}
      <div className='max-w-6xl p-28 px-2 mx-auto gap-5 flex flex-col'>
        <div>
          <span className='text-6xl text-slate-700 font-semibold'>Find your next <span className='text-slate-500'>perfect</span><br /> place with ease</span>
        </div>

        <div className='flex flex-col text-sm text-slate-500'>
          <span>Sahand estate will help you and your home fast, easy and comfertable.</span>
          <span>Our expert support is always available.</span>
        </div>

        <Link to={`/search`}>
          <span className='text-blue-800 text-sm font-semibold'>Let's start now...</span>
        </Link>
      </div>

      {/* swiper  */}
      <div>
        <Swiper navigation>
          {images.map((url) => (
            <SwiperSlide key={url._id}>
              <div
                className='h-[550px]'
                style={{
                  background: `url(${url.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* for type  */}

      <div className='max-w-7xl mx-auto px-1 p-10 flex flex-col gap-9'>

        {offerListings.length > 0 &&
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col'>
              <span className='text-slate-700 font-semibold text-lg'>Recent Offers</span>
              <Link to={`/search?offer=true`} className='text-sm text-blue-800'>show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-3 flex-start'>
              {offerListings.map((listing) =>
                <ListingItem listing={listing} />
              )}
            </div>
          </div>

        }
        {rentListings.length > 0 &&
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col'>
              <span className='text-slate-700 font-semibold text-lg'>Recent places for Rent</span>
              <Link to={`/search?type=rent`}  className='text-sm text-blue-800'>show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-3 flex-start'>
              {rentListings.map((listing) =>
                <ListingItem listing={listing} />
              )}
            </div>
          </div>

        }
        {saleListings.length > 0 &&
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col'>
              <span className='text-slate-700 font-semibold text-lg'>Recent places for sale</span>
              <Link to={`/search?type=sell`}  className='text-sm text-blue-800'>show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-3 flex-start'>
              {saleListings.map((listing) =>
                <ListingItem listing={listing} />
              )}
            </div>
          </div>

        }

      </div>

    </div>
  )
}
