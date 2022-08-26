import React from 'react'
import Title from './Title'
import { motion } from 'framer-motion'
import Button from './Button'

const newArrivalData = [
    {
        title:'Rolex Watch',
        price:'2000',
        img:'banner1'
    },
    {
        title:'HP Laptop',
        price:'640000',
        img:'banner2'
    },
    {
        title:'Sony XR ',
        price:'440000',
        img:'banner3'
    },
    {
        title:'Boat Earphone',
        price:'600',
        img:'banner4'
    },
    {
        title:'Nike Shoe',
        price:'64000',
        img:'banner5'
    },
    {
        title:'Tommy Wallet',
        price:'8000',
        img:'banner6'
    },
    {
        title:'Glimmer Lipstick',
        price:'1200',
        img:'banner7'
    },
    {
        title:'Wildcraft Bag',
        price:'13000',
        img:'banner8'
    },
    {
        title:'Hercules Cycle',
        price:'9200',
        img:'banner9'
    },
]

const NewArrivals = () => {
  return (
    <section >
        <Title>New Arrivals</Title>

        {/*  */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-max mx-auto">
            {newArrivalData.map((data,i)=>(
                <motion.div
                key={i}
                className='text-white bg-black p-2 md:p-3  '
                >
                    <div className="g-black  w-[22rem] h-[20rem]">
                        <img src={`/img/${data.img}.png`} className='w-full h-full' />
                    </div>

                    <div className='text-center' >
                        <h1 className='text-3xl my-2 font-semibold' >{data.title}</h1>
                        <h1 className='text-xl my-1' >₹ {data.price}</h1>
                    </div>
                    <Button link={`/products/${i}`}  >Buy Now</Button>
                </motion.div>
            ))}
        </div>
    </section>
  )
}

export default NewArrivals