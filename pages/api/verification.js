const dbConnect = require("../../db")
const PlumberDetails = require("../../models/PlumberDetails")
const ElectricianDetails = require("../../models/ElectricianDetails")
const DriverDetails = require("../../models/DriverDetails")
const PainterDetails = require("../../models/PainterDetails")
const CleanerDetails = require("../../models/CleanerDetails")
const CarpenterDetails = require("../../models/CarpenterDetails")

const handler = async (req, res) => {
    const { method, query } = req

    const { role } = query
    let db
    if (role == "driver") {
        db = DriverDetails
    } else if (role == "plumber") {
        db = PlumberDetails
    } else if (role == "electrician") {
        db = ElectricianDetails
    } else if (role == "painter") {
        db = PainterDetails
    } else if (role == "cleaner") {
        db = CleanerDetails
    } else if (role == "carpenter") {
        db = CarpenterDetails
    }

    await dbConnect()

    if (method == "GET") {
        try {
            const details = await db.find({ isVerified: false })
            res.status(200).json(details)
        } catch (err) {
            res.status(500).json(err)
        }
    } else if (method == "POST") {
        try {
            const details = await db.create(req.body)
            res.status(200).json(details)
        } catch (err) {
            res.status(500).json(err)
        }
    } else if (method == "PUT") {
        try {
            const { id } = req.body
            const detail = await db.findByIdAndUpdate(id, req.body, {
                new: true,
            })
            res.status(201).json(detail)
        } catch (err) {
            res.status(500).json(err)
        }
    } else if (method == "DELETE") {
        try {
            const { id } = query
            const detail = await db.findByIdAndDelete(id)
            res.status(201).json(detail)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

export default handler
