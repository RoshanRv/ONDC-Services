import React, { useEffect, useState, useContext } from "react"
import { Context } from "./Context"
import Button from "./Button"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { FaPhoneAlt } from "react-icons/fa"
import { RiPinDistanceLine } from "react-icons/ri"
import { MdTimer } from "react-icons/md"
import { getDistanceAndTime } from "../util/util"

const Card = ({ data }) => {
    const { service } = useRouter().query
    const { userCoords } = useContext(Context)
    const [distTime, setDistTime] = useState({})

    useEffect(() => {
        setDistTime(
            getDistanceAndTime(
                userCoords?.lat,
                data.coords.lat,
                userCoords?.lng,
                data.coords.lng
            )
        )
    }, [userCoords])

    return (
        <div className="w-max text-left p-3 rounded-xl border-2  border-gray-400  overflow-hidden">
            <div className="w-60 md:w-96 h-60 md:h-80 ">
                <img
                    src={data.img}
                    alt=""
                    className="object-cover hover:scale-105 transition-all w-full h-full"
                />
            </div>
            <div className="">
                <h1 className="text-3xl my-2 font-semibold">{data.name}</h1>
                {/*        Active/ Busy Status      */}
                <div className="flex text-xl items-center gap-x-2 my-1">
                    <motion.div
                        className={`h-2 w-2 rounded-full ${
                            data.online ? "bg-green-500" : "bg-red-500"
                        }`}
                        animate={{ scale: [0.7, 1.2, 0.7] }}
                        transition={{ repeat: Infinity }}
                    />
                    <h1>{data.online ? "Active" : "Busy"}</h1>
                </div>

                {/*    Distance & Time */}

                <div className="flex  gap-x-4 ">
                    <div className="justify-center flex gap-x-2 items-center text-lg my-3 border border-gray-300 w-max px-3 py-1 rounded-lg bg-gray-100 ">
                        <RiPinDistanceLine className="" />
                        <h1>{`${distTime?.dist || "--"} km`}</h1>
                    </div>

                    <div className="justify-center flex gap-x-2 items-center text-lg my-3 border border-gray-300 w-max px-3 py-1 rounded-lg bg-gray-100 ">
                        <MdTimer className="" />
                        <h1>{`${distTime?.time || "--"} min`}</h1>
                    </div>
                </div>

                {/*      Phone NO     */}
                <div className="flex gap-x-2 items-center bg-gray-100  px-4 border py-1 border-gray-300 rounded-lg w-max">
                    <FaPhoneAlt />
                    <h1 className=" my-1">{data.phone}</h1>
                </div>
            </div>
            <div className="md:flex items-center mt-6">
                <Button link={`/services/${service}/${data._id}`}>
                    View Details
                </Button>
                <Button link={`/services/${service}/${data._id}`}>
                    Book Now
                </Button>
            </div>
        </div>
    )
}

export default Card
