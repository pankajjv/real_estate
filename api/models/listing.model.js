import mongoose from "mongoose";

const propertyListing = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    regularPrice: {
        type: Number,
        required: true,
    },
    discountedPrice: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    furnished: {
        type: Boolean,
        required: true,
    },
    parking: {
        type: Boolean,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    offer: {
        type: Boolean,
        required: true,
    },
    imageUrls: {
        type: Array,
        required: true,
    },
    useRef: {
        type: String,
        required: true,
    }
}, {timestamps: true})

const Listing = mongoose.model("listing", propertyListing);
export default Listing;

// {
//     "name": "almaya",
//     "description": "in dubai",
//     "address": "uae",
//     "regularPrice": 500,
//     "discountedPrice": 300,
//     "bathrooms": 5,
//     "bedrooms": 5,
//     "furnished": true,
//     "parking": false,
//     "type": "rent",
//     "offer": true,
//     "imageUrls": ["1.png", "2.png"],
//     "useRef":"befbh"
    
//   }