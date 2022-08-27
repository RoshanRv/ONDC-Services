import React ,{useState} from 'react'
import Title from '../../components/Title'
import {motion} from 'framer-motion'
import axios from 'axios'
import { useRouter } from 'next/router'

const login = () => {

    const [password,setPassword] = useState('')
    const [email,setEmail] =useState('')
    const [passIncorrect,setPassIncorrect] = useState(false)
    const navigate = useRouter()

    const [file,setFile] = useState('')
    const [role,setRole] = useState('')


    

    const handleSubmit =async(e)=>{
        setPassIncorrect(false)

        if(email != ''&&  password != ''){
            e.preventDefault()

           try{
              const data = await axios.post('http://localhost:3000/api/login',{email,password,role})
              console.log(data)
              if(data.data.length > 0){
                setPassIncorrect(false)
                navigate.push(`/worker/${data.data[0]._id}`)
            }
              else setPassIncorrect(true)
           }catch(err){
            console.log(err)
           }
        }

    }

    


  return (
    <main className='md:px-6 px-3' >
        <Title>Login</Title>
        {/*     FORM        */}
        <div> 
            <form onSubmit={handleSubmit} className='w-full md:w-9/12 lg:w-6/12 mx-auto text-lg border-2 rounded-xl border-black  bg-gradient-to-r from-sky-400 to-blue-600'>
            
                <div className='flex flex-col gap-y-6 p-2 md:p-10'>
                    
                    <motion.input required type="email" 
                    value={email} 
                    placeholder='Email' 
                    onChange={(e)=>setEmail(e.target.value)}
                    className='p-2  rounded-lg border-gray-700 outline-0 w-full block'
                    whileTap={{scale:0.8}}
                    />
                    <motion.input required type="password" 
                    value={password} 
                    placeholder='Password' 
                    onChange={(e)=>setPassword(e.target.value)}
                    className={`p-2 ${passIncorrect&&'border-2 border-red-600'} rounded-lg  outline-0 w-full block`}
                    whileTap={{scale:0.8}}
                    />

                    <motion.select
                    className='p-2  rounded-lg border-gray-700 outline-0 w-full block'
                    value={role}
                    onChange={(e)=>setRole(e.target.value)}
                    whileTap={{scale:0.8}}
                    required
                    >
                        <option value="">--Role--</option>
                        <option value="driver">Driver</option>
                        <option value="electrician">Electrician</option>
                        <option value="plumber">Plumber</option>
                    </motion.select>
                    

                    <motion.input
                    type={'submit'}
                    className='px-6 py-2 cursor-pointer w-max font-rale font-semibold bg-white text-blue-500 rounded-lg block mx-auto my-4'
                    whileHover={{scale:1.15}}
                    whileTap={{scale:0.8}}
                    value="Login"/>

                    
                </div>
            </form>
        </div>
        
    </main>
  )
}

export default login