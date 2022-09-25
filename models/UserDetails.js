const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: true,
    },
    password: {
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
    mongoose.models.UserDetails || mongoose.model("UserDetails", UserSchema)
