import React, { useState } from 'react'
import {FaAngleLeft,FaAngleRight} from 'react-icons/fa'
import {motion} from 'framer-motion'
import Button from './Button'


const bannerData = [
    {
        title:'Taxi Services',
        desc:'Cabs At Your Door-Step At Lowest Cost!!!',
        img:'taxi-banner',
        link:'/services/vehicle'
    },
    {
        title:'Electrician Services',
        desc:'Electricians At Your Door-Step At Lowest Cost!!!',
        img:'elect-banner',
        link:'/services/electrician'
    },
    {
        title:'Plumber Services',
        desc:'Plumbers At Your Door-Step At Lowest Cost!!!',
        img:'plumber-banner',
        link:'/services/plumber'
    },
]

const HomeHero = () => {

    const [slideIndex,setSlideIndex]=useState(0)

    const handleNext = ()=>{
        if(slideIndex>=2)return setSlideIndex(0)
        return setSlideIndex(e=>e+1)
    }

    const handlePrevious = ()=>{
        if(slideIndex<=0)return setSlideIndex(2)
        return setSlideIndex(e=>e-1)
    }

  return (
    <section className='w-full h-full relative font-rale' >
        <section className='w-full flex overflow-hidden '>
            <div className='flex w-max  transition-all duration-700' style={{transform:`translateX(${-slideIndex*100}vw)`}} >
            {bannerData.map((data,i)=>(
                    <div key={i} className='w-screen h-[30rem] gap-x-6 text-whie bg-sky-200 flex justify-center items-center' >
                        <div>
                            <motion.img 
                            initial={{opacity:0}}
                            whileInView={{opacity:1}}
                            key={i}
                            src={`/img/${data.img}.png`}  
                            className='w-full h-full lg:object-fill object-center object-cover' />
                        </div>

                        <motion.div 
                        className='flex flex-col gap-y-8'
                        initial={{opacity:0}}
                        whileInView={{opacity:1}}
                        key={i}
                        >
                            <h1 className=" text-2xl md:text-5xl">{data.title}</h1>
                            <h1 className=" text-xl md:text-2xl">{data.desc}</h1>
                            <Button link={data.link} >Buy Now</Button>
                        </motion.div>


                    </div>
                ))}  
            </div>
        </section>
        {/* left */}
        <button className='z-50 absolute top-1/2  -translate-y-1/2 md:left-10 left-4' onClick={()=>handlePrevious()} ><FaAngleLeft className='w-12 text-white h-12 rounded-full bg-black/20 p-2 z-50 px-2' /></button>
        {/* right */}
        <button className='z-50 absolute top-1/2 -translate-y-1/2 md:right-10 right-4' onClick={()=>handleNext()} ><FaAngleRight className='w-12 text-white h-12 rounded-full bg-black/20 p-2 z-50 px-2' /></button>
    </section>
   
  )
}

export default HomeHero