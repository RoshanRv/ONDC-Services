import React from 'react'
import { FaStar } from 'react-icons/fa'

const RatingCard = ({rate,reviews}) => {
  return (
    <div className='flex items-center gap-x-4 my-1'>
        <div className="flex items-center gap-x-1 bg-gradient-to-r from-sky-400 to-blue-600 rounded-lg p-1 ">
            <FaStar className='text-white text-sm' />
            <h1 className="text-white text-sm">{rate}</h1>
        </div>
        <h1 className='text-gray-600 text-sm' >{reviews} ratings & reviews</h1>
    </div>
  )
}

export default RatingCard