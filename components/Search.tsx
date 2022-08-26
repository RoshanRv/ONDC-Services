import React,{useState}from 'react'
import { FaSearch } from 'react-icons/fa'
import Title from './Title'

const Search = () => {

    const [searchTerm,setSearchTerm] = useState('')

    const handleSearch = ()=>{
        try{

        }catch(err){
            
        }
    }

  return (
    <section className='px-4 md:p-10 my-4'>
        <Title>Search</Title>

        <div className='flex gap-x-4 w-full bg-black md:p-4 rounded-lg'>
            <input type="search"
            placeholder='Search Any Products...'
            className='w-full p-2 rounded-md border border-black outline-0'
            value={searchTerm} 
            onChange={(e)=>setSearchTerm(e.target.value)}
             />
             <button onClick={()=>handleSearch()}><FaSearch className='text-white outline-0' /></button>
        </div>
    </section>
  )
}

export default Search