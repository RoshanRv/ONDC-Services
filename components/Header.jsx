import Link from "next/link"
import React, { useEffect, useContext, useState } from "react"
import { FaRegistered, FaUser } from "react-icons/fa"
import { BiLogIn } from "react-icons/bi"
import { Context } from "./Context"
import { getDistanceAndTime } from "../util/util"

const Header = () => {
    const { userCoords, setUserCoords } = useContext(Context)
    const [dropDown, setDropDown] = useState({ tab: null, show: false })

    useEffect(() => {
        getDistanceAndTime()
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            setUserCoords({
                lat: coords.latitude,
                lng: coords.longitude,
            })
        })
    }, [])

    return (
        <header className="p-1 md:p-3 lg:px-6 lg:py-3 font-rale bg-gradient-to-r from-sky-400 to-blue-600">
            <nav className="flex justify-between items-center text-white">
                <Link href={"/"} passHref>
                    <h1 className="text-4xl font-bold cursor-pointer">ONDC</h1>
                </Link>

                <div className="flex gap-x-6 md:gap-x-10">
                    <Link href={"/register"} passHref>
                        <div className="flex flex-col justify-center items-center gap-x-4 cursor-pointer relative">
                            <FaUser className="text-2xl" />
                            <h1>User</h1>

                            <div className="absolute -bottom-full bg-red-500 rounded-lg p-3 flex flex-col gap-y-2">
                                <div className="flex ">
                                    <FaRegistered />
                                    <h1>Login</h1>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href={"/worker/login"} passHref>
                        <div className="flex gap-x-4 cursor-pointer">
                            <BiLogIn className="text-2xl" />
                        </div>
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Header
