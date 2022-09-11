import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const ServiceList = () => {
    return (
        <div className="md:px-6 px-2">
            <motion.section className="grid lg:grid-cols-3 gap-8 grid-cols-1">
                {/*         CAB      */}
                <Link href={"/services/vehicle"} passHref>
                    <div className=" rounded-lg cursor-pointer">
                        <div className="relative w-full group overflow-hidden">
                            <img
                                className="rounded-lg group-hover:scale-125  transition-all "
                                src="/img/cab.jpeg"
                                alt=""
                            />
                            <div className="group-hover:h-full transition-all absolute bottom-0 bg-gradient-to-t from-black to-black/50 text-white h-max flex flex-col justify-center w-full">
                                <h1 className="w-max mx-auto font-semibold text-xl md:text-3xl text-center my-4">
                                    Vehicle Services
                                </h1>
                            </div>
                        </div>
                    </div>
                </Link>

                {/*         Electrician     */}
                <Link href={"/services/electrician"} passHref>
                    <div className=" rounded-lg cursor-pointer">
                        <div className="relative group overflow-hidden">
                            <img
                                className="rounded-lg group-hover:scale-125  transition-all "
                                src="/img/electrician.jpeg"
                                alt=""
                            />
                            <div className="group-hover:h-full transition-all absolute bottom-0 bg-gradient-to-t from-black to-black/50 text-white h-max flex flex-col justify-center w-full">
                                <h1 className="w-max mx-auto font-semibold text-xl md:text-3xl text-center my-4">
                                    Electrician Services
                                </h1>
                            </div>
                        </div>
                    </div>
                </Link>
                {/*         Plumber      */}
                <Link href={"/services/plumber"} passHref>
                    <div className=" rounded-lg cursor-pointer">
                        <div className="relative group overflow-hidden">
                            <img
                                className="rounded-lg group-hover:scale-125  transition-all "
                                src="/img/plumber.jpeg"
                                alt=""
                            />
                            <div className="group-hover:h-full transition-all absolute bottom-0 bg-gradient-to-t from-black to-black/50 text-white h-max flex flex-col justify-center w-full">
                                <h1 className="w-max mx-auto font-semibold text-xl md:text-3xl text-center my-4">
                                    Plumber Services
                                </h1>
                            </div>
                        </div>
                    </div>
                </Link>

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
