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

    // const sortWorker = (sort) => {
    //     workerDetails.sort((a[sort], b[sort]))
    // }

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
                <Search searchWorker={searchWorker} />
                <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 grid-cols-1 w-max mx-auto">
                    {workerDetails.map((data, i) => (
                        <Card key={i} data={data} />
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
            `http://localhost:3000/api/${service}Details`
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
