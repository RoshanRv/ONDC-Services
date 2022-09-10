import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import Title from "../../../components/Title"
import { FaUser, FaLocationArrow, FaPhone, FaEnvelope } from "react-icons/fa"
import Spinner from "../../../components/Spinner"
import ErrorTxt from "../../../components/ErrorText"

const WorkerReport = ({ data }) => {
    const [user, setUser] = useState("")
    const { service, id } = useRouter().query
    const [status, setStatus] = useState(data.online)

    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) setUser(user)
    }, [])

    const handleStatus = async () => {
        setIsLoading(true)
        setIsError(false)
        try {
            const resp = await axios.put(
                `https://novicers-i-tech-ondc.vercel.app/api/${service}Details`,
                { id, online: !status }
            )
            console.log(resp)
            setStatus(!status)
            setIsLoading(false)
        } catch (err) {
            setIsError(true)
            setIsLoading(false)
            console.log(err)
        }
    }

    return (
        <main className="px-6 lg:px-10">
            <Title>Services Requested</Title>
            <Title>{user == null ? "Worker" : user}</Title>
            <div className="flex text-xl items-center gap-x-2 my-1 md:w-max mx-auto rounded-md border-2 p-2 border-gray-400">
                <div
                    className={`h-2 w-2 rounded-full ${
                        status ? "bg-green-500" : "bg-red-500"
                    }`}
                />
                <h1>{status ? "Active" : "Busy"}</h1>
                <button
                    onClick={handleStatus}
                    className="px-6 py-2  font-rale bg-gradient-to-r from-sky-400 to-blue-600 text-white rounded-lg block mx-10 my-4"
                >
                    Switch Status
                </button>
                {isLoading && <Spinner />}
                {isError && <ErrorTxt />}
            </div>
            <div className="grid lg:grid-cols-3 mt-8 gap-8 grid-cols-1">
                {data.map((d) => (
                    <div className="bg-sky-300 md:p-4 p-2  border-2 rounded-lg ">
                        <h1 className="text-black text-3xl font-semibold capitalize">
                            {d.name}
                        </h1>
                        <div className="flex gap-x-4 mx-auto items-center text-lg my-2 border border-black  px-6 py-2 rounded-lg bg-white ">
                            <FaPhone />
                            <h1>{d.phone}</h1>
                        </div>
                        <div className="flex gap-x-4 mx-auto items-center text-lg my-2 border border-black  px-6 py-2 rounded-lg bg-white ">
                            <FaLocationArrow />
                            <h1>{d.address}</h1>
                        </div>
                        <div className="flex gap-x-4 mx-auto items-center text-lg my-2 border border-black  px-6 py-2 rounded-lg bg-white ">
                            <h1 className="font-semibold">Age :</h1>
                            <h1>{d.age}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </main>
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
