import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const Button = ({children,link}) => {
  return (
    <Link href={link?`${link}`:'/'}>
    <motion.button
    className='px-6 py-2 font-rale bg-gradient-to-r from-sky-400 to-blue-600 text-white rounded-lg block mx-auto my-4'
    whileHover={{scale:1.15}}
    whileTap={{scale:0.8}}
    >
        {children}
    </motion.button>
    </Link>
  )
}

export default Button