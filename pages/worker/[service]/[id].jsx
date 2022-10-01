import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import Title from "../../../components/Title"
import { FaUser, FaLocationArrow, FaPhone, FaEnvelope } from "react-icons/fa"
import { RiPinDistanceLine } from "react-icons/ri"
import { MdTimer } from "react-icons/md"
import Spinner from "../../../components/Spinner"
import ErrorTxt from "../../../components/ErrorText"
import { getDistanceAndTime } from "../../../util/util"
import { Context } from "../../../components/Context"

const WorkerReport = ({ data }) => {
    const { userData, setUserData, userCoords, setUserCoords } =
        useContext(Context)
    const { service, id } = useRouter().query
    const [status, setStatus] = useState(userData?.online)

    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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
                `http://localhost:3000/api/${service}Details`,
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

    return (
        <main className="px-6 lg:px-10 mb-10">
            <Title>Services Requested</Title>
            <Title>{userData?.name == null ? "Worker" : userData?.name}</Title>
            <div className="md:flex justify-center text-xl items-center gap-x-10 my-1 md:w-max mx-auto rounded-md border-2 p-2 border-gray-400">
                <div className="flex items-center gap-x-2 w-max mx-auto">
                    <div
                        className={`h-2 w-2 rounded-full ${
                            status ? "bg-green-500" : "bg-red-500"
                        }`}
                    />
                    <h1>{status ? "Active" : "Busy"}</h1>
                </div>

                <button
                    onClick={() => handleStatusAndLocation(!status)}
                    className="px-6 py-2  w-max  font-rale bg-gradient-to-r from-sky-400 to-blue-600 text-white rounded-lg block mx-auto my-4"
                >
                    Switch Status
                </button>
                <button
                    onClick={() => handleStatusAndLocation(status)}
                    className="px-6 py-2  w-max  font-rale bg-gradient-to-r from-sky-400 to-blue-600 text-white rounded-lg block mx-auto my-4"
                >
                    Update Location
                </button>
                {isLoading && <Spinner />}
                {isError && <ErrorTxt />}
            </div>

            {data.length > 0 ? (
                <div className="grid lg:grid-cols-3 mt-8 gap-8 grid-cols-1">
                    {data.map((d, i) => (
                        <Card key={i} d={d} coords={userCoords} />
                    ))}
                </div>
            ) : (
                <Title>No Requests</Title>
            )}
        </main>
    )
}

export const Card = ({ d, coords }) => {
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
            <h1 className="text-black text-3xl font-semibold capitalize">
                {d.name}
            </h1>
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
            `http://localhost:3000/api/bookingDetails?id=${id}`
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
