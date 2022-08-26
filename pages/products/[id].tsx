import React from 'react'
import RatingCard from '../../components/RatingCard'
import Button from '../../components/Button'
import { motion } from 'framer-motion'

const data={
    title:'Sony XR ',
    price:'440000',
    img:'banner3',
    rate:'4.1',
    reviews:'12000'
}

const Product = () => {
  return (
    <main className='p-3 md:p-6'>
        <section className='lg:flex gap-x-6 '>
            <div className='lg:w-[30%] h-[25rem]'>
                <img src={`/img/${data.img}.png`} alt="Product Image" className='w-full h-full'/>
            </div>


            <div  className='pt-8 lg:w-[60%] mx-auto'>
                <h1 className="text-black font-semibold my-2 text-5xl">{data.title}</h1>
                <RatingCard rate={data.rate} reviews={data.reviews} />
                <h1 className="text-black my-6 text-xl">₹ {data.price}</h1>
                <h1 className="text-black/80 my-6 text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quidem vero corporis optio voluptate veniam sit nisi, minima perferendis numquam aspernatur, voluptatum enim natus. Ducimus reiciendis asperiores culpa nesciunt voluptas?</h1>

                {/*   buy andadd cart */}
                <div className="flex gap-x-2 items-center text-xl text-white">
                    <motion.button
                    className='px-6 py-2 font-rale bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-lg block mx-auto my-4'
                    whileHover={{scale:1.15}}
                    whileTap={{scale:0.8}}
                    >Buy Now
                    </motion.button>

                    <motion.button
                    className='px-6 py-2 font-rale bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-lg block mx-auto my-4'
                    whileHover={{scale:1.15}}
                    whileTap={{scale:0.8}}
                    >Add To Cart
                    </motion.button>
                </div>
            </div>



        </section>
    </main>
  )
}

export default Product