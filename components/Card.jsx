import React from 'react'
import Button from './Button'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

const Card = ({data}) => {

    const {service} = useRouter().query

  return (
    <div className='w-max text-left p-3 rounded-xl border  border-black  overflow-hidden'>
        <div className='w-96 '>
            <img src={data.img} alt="" className='object-cover hover:scale-125 transition-all' />
        </div>
        <div className='' >
            <h1 className='text-3xl my-2 font-semibold'>{data.name}</h1>
            <h1 className='text-xl my-1'>{data.phone}</h1>
            <div className='flex text-xl items-center gap-x-2 my-1'>
                <motion.div 
                className={`h-2 w-2 rounded-full ${data.online?'bg-green-500':'bg-red-500'}`}
                animate={{scale:[0.7,1.2,0.7]}}
                transition={{repeat:Infinity}}
                />
                <h1>{data.online ? 'Active' : 'Busy'}</h1>
            </div>
        </div>
        <div className="flex items-center">
            <Button link={`/services/${service}/${data._id}`} >View Details</Button>
            <Button link={`/services/${service}/${data._id}`} >Book Now</Button>
        </div>
    </div>
  )
}

export default Card