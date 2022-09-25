const mongoose = require("mongoose")

const DriverDetails = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30,
    },
    phone: {
        type: Number,
        required: true,
    },
    vehicleType: {
        type: String,
    },
    vehicleNo: {
        type: Number,
    },

    vehicleBrand: {
        type: String,
    },

    licenseNo: {
        type: String,
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
        default: "/img/driver.png",
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
    mongoose.models.DriverDetails ||
    mongoose.model("DriverDetails", DriverDetails)
