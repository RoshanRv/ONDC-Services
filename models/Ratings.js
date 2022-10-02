const mongoose = require("mongoose")

const RatingSchema = mongoose.Schema({
    workerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
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
    mongoose.models.Rating || mongoose.model("Rating", RatingSchema)
