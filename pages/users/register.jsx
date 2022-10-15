import React, { useState, useEffect, useContext } from "react"
import Title from "../../components/Title"
import { motion } from "framer-motion"
import axios from "axios"
import { useRouter } from "next/router"
import Link from "next/link"
import Spinner from "../../components/Spinner"
import ErrorTxt from "../../components/ErrorText"
import { Context } from "../../components/Context"

const register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [age, setAge] = useState("")

    const { userCoords } = useContext(Context)

    const [passIncorrect, setPassIncorrect] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    //      get coords...
    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition((pos) =>
    //         setCoords({
    //             lat: pos.coords.latitude,
    //             lng: pos.coords.longitude,
    //         })
    //     )
    // }, [])

    const navigate = useRouter()

    const handleSubmit = async (e) => {
        setPassIncorrect(true)
        setIsError(false)

        if (
            username != "" &&
            email != "" &&
            password != "" &&
            phone != "" &&
            address != ""
        ) {
            e.preventDefault()
            if (password == password2) {
                setPassIncorrect(false)
                setIsLoading(true)
                try {
                    const details = await axios.post(
                        `https://novicers-i-tech-ondc.vercel.app/api/user`,
                        {
                            name: username,
                            email,
                            password,
                            phone,
                            address,
                            age,
                            coords: userCoords,
                        }
                    )
                    setIsLoading(false)
                    setTimeout(() => {
                        navigate.push("/users/login")
                    }, 3000)
                } catch (err) {
                    console.log(err)
                    setIsLoading(false)
                    setIsError(true)
                }
            } else {
                setPassIncorrect(true)
            }
        }
    }

    return (
        <main className="md:px-6 px-3">
            <Title>Register As User</Title>
            {/*     FORM        */}
            <div>
                <form
                    onSubmit={handleSubmit}
                    className="w-full md:w-9/12 lg:w-6/12 mb-10 mx-auto text-lg border-2 rounded-xl border-black  bg-gradient-to-r from-sky-400 to-blue-600"
                >
                    {/*  */}
                    <div className="flex flex-col gap-y-6 p-2 md:p-10">
                        <motion.input
                            required
                            type="text"
                            value={username}
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            className="p-2  rounded-lg border-gray-700 outline-0 w-full block"
                            whileTap={{ scale: 0.8 }}
                        />
                        <motion.input
                            required
                            type="email"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-2  rounded-lg border-gray-700 outline-0 w-full block"
                            whileTap={{ scale: 0.8 }}
                        />
                        {passIncorrect && (
                            <label className="text-red-600 text-sm">
                                Password Mismatch
                            </label>
                        )}
                        <motion.input
                            required
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className={`p-2 ${
                                passIncorrect && "border-2 border-red-600"
                            } rounded-lg  outline-0 w-full block`}
                            whileTap={{ scale: 0.8 }}
                        />
                        <motion.input
                            required
                            type="password"
                            value={password2}
                            placeholder="Confirm Password"
                            onChange={(e) => setPassword2(e.target.value)}
                            className={`p-2 ${
                                passIncorrect && "border-2 border-red-600"
                            } rounded-lg  outline-0 w-full block`}
                            whileTap={{ scale: 0.8 }}
                        />
                        <motion.input
                            required
                            type="tel"
                            value={phone}
                            placeholder="Phone"
                            onChange={(e) => setPhone(e.target.value)}
                            className="p-2  rounded-lg border-gray-700 outline-0 w-full block"
                            whileTap={{ scale: 0.8 }}
                        />

                        <motion.textarea
                            rows={5}
                            required
                            value={address}
                            placeholder="Address"
                            onChange={(e) => setAddress(e.target.value)}
                            className="p-2  rounded-lg border-gray-700 outline-0 w-full block"
                            whileTap={{ scale: 0.8 }}
                        />
                        <motion.input
                            required
                            type="number"
                            value={age}
                            placeholder="Age"
                            onChange={(e) => setAge(e.target.value)}
                            className="p-2  rounded-lg border-gray-700 outline-0 w-full block"
                            whileTap={{ scale: 0.8 }}
                        />

                        <motion.input
                            type={"submit"}
                            className="px-6 py-2 cursor-pointer w-max font-rale font-semibold bg-white text-blue-500 rounded-lg block mx-auto my-4"
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.8 }}
                            value="Register"
                        />

                        {isLoading && <Spinner />}
                        {isError && <ErrorTxt />}

                        <Link href="/users/login" passHref>
                            <h1 className="text-gray-100 hover:underline hover:text-white w-max mx-auto  text-lg">
                                Login
                            </h1>
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default register
