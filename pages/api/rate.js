const connectDB = require("../../db")
const Rating = require("../../models/Ratings")
const UserDetails = require("../../models/UserDetails")

const handler = async (req, res) => {
    const { method, query } = req

    await connectDB()

    if (method == "GET") {
        try {
            const ratings = await Rating.find({
                workerId: query.id,
            }).populate("userId")

            console.log(ratings)
            res.status(200).json(ratings)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    if (method == "POST") {
        try {
            const ratings = await Rating.create(req.body)
            const rate = await Rating.findById(ratings._id).populate("userId")
            res.status(201).json(rate)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

export default handler
