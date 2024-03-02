import React, { useState } from 'react'
import { getApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CreateLisitng() {
    const [files, setFiles] = useState([])
    const navigate  = useNavigate();
    const currentUser = useSelector(state=> state.user.currentUser);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description:'',
        address:'',
        regularPrice: 50,
        discountedPrice:0,
        bathrooms:1,
        bedrooms:1,
        furnished:false,
        parking: false,
        type:'',
        offer: false,
        useRef: currentUser._id

    })
    const [handleUploading, setUploading] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(undefined)
    console.log(formData)
    

    const handleImageSubmit =(e)=>{
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true)
            const promises = [];
            for (let i = 0; i < files.length; i++) {
              promises.push(storeImage(files[i]));
            }
            Promise.all(promises)
            .then((urls) => {
              setFormData({
                ...formData,
                imageUrls: formData.imageUrls.concat(urls),
              });
              setError(null)
              setUploading(false)
            })
            .catch((err)=>{
                setError('Image upload failed (2 mb max per image)')
                setUploading(false)
            })
        }else{
            setError('You can only upload 6 images per listing')
            setUploading(false)
        }
    }
    const storeImage =async(file)=>{
        return new Promise((resolve, reject)=>{
            const storage = getStorage(app);
            const filename = new Date().getTime() + file.name;
            const storageRef = ref(storage, filename);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot)=>{
                    const progress  = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`upload is ${progress}% done`)
                },
                (error)=>{
                    reject(error)
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                        resolve(downloadURL);
                    })
                }
            )
        })

    }
    const handleImageDelete =(index)=>{
        console.log(index)
        const filteredUrl = formData.imageUrls.filter((url, i) => i !== index)
        setFormData({
            ...formData,
            imageUrls : filteredUrl
        })
        console.log('formdata- ', formData)
    }
    const handleChange =(e)=>{
        if(e.target.type === "text" || e.target.type==="textarea"){
            setFormData({
                ...formData,
                [e.target.id] : e.target.value
            })
        }

        if(e.target.type ==="number"){
            setFormData({
                ...formData,
                [e.target.id]:parseInt(e.target.value)
            })
        }

        if(e.target.id === "rent" || e.target.id === "sell"){
            console.log(formData.type)
            setFormData({
                ...formData,
                type : e.target.id
            })
        }

        if(e.target.id === "furnished" ||e.target.id === "parking" || e.target.id === "offer"){
            console.log(formData.type)
            setFormData({
                ...formData,
                [e.target.id] : e.target.checked
            })
        }
    }
    const handleSubmit =async(e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            if(formData.imageUrls.length < 1) return setError('upload atleast 1 image')
            const result = await fetch('http://localhost:3001/api/listing/create',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(formData),
                credentials: 'include',

            })
            const data = await result.json();
            if(data.success == false){
                setError(data.message)
                console.log(data)
            }
            console.log('listing-', data)
            setLoading(false)
            setError(undefined)
            navigate(`/listing/${data._id}`)
        
        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
    }

  return (
    <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold my-7 text-center'>Create Listing</h1>
        <form className='p-4 flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
            <div className='flex flex-col gap-4'>
                <input className='rounded p-2 focus:outline-none' id='name' type="text" placeholder='Name' required onChange={handleChange}/>
                <textarea  className='rounded p-2 focus:outline-none' id='description' placeholder='Description' required onChange={handleChange}/>
                <input className='rounded p-2 focus:outline-none' id='address' type="text" placeholder='Address' required onChange={handleChange}/>
            </div>
            <div className='p-2 flex gap-8 flex-wrap'>
                <div className=' flex gap-2'>
                    <input id='sell' type='checkbox' checked={formData.type==="sell"} onChange={handleChange}/>
                    <span>Sell</span>
                </div>
                <div className='flex gap-2'>
                    <input id='rent' checked={formData.type==="rent"} type='checkbox' onChange={handleChange}/>
                    <span>Rent</span>
                </div>
                <div className='flex gap-2'>
                    <input id='parking' type='checkbox' checked={formData.parking} onChange={handleChange}/>
                    <span>Parking spot</span>
                </div>
                <div className='flex gap-2'>
                    <input id='furnished' type='checkbox' checked={formData.furnished} onChange={handleChange}/>
                    <span>Furnished</span>
                </div>
                <div className='flex gap-2'>
                    <input id='offer' type='checkbox' checked={formData.offer} onChange={handleChange}/>
                    <span>Offer</span>
                </div>
            </div>
            <div className='flex gap-6'>
                <div className='flex gap-2 items-center'>
                    <input id='bedrooms' className='p-2 rounded focus:outline-none' type='number' min={1} max={10} required onChange={handleChange}/>
                    <p>Beds</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <input id='bathrooms' className='rounded p-2 focus:outline-none' type='number'  min={1} max={10} required onChange={handleChange}/>
                    <p>Baths</p>
                </div>
            </div>
            <div className='flex  gap-2'>
                <input id='regularPrice' 
                min={50}
                max={1000000}
                type='number' 
                value={formData.regularPrice} 
                className='rounded p-2 focus:outline-none' 
                required onChange={handleChange}
                />
                <div>
                    <p>Regular Price</p>
                    <p className='text-xs text-center'>($ / Month)</p>
                </div>

            </div>
            {formData.offer && 
            <div className='flex  gap-2'>
                <input id='discountedPrice' 
                min={50}
                max={1000000}
                type='number' 
                value={formData.discountedPrice} 
                className='rounded p-2 focus:outline-none' 
                required onChange={handleChange}/>
                <div>
                    <p>Discounted Price</p>
                    <p className='text-xs text-center'>($ / Month)</p>
                </div>

            </div>
            }
            
            </div>
            <div className='flex flex-col gap-4 flex-1'>
                <p className='font-semibold mt-2'>Images: 
                <span className='text-slate-500 font-normal ml-2'>The first image will be cover(max-6)</span></p>
                <div className='flex gap-4'>
                    <input type="file" onChange={(e)=>setFiles(e.target.files)} id='images' multiple accept='image/*' className='p-3 border border-solid border-slate-300 rounded w-full'/>
                    <button 
                    onClick={handleImageSubmit}
                    type='button' 
                    className='p-3 border border-solid text-green-500 border-green-500 rounded uppercase'>{handleUploading ? 'uploading' : 'upload'}</button>
                </div>
                {error && <p className='text-sm text-red-700'>{error}</p>}
                {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index)=>(
                    <div className='flex justify-between p-3 items-center border gap-2'>
                        <img src={url} alt='listing image' className='w-20 h-20 object-contain rounded-lg'/>
                        <button onClick={()=>handleImageDelete(index)} type='button' className='hover:opacity-80 text-red-700 uppercase '>delete</button>
                    </div>
                ))
                }
                <button disabled={handleUploading}  onClick={handleSubmit} className='p-3 rounded-lg bg-slate-700 text-white hover:opacity-95 disables:opacity-80 uppercase'>Create Listing</button>
            </div>
        </form>
    </div>
  )
}

export default CreateLisitng
