import React, { useContext } from "react"
import { Context } from "../../components/Context"
import { useRouter } from "next/router"
import Title from "../../components/Title"
import Link from "next/link"
import { useEffect } from "react"

const serviceDetails = [
    {
        service: "Driver",
        img: "/img/cab.jpeg",
        url: "/admin/driver",
    },
    {
        service: "Electrician",
        img: "/img/electrician.jpeg",
        url: "/admin/electrician",
    },
    {
        service: "Plumber",
        img: "/img/plumber.jpeg",
        url: "/admin/plumber",
    },
    {
        service: "Carpenter",
        img: "/img/carpenter.jpeg",
        url: "/admin/carpenter",
    },
    {
        service: "Painter",
        img: "/img/painter.jpeg",
        url: "/admin/painter",
    },
    {
        service: "Cleaner",
        img: "/img/cleaner.jpeg",
        url: "/admin/cleaner",
    },
]

const index = () => {
    const { userData } = useContext(Context)
    console.log(userData)
    const navigate = useRouter()

    // useEffect(() => {
    //     if (userData?.name != "admin") navigate.push("/admin/login")
    // }, [userData])

    return (
        <main className="px-4 md:px-10 m-10">
            <Title>Verify Workers</Title>
            <div className="grid md:grid-cols-3 grid-cols-2 mx-auto gap-10">
                {serviceDetails.map((data, i) => (
                    <Link href={data.url} key={i}>
                        <div className=" cursor-pointer  rounded-md ">
                            <div>
                                <img src={data.img} alt="" />
                            </div>
                            <h1 className="text-white bg-black p-2 text-2xl text-center capitalize">
                                {data.service}
                            </h1>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    )
}

export default index
