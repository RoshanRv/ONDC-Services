import React ,{useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Title from '../../components/Title'
import { FaUser,FaLocationArrow , FaPhone,FaEnvelope } from 'react-icons/fa'

const WorkerReport = ({data}) => {
    

  return (
    <main className='px-6 lg:px-10'>
        <Title>Services Requested</Title>
        <div className="grid lg:grid-cols-3 gap-8 grid-cols-1">
            {data.map((d,i)=>(
                <div className='bg-sky-300 md:p-4 p-2  border-2 rounded-lg text-center'>
                    <h1 className="text-black text-3xl font-semibold capitalize">{d.name}</h1>
                    <div className="flex gap-x-4 mx-auto items-center text-lg my-2 border border-black w-max px-6 py-2 rounded-lg bg-gray-100 ">
                        <FaPhone />
                        <h1>{d.phone}</h1>
                    </div>
                    <div className="flex gap-x-4 mx-auto items-center text-lg my-2 border border-black w-max px-6 py-2 rounded-lg bg-gray-100 ">
                        <FaLocationArrow />
                        <h1>{d.address}</h1>
                    </div>
                     <div className="flex gap-x-4 mx-auto items-center text-lg my-2 border border-black w-max px-6 py-2 rounded-lg bg-gray-100 ">
                        <h1 className='font-semibold' >Age :</h1>
                        <h1>{d.age}</h1>
                    </div>
                </div>
            ))}
        </div>
        
    </main>
  )
}

export default WorkerReport

export const getServerSideProps = async({query})=>{
    const {id} = query
    console.log(query)
    try{
        const data = await axios.get(`https://novicers-i-tech-ondc.vercel.app/api/bookingDetails?id=${id}`)

        return {
            props:{
                data:data.data
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