// import React ,{useState} from 'react'
// import Title from '../components/Title'
// import {motion} from 'framer-motion'
// import axios from 'axios'

// const register = () => {

//     const [password,setPassword] = useState('')
//     const [email,setEmail] =useState('')
//     const [passIncorrect,setPassIncorrect] = useState(false)
//     const [isClient,setIsClient] = useState(true)

//     const [file,setFile] = useState('')
//     const [role,setRole] = useState('')


    

//     const handleSubmit =async(e)=>{
//         setPassIncorrect(true)

//         if(email != ''&&  password != ''){
//             e.preventDefault()

//             if(isClient){
//                 try{
//                     axios.post('')
//                 }
//             }
//         }

//     }

    


//   return (
//     <main className='md:px-6 px-3' >
//         <Title>Login</Title>
//         {/*     FORM        */}
//         <div> 
//             <form onSubmit={handleSubmit} className='w-full md:w-9/12 lg:w-6/12 mx-auto text-lg border-2 rounded-xl border-black  bg-gradient-to-r from-sky-400 to-blue-600'>
//             <div className='flex w-full text-xl text-center text-white border-b-white'>
//                 <motion.h1 
//                 onClick={()=>setIsClient(true)}
//                  className={`w-1/2 border-white  ${isClient&&'text-black border-b-4   bg-white/30'} py-6`}
//                  whileTap={{scale:0.8}}
//                  >Client</motion.h1>
//                 <motion.h1 
//                 onClick={()=>setIsClient(false)} 
//                 className={`w-1/2 border-white  ${!isClient&&'text-black border-b-4 bg-white/30'} py-6`}
//                 whileTap={{scale:0.8}}
//                 >Professional</motion.h1>
//             </div> 
//                 <div className='flex flex-col gap-y-6 p-2 md:p-10'>
                    
//                     <motion.input required type="email" 
//                     value={email} 
//                     placeholder='Email' 
//                     onChange={(e)=>setEmail(e.target.value)}
//                     className='p-2  rounded-lg border-gray-700 outline-0 w-full block'
//                     whileTap={{scale:0.8}}
//                     />
//                     {passIncorrect&&<label className='text-red-600 text-sm' >Password Mismatch</label>}
//                     <motion.input required type="password" 
//                     value={password} 
//                     placeholder='Password' 
//                     onChange={(e)=>setPassword(e.target.value)}
//                     className={`p-2 ${passIncorrect&&'border-2 border-red-600'} rounded-lg  outline-0 w-full block`}
//                     whileTap={{scale:0.8}}
//                     />
                    
                   
//                     {!isClient&&<motion.select
//                     className='p-2  rounded-lg border-gray-700 outline-0 w-full block'
//                     value={role}
//                     onChange={(e)=>setRole(e.target.value)}
//                     whileTap={{scale:0.8}}
//                     required
//                     >
//                         <option value="">--Role--</option>
//                         <option value="driver">Driver</option>
//                         <option value="electrician">Electrician</option>
//                         <option value="plumber">Plumber</option>
//                     </motion.select>}


//                     <motion.input
//                     type={'submit'}
//                     className='px-6 py-2 cursor-pointer w-max font-rale font-semibold bg-white text-blue-500 rounded-lg block mx-auto my-4'
//                     whileHover={{scale:1.15}}
//                     whileTap={{scale:0.8}}
//                     value="Login"/>

                    
//                 </div>
//             </form>
//         </div>
        
//     </main>
//   )
// }

// export default register