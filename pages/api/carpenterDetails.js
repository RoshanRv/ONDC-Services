const dbConnect = require("../../db")
const CarpenterDetails = require("../../models/CarpenterDetails")

const handler = async (req, res) => {
    const { method, query } = req

    await dbConnect()

    if (method == "GET" && query.online) {
        try {
            const details = await CarpenterDetails.find({ online: true })
            res.status(200).json(details)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    if (method == "GET" && query.id) {
        try {
            const details = await CarpenterDetails.findById(query.id)
            res.status(200).json(details)
        } catch (err) {
            res.status(500).json(err)
        }
    } else if (method == "GET") {
        try {
            const details = await CarpenterDetails.find()
            console.log(details)
            res.status(200).json(details)
        } catch (err) {
            res.status(500).json(err)
        }
    } else if (method == "POST") {
        try {
            const details = await CarpenterDetails.create(req.body)
            res.status(200).json(details)
        } catch (err) {
            res.status(500).json(err)
        }
    } else if (method == "PUT") {
        try {
            const { id } = req.body
            const detail = await CarpenterDetails.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            )
            res.status(201).json(detail)
        } catch (err) {
            res.status(500).json(err)
        }
    } else if (method == "DELETE") {
        try {
            const { id } = req.body
            const detail = await CarpenterDetails.findByIdAndDelete(id)
            res.status(201).json(detail)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

export default handler
