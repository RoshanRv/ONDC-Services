const dbConnect = require('../../db')
const BookingDetails = require('../../models/BookingDetails')

const handler = async (req,res)=>{

    const {method , query} = req

    await dbConnect()

    if(method=='GET'){
        try{
            const details = await BookingDetails.find({workerId:query.id})
            res.status(200).json(details)
        }catch(err){
            res.status(500).json(err)
        }
    }


    else if(method=='POST'){
        try{
            const details = await BookingDetails.create(req.body)
            res.status(200).json(details)
        }catch(err){
            res.status(500).json(err)
        }
    }

    else if(method=="PUT"){
        try{
            const {id} = req.body
            const detail = await BookingDetails.findByIdAndUpdate(id,req.body,{new:true})
            res.status(201).json(detail)
        }catch(err){
            res.status(500).json(err)
        }
    }

    else if(method=="DELETE"){
        try{
            const {id} = req.body
            const detail = await BookingDetails.findByIdAndDelete(id)
            res.status(201).json(detail)
        }catch(err){
            res.status(500).json(err)
        }
    }

}

export default handler
