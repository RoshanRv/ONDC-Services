import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const serviceDetails = [
    {
        service: "Vehicle Services",
        img: "/img/cab.jpeg",
        url: "/services/vehicle",
    },
    {
        service: "Electrician Services",
        img: "/img/electrician.jpeg",
        url: "/services/electrician",
    },
    {
        service: "Plumber Services",
        img: "/img/plumber.jpeg",
        url: "/services/plumber",
    },
    {
        service: "Carpenter Services",
        img: "/img/carpenter.jpeg",
        url: "/services/carpenter",
    },
    {
        service: "Painting Services",
        img: "/img/painter.jpeg",
        url: "/services/painter",
    },
    {
        service: "Cleaning Services",
        img: "/img/cleaner.jpeg",
        url: "/services/cleaner",
    },
]

const ServiceCard = ({ service, img, url }) => {
    return (
        <Link href={url} passHref>
            <div className=" rounded-lg cursor-pointer">
                <div className="relative w-full group overflow-hidden">
                    <img
                        className="rounded-lg group-hover:scale-125  transition-all "
                        src={img}
                        alt=""
                    />
                    <div className="group-hover:h-full transition-all absolute bottom-0 bg-gradient-to-t from-black to-black/50 text-white h-12 md:h-16 flex flex-col justify-center w-full">
                        <h1 className="w-max mx-auto font-semibold text-xl md:text-3xl text-center my-4">
                            {service}
                        </h1>
                    </div>
                </div>
            </div>
        </Link>
    )
}

const ServiceList = () => {
    return (
        <div className="md:px-6 px-2">
            <motion.section className="grid lg:grid-cols-3 gap-8 grid-cols-1">
                {serviceDetails.map(({ service, img, url }, i) => (
                    <ServiceCard
                        img={img}
                        key={i}
                        service={service}
                        url={url}
                    />
                ))}

                {/*         MORE SOON */}

                <div className=" rounded-lg cursor-pointer">
                    <div className="relative group overflow-hidden">
                        <img
                            className="rounded-lg group-hover:scale-125  transition-all "
                            src="/img/plumber.jpeg"
                            alt=""
                        />
                        <div className="h-full transition-all absolute bottom-0 bg-gradient-to-t from-black to-black/60 text-white flex flex-col justify-center w-full">
                            <h1 className="w-max mx-auto font-semibold text-xl md:text-3xl text-center my-4">
                                More Services Soon
                            </h1>
                        </div>
                    </div>
                </div>
            </motion.section>
        </div>
    )
}

export default ServiceList
