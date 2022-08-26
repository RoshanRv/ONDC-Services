const connectDB  =require('../../db')
const UserDetails = require('../../models/UserDetails')

const handler = async(req,res)=>{

    const {method} = req

    await connectDB()

    if(method=='GET'){
        try{
            const users = await UserDetails.find()
            res.status(200).json(users)
        }catch(err){
            res.status(500).json(err)
        }
    }

    if(method=='POST'){
        try{
            const users = await UserDetails.create(req.body)
            res.status(200).json(users)
        }catch(err){
            res.status(500).json(err)
        }
    }

    if(method=='PUT'){
        const {id} = req.body

        try{
            const users = await UserDetails.findByIdAndUpdate(id,req.body,{new:true})
            res.status(200).json(users)
        }catch(err){
            res.status(500).json(err)
        }
    }

    if(method=='DELETE'){
        const {id} = req.body

        try{
            const users = await UserDetails.findByIdAndDelete(id)
            res.status(200).json(users)
        }catch(err){
            res.status(500).json(err)
        }
    }



}

export default handler