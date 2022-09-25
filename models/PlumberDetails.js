const mongoose = require("mongoose")

const PlumberDetails = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30,
    },
    phone: {
        type: Number,
        required: true,
    },

    online: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
    },
    noOfRatings: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    img: {
        type: String,
        default: "/img/plumber.png",
    },
    address: {
        type: String,
        required: true,
    },
    coords: {
        lat: {
            type: String,
        },
        lng: {
            type: String,
        },
    },
})

module.exports =
    mongoose.models.PlumberDetails ||
    mongoose.model("PlumberDetails", PlumberDetails)
