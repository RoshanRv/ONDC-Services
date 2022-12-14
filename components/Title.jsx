import React from 'react'
import { motion } from 'framer-motion'

const Title = ({children}) => {
  return (
    <motion.h1
    className='text-blue-500 capitalize font-rale w-max mx-auto font-semibold text-2xl md:text-4xl text-center my-10'
    initial={{scale:1}}
    whileInView={{scale:1.2}}
    >
        {children}
    </motion.h1>
  )
}

export default Title