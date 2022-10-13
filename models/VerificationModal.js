const mongoose = require("mongoose")

const VerificationSchema = mongoose.Schema({
    workerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "UserDetails",
    },
    rating: {
        type: Number,
    },
    review: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
})

module.exports =
    mongoose.models.Verification ||
    mongoose.model("Verification", VerificationSchema)
