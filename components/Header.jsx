import Link from "next/link"
import React, { useEffect, useContext, useState } from "react"
import { FaSignOutAlt, FaUser } from "react-icons/fa"
import { Context } from "./Context"
import { getDistanceAndTime } from "../util/util"
import { FaSignInAlt, FaUserTie } from "react-icons/fa"
import { BiReceipt } from "react-icons/bi"
import { ImProfile } from "react-icons/im"

const Header = () => {
    const { userCoords, setUserCoords, userData, setUserData } =
        useContext(Context)
    const [dropDown, setDropDown] = useState({ tab: null, show: false })

    useEffect(() => {
        //      set Store Coords
        getDistanceAndTime()
        navigator.geolocation.getCurrentPosition(() => {})
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                setUserCoords({
                    lat: coords.latitude,
                    lng: coords.longitude,
                })
            },
            () => {},
            { maximumAge: 1000 }
        )
        //  set Store User
        const data = JSON.parse(localStorage.getItem("user"))
        if (data) {
            setUserData(data)
        }
    }, [])

    const handleLogout = () => {
        setUserData(null)
        localStorage.removeItem("user")
    }

    const handleShowDropDown = (tab) => {
        setDropDown({ tab, show: true })
    }

    const handleHideDropDown = () => {
        setDropDown({ tab: null, show: false })
    }
    return (
        <header className="p-1 md:p-3 lg:px-6 lg:py-3 font-rale bg-gradient-to-r from-sky-400 to-blue-600">
            <nav className="flex justify-between items-center text-white">
                <Link href={"/"} passHref>
                    <h1 className="text-4xl font-bold cursor-pointer">ONDC</h1>
                </Link>

                {!userData ? (
                    <div className="flex gap-x-6 md:gap-x-10">
                        <div
                            onClick={
                                dropDown.show
                                    ? () => handleHideDropDown()
                                    : () => handleShowDropDown("user")
                            }
                            className="flex flex-col justify-center select-none items-center gap-x-4 cursor-pointer relative"
                        >
                            <FaUser className="text-2xl mb-1" />
                            <h1>User</h1>
                            {/*   Dropdown   */}
                            <div
                                className={`absolute border border-gray-300 shadow-lg -bottom-full translate-y-3/4 text-black bg-white rounded-lg  flex flex-col gap-y-2 ${
                                    dropDown.tab == "user"
                                        ? "scale-100"
                                        : "scale-0"
                                } transition-all origin-top z-50 `}
                            >
                                <Link href={"/users/register"} passHref>
                                    <div className="flex hover:bg-gray-200 transition-all p-3 pb-2 items-center gap-x-4">
                                        <BiReceipt />
                                        <h1>Register</h1>
                                    </div>
                                </Link>
                                <Link href={"/users/login"} passHref>
                                    <div className="flex hover:bg-gray-200 transition-all p-3 pt-2 items-center gap-x-4">
                                        <FaSignInAlt />
                                        <h1>Login</h1>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div
                            onClick={
                                dropDown.show
                                    ? () => handleHideDropDown()
                                    : () => handleShowDropDown("worker")
                            }
                            className="flex flex-col justify-center select-none items-center gap-x-4 cursor-pointer relative"
                        >
                            <FaUserTie className="text-2xl mb-1" />
                            <h1>Servicemen</h1>
                            {/*   Dropdown   */}
                            <div
                                className={`absolute border border-gray-300 shadow-lg -bottom-full translate-y-3/4 text-black bg-white rounded-lg  flex flex-col gap-y-2 ${
                                    dropDown.tab == "worker"
                                        ? "scale-100"
                                        : "scale-0"
                                } transition-all origin-top z-50`}
                            >
                                <Link href={"/worker/register"} passHref>
                                    <div className="flex hover:bg-gray-200 transition-all p-3 pb-2 items-center gap-x-4">
                                        <BiReceipt />
                                        <h1>Register</h1>
                                    </div>
                                </Link>
                                <Link href={"/worker/login"} passHref>
                                    <div className="flex hover:bg-gray-200 transition-all p-3 pt-2 items-center gap-x-4">
                                        <FaSignInAlt />
                                        <h1>Login</h1>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={
                            dropDown.show
                                ? () => handleHideDropDown()
                                : () => handleShowDropDown("logged")
                        }
                        className="flex flex-col justify-center select-none items-center gap-x-4 cursor-pointer relative"
                    >
                        {userData?.img ? (
                            <FaUserTie className="text-2xl mb-1" />
                        ) : (
                            <FaUser className="text-2xl mb-1" />
                        )}
                        <h1 className="capitalize">{userData.name}</h1>
                        {/*   Dropdown   */}
                        <div
                            className={`absolute border border-gray-300 shadow-lg overflow-hidden -translate-x-[10%] -bottom-full translate-y-1/2 text-black bg-white rounded-lg  flex flex-col gap-y-2 ${
                                dropDown.tab == "logged"
                                    ? "scale-100"
                                    : "scale-0"
                            } transition-all origin-top z-50`}
                        >
                            {userData?.role && (
                                <Link
                                    href={`/worker/${userData.role}/${userData._id}`}
                                >
                                    <div className="flex hover:bg-gray-200  transition-all p-3 pb-2 items-center gap-x-4">
                                        <ImProfile />
                                        <h1>Profile</h1>
                                    </div>
                                </Link>
                            )}
                            <div
                                onClick={handleLogout}
                                className="flex hover:bg-gray-200 transition-all p-3 items-center gap-x-4"
                            >
                                <FaSignOutAlt />
                                <h1>Logout</h1>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Header
