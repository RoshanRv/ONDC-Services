import React ,{useState} from 'react'
import Title from '../components/Title'
import {motion} from 'framer-motion'
import Button from '../components/Button'

const register = () => {

    const [username,setUsername] =useState('')
    const [email,setEmail] =useState('')
    const [password,setPassword] = useState('')
    const [password2,setPassword2] = useState('')
    const [phone,setPhone] = useState('')
    const [address,setAddress] = useState('')
    const [age,setAge] = useState('')

    const [isClient,setIsClient] = useState(true)


    const handleSubmit =(e)=>{
        e.preventDefault()
    }



  return (
    <main className='md:px-6 px-3' >
        <Title>Register</Title>
        {/*     FORM        */}
        <div> 
            <form onSubmit={handleSubmit} className='w-full md:w-9/12 lg:w-6/12 mx-auto text-lg border-2 rounded-xl border-black  bg-gradient-to-r from-sky-400 to-blue-600'>
            <div className='flex w-full text-xl text-center text-white border-b-white'>
                <motion.h1 
                onClick={()=>setIsClient(true)}
                 className={`w-1/2 border-white  ${isClient&&'text-black border-b-4   bg-white/30'} py-6`}
                 whileTap={{scale:0.8}}
                 >Client</motion.h1>
                <motion.h1 
                onClick={()=>setIsClient(false)} 
                className={`w-1/2 border-white  ${!isClient&&'text-black border-b-4 bg-white/30'} py-6`}
                whileTap={{scale:0.8}}
                >Professional</motion.h1>
            </div> 
                <div className='flex flex-col gap-y-6 p-2 md:p-10'>
                    <motion.input type="text" 
                    value={username} 
                    placeholder='Username' 
                    onChange={(e)=>setUsername(e.target.value)}
                    className='p-2  rounded-lg border-gray-700 outline-0 w-full block'
                    whileTap={{scale:0.8}}
                    />
                    <motion.input type="email" 
                    value={email} 
                    placeholder='Email' 
                    onChange={(e)=>setEmail(e.target.value)}
                    className='p-2  rounded-lg border-gray-700 outline-0 w-full block'
                    whileTap={{scale:0.8}}
                    />
                    <motion.input type="password" 
                    value={password} 
                    placeholder='Password' 
                    onChange={(e)=>setPassword(e.target.value)}
                    className='p-2  rounded-lg border-gray-700 outline-0 w-full block'
                    whileTap={{scale:0.8}}
                    />
                    <motion.input type="password" 
                    value={password2} 
                    placeholder='Confirm Password' 
                    onChange={(e)=>setPassword2(e.target.value)}
                    className='p-2  rounded-lg border-gray-700 outline-0 w-full block'
                    whileTap={{scale:0.8}}
                    />
                    <motion.input type="tel" 
                    value={phone} 
                    placeholder='Phone' 
                    onChange={(e)=>setPhone(e.target.value)}
                    className='p-2  rounded-lg border-gray-700 outline-0 w-full block'
                    whileTap={{scale:0.8}}
                    />
                    <motion.textarea
                    rows={5}
                    value={address} 
                    placeholder='Address' 
                    onChange={(e)=>setAddress(e.target.value)}
                    className='p-2  rounded-lg border-gray-700 outline-0 w-full block'
                    whileTap={{scale:0.8}}
                    />
                    <motion.input type="number" 
                    value={age} 
                    placeholder='Age' 
                    onChange={(e)=>setAge(e.target.value)}
                    className='p-2  rounded-lg border-gray-700 outline-0 w-full block'
                    whileTap={{scale:0.8}}
                    />

                    <motion.input
                    type={'submit'}
                    className='px-6 py-2 cursor-pointer w-max font-rale font-semibold bg-white text-blue-500 rounded-lg block mx-auto my-4'
                    whileHover={{scale:1.15}}
                    whileTap={{scale:0.8}}
                    value="Register"/>
                </div>
            </form>
        </div>
        
    </main>
  )
}

export default register