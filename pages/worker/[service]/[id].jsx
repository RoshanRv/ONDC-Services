import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import Title from "../../../components/Title"
import { FaLocationArrow, FaPhone, FaTrashAlt } from "react-icons/fa"
import { RiPinDistanceLine } from "react-icons/ri"
import { MdTimer } from "react-icons/md"
import Spinner from "../../../components/Spinner"
import ErrorTxt from "../../../components/ErrorText"
import { getDistanceAndTime } from "../../../util/util"
import { Context } from "../../../components/Context"
import {
    DriverUpdateForm,
    WorkerUpdateForm,
} from "../../../components/WorkerUpdateForm"
import { AnimatePresence, motion } from "framer-motion"

const WorkerReport = ({ data }) => {
    const { userData, setUserData, userCoords, setUserCoords } =
        useContext(Context)

    const [workerRequests, setWorkerRequests] = useState(data)

    const { service, id } = useRouter().query
    const [status, setStatus] = useState(userData?.online)

    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showUpdateForm, setshowUpdateForm] = useState(false)

    useEffect(() => {
        setStatus(userData?.online)
    }, [])

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            setUserCoords({
                lat: coords.latitude,
                lng: coords.longitude,
            })
        })
    }

    const handleStatusAndLocation = async (online) => {
        setIsLoading(true)
        setIsError(false)
        try {
            getLocation()
            let resp = await axios.put(
                `https://novicers-i-tech-ondc.vercel.app/api/${service}Details`,
                { id, online, coords: userCoords }
            )
            // users prev details (role) + new coords,status
            resp = {
                ...userData,
                coords: resp.data.coords,
                online: resp.data.online,
            }
            localStorage.setItem("user", JSON.stringify(resp))
            setUserData(resp)
            setStatus(online)
            setIsLoading(false)
        } catch (err) {
            setIsError(true)
            setIsLoading(false)
            console.log(err)
        }
    }

    const handleDeleteRequests = async (id) => {
        try {
            const resp = await axios.delete(
                `https://novicers-i-tech-ondc.vercel.app/api/bookingDetails?id=${id}`
            )
            console.log(resp.data)
            setWorkerRequests((prev) =>
                prev.filter((req) => req._id != resp.data._id)
            )
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <main className="px-6 lg:px-10 mb-10">
            <Title>Services Requested</Title>
            <Title>{userData?.name == null ? "Worker" : userData?.name}</Title>

            <motion.button
                onClick={() => setshowUpdateForm(!showUpdateForm)}
                className="px-6 py-2  w-max  font-rale bg-gradient-to-r from-sky-400 to-blue-600 text-white rounded-lg block mx-auto my-4"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.8 }}
            >
                Update Details
            </motion.button>

            <AnimatePresence>
                {userData && service === "driver" && showUpdateForm ? (
                    <DriverUpdateForm
                        userData={userData}
                        setUserData={setUserData}
                    />
                ) : (
                    userData &&
                    service !== "driver" &&
                    showUpdateForm && (
                        <WorkerUpdateForm
                            userData={userData}
                            setUserData={setUserData}
                        />
                    )
                )}
            </AnimatePresence>

            <div className="md:flex justify-center text-xl items-center gap-x-10 my-1 md:w-max mx-auto rounded-md border-2 p-2 border-gray-400">
                <div className="flex items-center gap-x-2 w-max mx-auto">
                    <div
                        className={`h-2 w-2 rounded-full ${
                            status ? "bg-green-500" : "bg-red-500"
                        }`}
                    />
                    <h1>{status ? "Active" : "Busy"}</h1>
                </div>

                <motion.button
                    onClick={() => handleStatusAndLocation(!status)}
                    className="px-6 py-2  w-max  font-rale bg-gradient-to-r from-sky-400 to-blue-600 text-white rounded-lg block mx-auto my-4"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.8 }}
                >
                    Switch Status
                </motion.button>
                <motion.button
                    onClick={() => handleStatusAndLocation(status)}
                    className="px-6 py-2  w-max  font-rale bg-gradient-to-r from-sky-400 to-blue-600 text-white rounded-lg block mx-auto my-4"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.8 }}
                >
                    Update Location
                </motion.button>
                {isLoading && <Spinner />}
                {isError && <ErrorTxt />}
            </div>

            {workerRequests?.length > 0 ? (
                <div className="grid lg:grid-cols-3 mt-8 gap-8 grid-cols-1">
                    {workerRequests.map((d, i) => (
                        <Card
                            key={i}
                            d={d}
                            coords={userCoords}
                            handleDeleteRequests={handleDeleteRequests}
                        />
                    ))}
                </div>
            ) : (
                <Title>No Requests</Title>
            )}
        </main>
    )
}

export const Card = ({ d, coords, handleDeleteRequests }) => {
    const [distTime, setDistTime] = useState({})
    useEffect(() => {
        setDistTime(
            getDistanceAndTime(
                coords?.lat,
                d.coords?.lat,
                coords?.lng,
                d.coords?.lng
            )
        )
    }, [coords])

    return (
        <div className="bg-sky-300 md:p-4 p-2  border-2 rounded-lg ">
            <div className="flex items-center justify-between">
                <h1 className="text-black text-3xl font-semibold capitalize">
                    {d.name}
                </h1>
                <FaTrashAlt
                    className="text-red-500 mr-2"
                    onClick={() => handleDeleteRequests(d._id)}
                />
            </div>
            <div className="flex gap-x-4 mx-auto items-center text-lg my-2 border border-gray-300  px-6 py-2 rounded-lg bg-white ">
                <FaPhone />
                <h1>{d.phone}</h1>
            </div>
            {/*    Distance & Time */}

            <div className="flex  gap-x-4 ">
                <div className=" flex gap-x-2 items-center text-lg my-2 border border-gray-300 w-full px-6 py-2 rounded-lg bg-white ">
                    <RiPinDistanceLine className="" />
                    <h1>{`${distTime?.dist || "--"} km`}</h1>
                </div>

                <div className=" flex gap-x-2 items-center text-lg my-2 border border-gray-300 w-full px-6 py-2 rounded-lg bg-white ">
                    <MdTimer className="" />
                    <h1>{`${distTime?.time || "--"} min`}</h1>
                </div>
            </div>
            <div className="flex gap-x-4 mx-auto items-center text-lg my-2 border border-gray-300  px-6 py-2 rounded-lg bg-white ">
                <FaLocationArrow />
                <h1>{d.address}</h1>
            </div>
            <div className="flex gap-x-4 mx-auto items-center text-lg my-2 border border-gray-300  px-6 py-2 rounded-lg bg-white ">
                <h1 className="font-semibold">Age :</h1>
                <h1>{d.age}</h1>
            </div>
        </div>
    )
}

export default WorkerReport

export const getServerSideProps = async ({ query }) => {
    const { id } = query
    try {
        const data = await axios.get(
            `https://novicers-i-tech-ondc.vercel.app/api/bookingDetails?id=${id}`
        )

        return {
            props: {
                data: data.data,
            },
        }
    } catch (err) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }
}
