const mongoose = require("mongoose")

const BookingDetails = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    age: {
        type: Number,
    },
    address: {
        type: String,
        required: true,
    },
    workerId: {
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
    mongoose.models.BookingDetails ||
    mongoose.model("BookingDetails", BookingDetails)
