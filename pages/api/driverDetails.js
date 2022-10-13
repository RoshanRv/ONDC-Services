const dbConnect = require("../../db")
const DriverDetails = require("../../models/DriverDetails")

const handler = async (req, res) => {
    const { method, query } = req

    await dbConnect()

    if (method == "GET" && query.vehicle) {
        const type = query.vehicle.toLowerCase()
        try {
            const details = await DriverDetails.find({ vehicleType: type })
            res.status(200).json(details)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    if (method == "GET" && query.id) {
        try {
            const details = await DriverDetails.findById(query.id)
            res.status(200).json(details)
        } catch (err) {
            res.status(500).json(err)
        }
    } else if (method == "GET" && query.online) {
        try {
            const details = await DriverDetails.find({ online: true })
            res.status(200).json(details)
        } catch (err) {
            res.status(500).json(err)
        }
    } else if (method == "GET") {
        try {
            const details = await DriverDetails.find({ isVerified: true })
            console.log(details)
            res.status(200).json(details)
        } catch (err) {
            res.status(500).json(err)
        }
    } else if (method == "POST") {
        try {
            const details = await DriverDetails.create(req.body)
            res.status(200).json(details)
        } catch (err) {
            res.status(500).json(err)
        }
    } else if (method == "PUT") {
        try {
            const { id } = req.body
            const detail = await DriverDetails.findByIdAndUpdate(id, req.body, {
                new: true,
            })
            res.status(201).json(detail)
        } catch (err) {
            res.status(500).json(err)
        }
    } else if (method == "DELETE") {
        try {
            const { id } = query
            const detail = await DriverDetails.findByIdAndDelete(id)
            res.status(201).json(detail)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

export default handler
