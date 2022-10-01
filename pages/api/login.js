const dbConnect = require("../../db")
const PlumberDetails = require("../../models/PlumberDetails")
const ElectricianDetails = require("../../models/ElectricianDetails")
const DriverDetails = require("../../models/DriverDetails")
const UserDetails = require("../../models/UserDetails")

const handler = async (req, res) => {
    const { method, query } = req
    const role = req.body.role
    let db
    if (role == "driver") {
        db = DriverDetails
    } else if (role == "plumber") {
        db = PlumberDetails
    } else if (role == "electrician") {
        db = ElectricianDetails
    } else if (role == "user") {
        db = UserDetails
    }

    await dbConnect()

    if (method == "POST") {
        try {
            const details = await db.find({
                email: req.body.email,
                password: req.body.password,
            })
            res.status(200).json(details)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

export default handler
