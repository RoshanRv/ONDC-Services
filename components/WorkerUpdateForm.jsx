import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Spinner from "./Spinner"
import ErrorTxt from "./ErrorText"
import axios from "axios"

export const DriverUpdateForm = ({ userData, setUserData }) => {
    const [name, setName] = useState(userData?.name)
    const [phone, setPhone] = useState(userData?.phone)
    const [email, setEmail] = useState(userData?.email)
    const [age, setAge] = useState(userData?.age)
    const [img, setImg] = useState(userData?.img)
    const [address, setAddress] = useState(userData?.address)
    //Temp Fields
    const [vehicleType, setVehicleType] = useState(userData?.vehicleType)
    const [vehicleNo, setVehicleNo] = useState(userData?.vehicleNo)
    const [vehicleBrand, setVehicleBrand] = useState(userData?.vehicleBrand)
    const [licenseNo, setLicenseNo] = useState(userData?.licenseNo)
    const [price, setPrice] = useState(userData?.price)
    const [seats, setSeats] = useState(userData?.seats)

    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleReset = () => {
        setName(userData?.name)
        setPhone(userData?.phone)
        setEmail(userData?.email)
        setAge(userData?.age)
        setImg(userData?.img)
        setAddress(userData?.address)
        //Temp Fields
        setVehicleType(userData?.vehicleType)
        setVehicleNo(userData?.vehicleNo)
        setVehicleBrand(userData?.vehicleBrand)
        setLicenseNo(userData?.licenseNo)
        setPrice(userData?.price)
        setSeats(userData?.seats)
    }

    const handleUpdate = async (e) => {
        setIsError(false)
        try {
            if (
                name != "" &&
                email != "" &&
                phone != "" &&
                address != "" &&
                age != "" &&
                img != ""
            ) {
                setIsLoading(true)
                e.preventDefault()
                let resp = await axios.put(
                    `http://localhost:3000/api/driverDetails`,
                    {
                        id: userData._id,
                        name,
                        phone,
                        email,
                        age,
                        img,
                        address,
                        vehicleBrand,
                        vehicleNo,
                        vehicleType,
                        licenseNo,
                        price,
                        seats,
                    }
                )
                resp = { ...resp.data, role: "driver" }
                console.log(resp)
                setUserData(resp)
                localStorage.setItem("user", JSON.stringify(resp))
                setIsError(false)
                setIsLoading(false)
            }
        } catch (err) {
            setIsError(true)
            setIsLoading(false)
            console.log(err)
        }
    }

    // useEffect(() => {
    //handleReset()
    // }, [userData])

    return (
        <motion.section
            className="my-4"
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "max-content" }}
            exit={{ opacity: 0, height: 0 }}
        >
            <form
                onSubmit={handleUpdate}
                className="w-11/12 md:w-8/12 lg:w-5/12 mx-auto p-3 flex flex-col gap-y-10  bg-gradient-to-r from-sky-400 to-blue-600 py-6 text-white rounded-lg"
            >
                <h1 className="text-white font-semibold text-3xl my-1 w-max mx-auto mt-0">
                    Update Details
                </h1>
                <div className="relative w-full ">
                    <input
                        required
                        type={"text"}
                        className="w-full p-1 border-b-2 focus:border-blue-700 border-gray-200 text-lg outline-0 peer placeholder:text-transparent bg-transparent"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className="text-gray-200 text-sm absolute left-1 transition-all -top-5 peer-placeholder-shown:top-0 peer-focus:text-blue-700 peer-placeholder-shown:text-lg select-none pointer-events-none peer-focus:-top-5 peer-focus:text-sm">
                        Username
                    </label>
                </div>

                <div className="relative w-full">
                    <input
                        required
                        type={"tel"}
                        className="w-full p-1 border-b-2 focus:border-blue-700 border-gray-200 text-lg outline-0 peer placeholder:text-transparent bg-transparent"
                        placeholder="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <label className="text-gray-200 text-sm absolute left-1 transition-all -top-5 peer-placeholder-shown:top-0 peer-focus:text-blue-700 peer-placeholder-shown:text-lg select-none pointer-events-none peer-focus:-top-5 peer-focus:text-sm">
                        Phone
                    </label>
                </div>
                <div className="relative w-full">
                    <input
                        required
                        type={"email"}
                        className="w-full p-1 border-b-2 focus:border-blue-700 border-gray-200 text-lg outline-0 peer placeholder:text-transparent bg-transparent"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="text-gray-200 text-sm absolute left-1 transition-all -top-5 peer-placeholder-shown:top-0 peer-focus:text-blue-700 peer-placeholder-shown:text-lg select-none pointer-events-none peer-focus:-top-5 peer-focus:text-sm">
                        Email
                    </label>
                </div>

                <div className="relative w-full">
                    <textarea
                        required
                        rows={1}
                        className="w-full p-1 border-b-2 focus:border-blue-700 border-gray-200 text-lg outline-0 peer placeholder:text-transparent bg-transparent"
                        placeholder="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <label className="text-gray-200 text-sm absolute left-1 transition-all -top-5 peer-placeholder-shown:top-0 peer-focus:text-blue-700 peer-placeholder-shown:text-lg select-none pointer-events-none peer-focus:-top-5 peer-focus:text-sm">
                        Address
                    </label>
                </div>

                {/*       image preview   */}

                <div>
                    <img
                        src={img}
                        className="w-32 h-28 border-2 bg-white border-black mx-auto"
                    />
                </div>

                <div className="relative w-full">
                    <input
                        required
                        type={"text"}
                        className="w-full p-1 border-b-2 focus:border-blue-700 border-gray-200 text-lg outline-0 peer placeholder:text-transparent bg-transparent"
                        placeholder="img"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                    />
                    <label className="text-gray-200 text-sm absolute left-1 transition-all -top-5 peer-placeholder-shown:top-0 peer-focus:text-blue-700 peer-placeholder-shown:text-lg select-none pointer-events-none peer-focus:-top-5 peer-focus:text-sm">
                        Image Url
                    </label>
                </div>

                <div className="relative w-full">
                    <input
                        required
                        type={"text"}
                        className="w-full p-1 border-b-2 focus:border-blue-700 border-gray-200 text-lg outline-0 peer placeholder:text-transparent bg-transparent"
                        placeholder="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <label className="text-gray-200 text-sm absolute left-1 transition-all -top-5 peer-placeholder-shown:top-0 peer-focus:text-blue-700 peer-placeholder-shown:text-lg select-none pointer-events-none peer-focus:-top-5 peer-focus:text-sm">
                        Age
                    </label>
                </div>

                {/*       Temp Fiels    */}
                <div className="relative w-full flex items-center">
                    <input
                        type={"number"}
                        className="w-20 p-1 border-b-2 focus:border-blue-700 border-gray-200 text-lg outline-0 peer placeholder:text-transparent bg-transparent"
                        placeholder="price"
                        value={price}
                        min={1}
                        max={10000}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <h1 className="text-lg">/Km</h1>

                    <label className="text-gray-200 text-sm absolute left-1 transition-all -top-5 peer-placeholder-shown:top-0 peer-focus:text-blue-700 peer-placeholder-shown:text-lg select-none pointer-events-none peer-focus:-top-5 peer-focus:text-sm">
                        Price
                    </label>
                </div>
                <div className="relative w-full">
                    <input
                        type={"number"}
                        className="w-full p-1 border-b-2 focus:border-blue-700 border-gray-200 text-lg outline-0 peer placeholder:text-transparent bg-transparent"
                        placeholder="seats"
                        value={seats}
                        min={1}
                        max={10}
                        onChange={(e) => setSeats(e.target.value)}
                    />
                    <label className="text-gray-200 text-sm absolute left-1 transition-all -top-5 peer-placeholder-shown:top-0 peer-focus:text-blue-700 peer-placeholder-shown:text-lg select-none pointer-events-none peer-focus:-top-5 peer-focus:text-sm">
                        No of Seats
                    </label>
                </div>
                <div className="relative w-full">
                    <input
                        type={"text"}
                        className="w-full p-1 border-b-2 focus:border-blue-700 border-gray-200 text-lg outline-0 peer placeholder:text-transparent bg-transparent"
                        placeholder="licenseNo"
                        value={licenseNo}
                        onChange={(e) => setLicenseNo(e.target.value)}
                    />
                    <label className="text-gray-200 text-sm absolute left-1 transition-all -top-5 peer-placeholder-shown:top-0 peer-focus:text-blue-700 peer-placeholder-shown:text-lg select-none pointer-events-none peer-focus:-top-5 peer-focus:text-sm">
                        License No
                    </label>
                </div>
                <div className="relative w-full">
                    <input
                        type={"text"}
                        className="w-full p-1 border-b-2 focus:border-blue-700 border-gray-200 text-lg outline-0 peer placeholder:text-transparent bg-transparent"
                        placeholder="vehicleNo"
                        value={vehicleNo}
                        onChange={(e) => setVehicleNo(e.target.value)}
                    />
                    <label className="text-gray-200 text-sm absolute left-1 transition-all -top-5 peer-placeholder-shown:top-0 peer-focus:text-blue-700 peer-placeholder-shown:text-lg select-none pointer-events-none peer-focus:-top-5 peer-focus:text-sm">
                        Vehicle No
                    </label>
                </div>
                <div className="relative w-full">
                    <input
                        type={"text"}
                        className="w-full p-1 border-b-2 focus:border-blue-700 border-gray-200 text-lg outline-0 peer placeholder:text-transparent bg-transparent"
                        placeholder="vehicleBrand"
                        value={vehicleBrand}
                        onChange={(e) => setVehicleBrand(e.target.value)}
                    />
                    <label className="text-gray-200 text-sm absolute left-1 transition-all -top-5 peer-placeholder-shown:top-0 peer-focus:text-blue-700 peer-placeholder-shown:text-lg select-none pointer-events-none peer-focus:-top-5 peer-focus:text-sm">
                        Vehicle Brand
                    </label>
                </div>
                <div className="relative w-full">
                    <input
                        type={"text"}
                        className="w-full p-1 border-b-2 focus:border-blue-700 border-gray-200 text-lg outline-0 peer placeholder:text-transparent bg-transparent"
                        placeholder="vehicleType"
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                    />
                    <label className="text-gray-200 text-sm absolute left-1 transition-all -top-5 peer-placeholder-shown:top-0 peer-focus:text-blue-700 peer-placeholder-shown:text-lg select-none pointer-events-none peer-focus:-top-5 peer-focus:text-sm">
                        Vehicle Type
                    </label>
                </div>

                {/*        End of Temp      */}

                {/*       Reset & Sumbit   */}

                <div className="flex">
                    <motion.button
                        onClick={handleReset}
                        className="px-6 py-2 cursor-pointer w-max font-rale font-semibold bg-white text-blue-500 rounded-lg block mx-auto my-4"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.8 }}
                    >
                        Reset
                    </motion.button>

                    <motion.input
                        type={"submit"}
                        className="px-6 py-2 cursor-pointer w-max font-rale font-semibold bg-white text-blue-500 rounded-lg block mx-auto my-4"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.8 }}
                        value="Update"
                    />
                </div>
                {isError && <ErrorTxt />}
                {isLoading && <Spinner />}
            </form>
        </motion.section>
    )
}
