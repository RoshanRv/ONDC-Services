const dbConnect = require('../../db')
const PlumberDetails = require('../../models/PlumberDetails')

const handler = async (req,res)=>{

    const {method , query} = req

    await dbConnect()

    if(method=='GET' && query.online){
        try{
            const details = await PlumberDetails.find({online:true})
            res.status(200).json(details)
        }catch(err){
            res.status(500).json(err)
        }
    }

    if(method=='GET' && query.id){
        try{
            const details = await PlumberDetails.findById(query.id)
            res.status(200).json(details)
        }catch(err){
            res.status(500).json(err)
        }
    }

    else if(method=='GET'){
        try{
            const details = await PlumberDetails.find()
            console.log(details)
            res.status(200).json(details)
        }catch(err){
            res.status(500).json(err)
        }
    }

    else if(method=='POST'){
        try{
            const details = await PlumberDetails.create(req.body)
            res.status(200).json(details)
        }catch(err){
            res.status(500).json(err)
        }
    }

    else if(method=="PUT"){
        try{
            const {id} = req.body
            const detail = await PlumberDetails.findByIdAndUpdate(id,req.body,{new:true})
            res.status(201).json(detail)
        }catch(err){
            res.status(500).json(err)
        }
    }

    else if(method=="DELETE"){
        try{
            const {id} = req.body
            const detail = await PlumberDetails.findByIdAndDelete(id)
            res.status(201).json(detail)
        }catch(err){
            res.status(500).json(err)
        }
    }

}

export default handler
