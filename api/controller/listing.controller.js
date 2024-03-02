import Listing from "../models/listing.model.js"
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
    try {
        const propertylisting = await Listing.create(req.body);
        res.status(200).json(propertylisting)
    } catch (error) {
        next(error)
    }
}

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id)
    if (!listing) {
        return next(errorHandler(404, "Listing not found"))
    }

    if (req.user.id !== listing.useRef) {
        return next(errorHandler(401, "You can only delete your own listing"))
    }
    try {
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json('listing deleted')
    } catch (error) {
        next(error)
    }

}

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id)
        if (!listing) {
            return next(errorHandler(404, "Listing not found"))
        }

    
        res.status(200).json(listing);

    } catch (error) {
        next(error)
    }

}

export const updateListing =async(req, res, next)=>{
    try {
    const listing = await Listing.findById(req.params.id);
    if(!listing){
        return next(errorHandler(404, 'Listing not found'))
    }
    if(req.user.id != listing.useRef){
        return next(errorHandler(401, 'you can only update your own account'))
    }

    const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedListing)
        
    } catch (error) {
        next(error.message)
    }

}

export const getListings =async(req, res, next)=>{
    try {
        const searchterm = req.query.searchTerm || '';
        let offer = req.query.offer;
        if(offer == 'false' || offer == undefined){
            offer = {$in: [true, false]} 
            // $in: search for offer in database both true and false 
        }

        let furnished = req.query.furnished;
        if(furnished == 'false' || furnished == undefined){
            furnished = {$in: [true, false]} 
        }
        let parking = req.query.parking;
        if(parking == 'false' || parking == undefined){
            parking = {$in: [true, false]} 
        }

        const limit = req.query.limit || 9;

        let type = req.query.type || 'all';

        if(type == 'all'){
            type = {$in: ['rent', 'sell']}
        }

        const listings = await Listing.find({
            name: {$regex: searchterm, $options: 'i'},//$regex is built in search functionality in mongodb that fetched any part of word
            parking,
            offer,
            furnished,
            type

        })
        .limit(limit)

        if(!listings){
            return errorHandler(404, 'Not Found!')
        }
        return res.status(200).json(listings)




    } catch (error) {
        next(error.message)
    }
}
// export const getListings = async (req, res, next) => {
//     try {
//       const limit = parseInt(req.query.limit) || 9;
//       const startIndex = parseInt(req.query.startIndex) || 0;
//       let offer = req.query.offer;
  
//       if (offer === undefined || offer === 'false') {
//         offer = { $in: [false, true] };
//       }
  
//       let furnished = req.query.furnished;
  
//       if (furnished === undefined || furnished === 'false') {
//         furnished = { $in: [false, true] };
//       }
//       console.log(furnished)
  
//       let parking = req.query.parking;
  
//       if (parking === undefined || parking === 'false') {
//         parking = { $in: [false, true] };
//       }
  
//       let type = req.query.type;
  
//       if (type === undefined || type === 'all') {
//         type = { $in: ['sell', 'rent'] };
//       }
  
//       const searchTerm = req.query.searchTerm || '';
  
//       const sort = req.query.sort || 'createdAt';
  
//       const order = req.query.order || 'desc';
  
//       const listings = await Listing.find({
//         name: { $regex: searchTerm, $options: 'i' },
//         offer,
//         furnished,
//         parking,
//         type,
//       })
//         .sort({ [sort]: order })
//         .limit(limit)
//         .skip(startIndex);
//     console.log(listings)
  
//       return res.status(200).json(listings);
//     } catch (error) {
//       next(error);
//     }
//   };