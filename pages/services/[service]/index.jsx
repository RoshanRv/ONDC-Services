import React, { useState } from "react"
import Title from "../../../components/Title"
import { useRouter } from "next/router"
import Card from "../../../components/Card"
import axios from "axios"
import Head from "next/head"
import Search from "../../../components/Search"

const Service = ({ details }) => {
    const [workerDetails, setWorkerDetails] = useState(details)
    const { service } = useRouter().query
    const [filterTime, setFilterTime] = useState(100000000)

    const searchWorker = (search, filter) => {
        if (filter == "") {
            setWorkerDetails(
                details.filter((data) =>
                    data.name.toLowerCase().includes(search.toLowerCase())
                )
            )
        } else {
            const status = filter == "true" ? true : filter == "false" && false
            setWorkerDetails(
                details.filter(
                    (data) =>
                        data.name
                            .toLowerCase()
                            .includes(search.toLowerCase()) &&
                        data.online === status
                )
            )
        }
    }

    const sortWorker = (sort) => {
        const data = [...workerDetails]
        if (sort == "_id" || sort == "name") {
            data.sort((a, b) => {
                let x = a[sort].toLowerCase()
                let y = b[sort].toLowerCase()
                if (x < y) {
                    return -1
                }
                if (x > y) {
                    return 1
                }
                return 0
            })
        } else {
            data.sort((a, b) => a[sort] - b[sort])
        }
        setWorkerDetails(data)
    }

    return (
        <>
            <Head>
                <title>ONDC | {service}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content={`One Stop For ${service} Services`}
                />
            </Head>
            <main className="text-center mb-10">
                <Title>{`${service} Services`}</Title>
                <Search
                    searchWorker={searchWorker}
                    sortWorker={sortWorker}
                    setFilterTime={setFilterTime}
                />
                <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 grid-cols-1 w-max mx-auto">
                    {workerDetails.map((data) => (
                        <Card
                            key={data._id}
                            data={data}
                            filterTime={filterTime}
                        />
                    ))}
                </section>
            </main>
        </>
    )
}

export default Service

export const getServerSideProps = async ({ query }) => {
    try {
        let { service } = query
        if (service == "Vehicle" || service == "vehicle") service = "driver"
        const details = await axios.get(
            `https://novicers-i-tech-ondc.vercel.app/api/${service}Details`
        )

        return {
            props: {
                details: details.data,
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
