const dbConnect = require("../../db")
const CleanerDetails = require("../../models/CleanerDetails")

const handler = async (req, res) => {
    const { method, query } = req

    await dbConnect()

    if (method == "GET" && query.online) {
        try {
            const details = await CleanerDetails.find({ online: true })
            res.status(200).json(details)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    if (method == "GET" && query.id) {
        try {
            const details = await CleanerDetails.findById(query.id)
            res.status(200).json(details)
        } catch (err) {
            res.status(500).json(err)
        }
    } else if (method == "GET") {
        try {
            const details = await CleanerDetails.find()
            console.log(details)
            res.status(200).json(details)
        } catch (err) {
            res.status(500).json(err)
        }
    } else if (method == "POST") {
        try {
            const details = await CleanerDetails.create(req.body)
            res.status(200).json(details)
        } catch (err) {
            res.status(500).json(err)
        }
    } else if (method == "PUT") {
        try {
            const { id } = req.body
            const detail = await CleanerDetails.findByIdAndUpdate(
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
            const { id } = query
            const detail = await CleanerDetails.findByIdAndDelete(id)
            res.status(201).json(detail)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

export default handler
