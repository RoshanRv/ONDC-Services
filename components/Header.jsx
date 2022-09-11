import Link from "next/link"
import React from "react"
import { FaUser } from "react-icons/fa"
import { BiLogIn } from "react-icons/bi"

const Header = () => {
    return (
        <header className="p-1 md:p-3 lg:px-6 lg:py-3 font-rale bg-gradient-to-r from-sky-400 to-blue-600">
            <nav className="flex justify-between items-center text-white">
                <Link href={"/"} passHref>
                    <h1 className="text-4xl font-bold cursor-pointer">ONDC</h1>
                </Link>

                <div className="flex gap-x-6 md:gap-x-10">
                    <Link href={"/register"} passHref>
                        <div className="flex gap-x-4 cursor-pointer">
                            <FaUser className="text-2xl" />
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
