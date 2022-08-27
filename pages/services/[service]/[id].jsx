import React, { useState }  from 'react'
import RatingCard from '../../../components/RatingCard'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useRouter } from 'next/router'
import { FaEnvelope, FaPhone ,FaLocationArrow } from 'react-icons/fa'
import Title from '../../../components/Title'



const Worker = ({data}) => {

    const [showModel,setShowModel] =useState(false)
    const [username,setUsername] = useState('')
    const [phone,setPhone] = useState('')
    const [age,setAge] = useState('')
    const [address,setAddress] = useState('')

    const handleBook = async(e)=>{
        if(username != "" || phone !="" || address !="" ){
            e.preventDefault()
            try{
                const book = await axios.post('http://localhost:3000/api/bookingDetails',{name:username,phone,age,address,workerId:data._id})
            }catch(err){
                console.log(err)
            }
        }
        
    }
    
  return (
    <main className='p-3 md:p-6'>
        <section className='lg:flex gap-x-6 '>
            <div className='lg:w-[30%] h-[25rem]'>
                <img src={`${data?.img}`} alt="Product Image" className='w-full h-full'/>
            </div>


            <div  className='pt-8 lg:w-[60%] mx-auto'>
                <h1 className="text-black font-semibold my-2 text-5xl">{data.name}</h1>

                <RatingCard rate={data.rate || 0} reviews={data.reviews || 0} />

                <div className='flex text-xl items-center gap-x-2 my-1'>
                    <motion.div 
                    className={`h-2 w-2 rounded-full ${data.online?'bg-green-500':'bg-red-500'}`}
                    animate={{scale:[0.7,1.2,0.7]}}
                    transition={{repeat:Infinity}}
                    />
                    <h1>{data.online ? 'Active' : 'Busy'}</h1>
                </div>

                <div className="md:flex gap-x-4">
                    <div className="flex gap-x-4 items-center text-lg my-2 border border-black w-max px-6 py-2 rounded-lg bg-gray-100 ">
                        <FaPhone />
                        <h1>{data.phone}</h1>
                    </div>

                    <div className="flex gap-x-4 items-center text-lg my-2 border border-black w-max px-6 py-2 rounded-lg bg-gray-100 ">
                        <FaEnvelope />
                        <h1>{data.email}</h1>
                    </div>
                </div>

                <div className="md:flex gap-x-4">

                    <div className="flex gap-x-4 items-center text-lg my-2 border border-black w-max px-6 py-2 rounded-lg bg-gray-100 ">
                            <h1>Age</h1>
                            <h1>{data.age}</h1>
                        </div>

                    <div className="flex gap-x-4 items-center text-lg my-2 border border-black w-max px-6 py-2 rounded-lg bg-gray-100 ">
                        <FaLocationArrow />
                        <h1>{data.address}</h1>
                    </div>
                </div>
                

                <h1 className="text-black/80 my-6 text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quidem vero corporis optio voluptate veniam sit nisi, minima perferendis numquam aspernatur, voluptatum enim natus. Ducimus reiciendis asperiores culpa nesciunt voluptas?</h1>

                <div className="flex gap-x-2 items-center text-xl text-white">
                    <motion.button
                    onClick={()=>setShowModel(true)}
                    className='px-6 py-2 font-rale bg-gradient-to-r from-sky-400 to-blue-600 text-white rounded-lg block mx-auto my-4'
                    whileHover={{scale:1.15}}
                    whileTap={{scale:0.8}}
                    >Book Now
                    </motion.button>
                </div>
            </div>



        </section>
        <Title >Ratings & Reviews</Title>
        <div className="w-96 h-40 bg-gradient-to-t from-black to-black/60 mx-auto text-xl flex items-center font-semibold text-white">
            <h1 className='w-max mx-auto' >Under Construction...</h1>
        </div>


        {/*         MODEL        */}
        {showModel&&<div className='fixed w-full md:w-9/12 lg:w-6/12 mx-auto text-lg border-2 rounded-xl border-black  bg-gradient-to-r from-sky-400 to-blue-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' >
        <button onClick={()=>setShowModel(false)} className='bg-white px-3 py-1 absolute top-2 right-5 rounded-full text-xl' >X</button>
        <form className='flex flex-col gap-y-6 p-2 md:p-10'>
                    <h1 className="text-white text-3xl my-2 font-semibold text-center">Book {data.name}</h1>
                    <motion.input required type="text" 
                    value={username} 
                    placeholder='Username' 
                    onChange={(e)=>setUsername(e.target.value)}
                    className='p-2  rounded-lg border-gray-700 outline-0 w-full block'
                    whileTap={{scale:0.8}}
                    />
                    <motion.input required type="tel" 
                    value={phone} 
                    placeholder='Phone' 
                    onChange={(e)=>setPhone(e.target.value)}
                    className={`p-2  rounded-lg  outline-0 w-full block`}
                    whileTap={{scale:0.8}}
                    />
                    <motion.input required type="number" 
                    value={age} 
                    placeholder='Age' 
                    onChange={(e)=>setAge(e.target.value)}
                    className={`p-2  rounded-lg  outline-0 w-full block`}
                    whileTap={{scale:0.8}}
                    />

                    <motion.textarea
                    rows={5}
                    required
                    value={address} 
                    placeholder='Address' 
                    onChange={(e)=>setAddress(e.target.value)}
                    className='p-2  rounded-lg border-gray-700 outline-0 w-full block'
                    whileTap={{scale:0.8}}
                    />
                    
                   

                    <motion.button
                    className='px-6 py-2 cursor-pointer w-max font-rale font-semibold bg-white text-blue-500 rounded-lg block mx-auto my-4'
                    whileHover={{scale:1.15}}
                    whileTap={{scale:0.8}}
                    onClick={handleBook}
                    >Book Now!!!</motion.button>

                    
                </form>

        </div>}


    </main>
  )
}

export default Worker

export const getServerSideProps = async({params})=>{
    let {service,id} = params

    if(service == 'Vehicle' || service=='vehicle')service = 'driver'
    try{
        
        const detail = await axios.get(`http://localhost:3000/api/${service}Details?id=${id}`)
        console.log(detail.data.name)
        return {
            props:{
                data:detail.data
            }
        }
    }catch(err){
        return {
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }
}