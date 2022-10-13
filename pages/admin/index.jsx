import React, { useContext } from "react"
import { Context } from "../../components/Context"
import { useRouter } from "next/router"
import Title from "../../components/Title"
import Link from "next/link"

const index = () => {
    const { userData } = useContext(Context)
    const navigate = useRouter()

    // if (userData?.name != "admin") navigate.push("/admin/login")

    return (
        <main>
            <Title>Verify Workers</Title>
            <div className="grid md:grid-cols-3 grid-cols-2 w-max mx-auto gap-10">
                {[
                    "electrician",
                    "plumber",
                    "cleaner",
                    "painter",
                    "driver",
                    "carpenter",
                ].map((role, i) => (
                    <Link href={`/admin/${role}`}>
                        <div
                            key={i}
                            className="p-6 rounded-lg bg-gradient-to-r from-sky-400 to-blue-600  cursor-pointer"
                        >
                            <h1 className="text-white text-2xl text-center capitalize">
                                {role}
                            </h1>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    )
}

export default index
