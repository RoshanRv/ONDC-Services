const mongoose = require("mongoose")

const PainterDetails = new mongoose.Schema({
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
    isVerified: {
        type: Boolean,
        default: false,
    },
    img: {
        type: String,
        default: "/img/painter.png",
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
    price: {
        type: Number,
    },
})

module.exports =
    mongoose.models.PainterDetails ||
    mongoose.model("PainterDetails", PainterDetails)
