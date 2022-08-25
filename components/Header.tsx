import React from 'react'
import { FaCartArrowDown } from 'react-icons/fa'

const Header = () => {
  return (
    <header className='p-1 md:p-3 lg:px-6 lg:py-3 font-rale bg-gradient-to-r from-emerald-600 to-teal-700'>
        <nav className='flex justify-between items-center text-white'>
            <h1 className='text-4xl font-bold  ' >LOGO</h1>
            <FaCartArrowDown  className='text-2xl' />
        </nav>
    </header>
  )
}

export default Header