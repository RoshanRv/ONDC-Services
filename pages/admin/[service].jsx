import React, { useState, useEffect, useContext } from "react"
import { Context } from "../../components/Context"
import axios from "axios"
import Title from "../../components/Title"
import { useRouter } from "next/router"
import {
    FaAddressCard,
    FaEnvelope,
    FaLocationArrow,
    FaPhoneAlt,
    FaUser,
} from "react-icons/fa"
import { TbOld } from "react-icons/tb"
import { motion } from "framer-motion"
import Spinner from "../../components/Spinner"
import ErrorTxt from "../../components/ErrorText"

const WorkerVerification = ({ data }) => {
    const { service } = useRouter().query
    const [workerDetails, setWorkerDetails] = useState(data)
    const { userData } = useContext(Context)
    const navigate = useRouter()

    useEffect(() => {
        if (userData?.name != "admin") navigate.push("/admin/login")
    }, [])

    return (
        <main className="md:px-10 px-4">
            <Title>{service + " Verification"}</Title>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {workerDetails?.map((detail, i) => (
                    <VerificationCard
                        key={i}
                        detail={detail}
                        setWorkerDetails={setWorkerDetails}
                    />
                ))}
            </div>
        </main>
    )
}

const VerificationCard = ({ detail, setWorkerDetails }) => {
    const { service } = useRouter().query
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleAccept = async () => {
        setIsLoading(true)
        setIsError(false)
        try {
            const data = await axios.put(
                `https://novicers-i-tech-ondc.vercel.app/api/verification?role=${service}`,
                { id: detail._id, isVerified: true }
            )
            setIsLoading(false)
            setWorkerDetails((prev) =>
                prev.filter((worker) => worker._id != detail._id)
            )
        } catch (err) {
            setIsLoading(false)
            setIsError(true)
            console.log(err)
        }
    }

    const handleReject = async () => {
        setIsLoading(true)
        setIsError(false)
        try {
            const data = await axios.delete(
                `https://novicers-i-tech-ondc.vercel.app/api/verification?id=${detail._id}&role=${service}`
            )
            setIsLoading(false)
            setWorkerDetails((prev) =>
                prev.filter((worker) => worker._id != detail._id)
            )
        } catch (err) {
            setIsLoading(false)
            setIsError(true)
            console.log(err)
        }
    }

    return (
        <div>
            <div className="p-6 rounded-md bg-gradient-to-br from-sky-400 via-sky-200 to-sky-400 border-2 border-blue-700 text-center ">
                {/*         Title    */}
                <h1 className="my-2 mb-8 capitalize text-3xl text-blue-700 font-semibold">
                    {service}
                </h1>
                <div className="grid grid-cols-3 w-ma gap-4 auto-rows-min auto-cols-min">
                    <div className="w-24 h-24 border-2 border-black rounded-md row-span-2 bg-white ">
                        <img
                            src={detail.img}
                            alt={detail.name}
                            className="w-full h-full"
                        />
                    </div>
                    <div className="flex items-center gap-x-4">
                        <FaUser />
                        <h1 className="capitalize text-xl">{detail.name}</h1>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <FaPhoneAlt />
                        <h1 className="capitalize text-xl">{detail.phone}</h1>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <FaEnvelope />
                        <h1 className=" text-xl">{detail.email}</h1>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <TbOld className="text-xl" />
                        <h1 className=" text-xl" title="Age">
                            {detail.age}
                        </h1>
                    </div>
                    <div className="flex items-center justify-center gap-x-4 col-span-3 text-clip ">
                        <FaLocationArrow />
                        <h1 className=" text-xl ">{detail.address}</h1>
                    </div>
                    <div className="flex items-center gap-x-4 col-span-3 w-max mx-auto mt-4">
                        <FaAddressCard className="text-2xl" />
                        <h1 className=" text-2xl font-semibold">
                            {detail._id}
                        </h1>
                    </div>
                </div>
            </div>
            <div className="flex">
                <motion.button
                    onClick={() => handleReject()}
                    className="px-6 py-2  w-max font-semibold  font-rale bg-gradient-to-br from-pink-600 via-red-400 to-red-600 text-white rounded-lg block mx-auto my-4 text-xl"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.8 }}
                >
                    Reject
                </motion.button>
                <motion.button
                    onClick={() => handleAccept()}
                    className="px-6 py-2  w-max font-semibold  font-rale bg-gradient-to-br from-lime-600 via-emerald-400 to-emerald-600 text-white rounded-lg block mx-auto my-4 text-xl"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.8 }}
                >
                    Accept
                </motion.button>
            </div>
            {isLoading && <Spinner />}
            {isError && <ErrorTxt />}
        </div>
    )
}

export default WorkerVerification

export const getServerSideProps = async ({ query }) => {
    const { service } = query

    try {
        const data = await axios.get(
            `https://novicers-i-tech-ondc.vercel.app/api/verification?role=${service}`
        )
        return {
            props: {
                data: data.data,
            },
        }
    } catch (err) {
        console.log(err)
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }
}
