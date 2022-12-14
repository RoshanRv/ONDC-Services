const mongoose = require("mongoose")

const CarpenterDetails = new mongoose.Schema({
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
        default: "/img/carpenter.png",
    },
    address: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    coords: {
        lat: {
            type: String,
        },
        lng: {
            type: String,
        },
    },
    price: {
        type: Number,
    },
})

module.exports =
    mongoose.models.CarpenterDetails ||
    mongoose.model("CarpenterDetails", CarpenterDetails)
