import Link from 'next/link'
import React from 'react'
import { FaUser } from 'react-icons/fa'

const Header = () => {
  return (
    <header className='p-1 md:p-3 lg:px-6 lg:py-3 font-rale bg-gradient-to-r from-sky-400 to-blue-600'>
        <nav className='flex justify-between items-center text-white'>
            <Link href={'/'} ><h1 className='text-4xl font-bold cursor-pointer'>ONDC</h1></Link>
            <Link href={'/register'} >
              <div className='flex gap-x-4 cursor-pointer'>
                <FaUser className='text-2xl'/>
                <h1> Register</h1>
              </div>
              </Link>
        </nav>
    </header>
  )
}

export default Header