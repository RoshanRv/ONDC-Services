import React ,{useState} from 'react'
import Title from '../components/Title'
import {motion} from 'framer-motion'
import Button from '../components/Button'
import axios from 'axios'

const register = () => {

    const [username,setUsername] =useState('')
    const [email,setEmail] =useState('')
    const [password,setPassword] = useState('')
    const [password2,setPassword2] = useState('')
    const [phone,setPhone] = useState('')
    const [address,setAddress] = useState('')
    const [age,setAge] = useState('')

    const [file,setFile] = useState('')
    const [role,setRole] = useState('')

    const [isClient,setIsClient] = useState(true)
    const [passIncorrect,setPassIncorrect] = useState(false)

    

    const handleSubmit =async(e)=>{
        setPassIncorrect(true)

        if(username != '' && email != ''&&  password != '' && phone != '' && address != ''){
            e.preventDefault()
            if(password == password2){
                setPassIncorrect(false)
                try{
                    if(isClient){
                        const details = await axios.post('http://localhost:3000/api/user',{name:username,email,password,phone,address,age})
                    }else{
                        if(file){
                            const data = new FormData()
                            data.append("file",file[0])
                            data.append("upload_preset","uploads")

                            try{
                                const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/hackfest/image/upload',data)
                                const {url} = uploadRes.data
    
                                if(role == 'driver'){
                                    const details = await axios.post('http://localhost:3000/api/driverDetails',{name:username,email,password,phone,address,age,img:url})
                                }else if(role == 'electrician'){
                                    const details = await axios.post('http://localhost:3000/api/electricianDetails',{name:username,email,password,phone,address,age,img:url})
                                }else if(role == 'plumber'){
                                    const details = await axios.post('http://localhost:3000/api/plumberDetails',{name:username,email,password,phone,address,age,img:url})
                                }
    
                            }catch(err){
                                console.log(err)
                            }
                        }else{

                            try{
    
                                if(role == 'driver'){
                                    const details = await axios.post('http://localhost:3000/api/driverDetails',{name:username,email,password,phone,address,age})
                                }else if(role == 'electrician'){
                                    const details = await axios.post('http://localhost:3000/api/electricianDetails',{name:username,email,password,phone,address,age})
                                }else if(role == 'plumber'){
                                    const details = await axios.post('http://localhost:3000/api/plumberDetails',{name:username,email,password,phone,address,age})
                                }
    
                            }catch(err){
                                console.log(err)
                            }

                        }
                        

                    }
                }catch(err){
                    console.log(err)
                }


            }else{
                setPassIncorrect(true)
            }
        }

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
                    <motion.input required type="text" 
                    value={username} 
                    placeholder='Username' 
                    onChange={(e)=>setUsername(e.target.value)}
                    className='p-2  rounded-lg border-gray-700 outline-0 w-full block'
                    whileTap={{scale:0.8}}
                    />
                    <motion.input required type="email" 
                    value={email} 
                    placeholder='Email' 
                    onChange={(e)=>setEmail(e.target.value)}
                    className='p-2  rounded-lg border-gray-700 outline-0 w-full block'
                    whileTap={{scale:0.8}}
                    />
                    {passIncorrect&&<label className='text-red-600 text-sm' >Password Mismatch</label>}
                    <motion.input required type="password" 
                    value={password} 
                    placeholder='Password' 
                    onChange={(e)=>setPassword(e.target.value)}
                    className={`p-2 ${passIncorrect&&'border-2 border-red-600'} rounded-lg  outline-0 w-full block`}
                    whileTap={{scale:0.8}}
                    />
                    <motion.input required type="password" 
                    value={password2} 
                    placeholder='Confirm Password' 
                    onChange={(e)=>setPassword2(e.target.value)}
                    className={`p-2 ${passIncorrect&&'border-2 border-red-600'} rounded-lg  outline-0 w-full block`}
                    whileTap={{scale:0.8}}
                    />
                    <motion.input required type="tel" 
                    value={phone} 
                    placeholder='Phone' 
                    onChange={(e)=>setPhone(e.target.value)}
                    className='p-2  rounded-lg border-gray-700 outline-0 w-full block'
                    whileTap={{scale:0.8}}
                    />

                    {!isClient&&<motion.select
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
                    </motion.select>}

                    <motion.textarea
                    rows={5}
                    required
                    value={address} 
                    placeholder='Address' 
                    onChange={(e)=>setAddress(e.target.value)}
                    className='p-2  rounded-lg border-gray-700 outline-0 w-full block'
                    whileTap={{scale:0.8}}
                    />
                    <motion.input required type="number" 
                    value={age} 
                    placeholder='Age' 
                    onChange={(e)=>setAge(e.target.value)}
                    className='p-2  rounded-lg border-gray-700 outline-0 w-full block'
                    whileTap={{scale:0.8}}
                    />

                    {!isClient&&(<div className='flex gap-x-4 items-center'>
                         <label className='text-white'>Profile Photo :</label>
                        <motion.input type="file" 
                         id='file'
                        className='inline-block'
                        onChange={(e)=>setFile(e.target.files)}
                        whileTap={{scale:0.8}}
                        />
                    </div>
                    )}

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