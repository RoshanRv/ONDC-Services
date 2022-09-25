import React from "react"
import Title from "../../../components/Title"
import { useRouter } from "next/router"
import Card from "../../../components/Card"
import axios from "axios"
import Head from "next/head"

const Service = ({ details }) => {
    const { service } = useRouter().query

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
                <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 grid-cols-1 w-max mx-auto">
                    {details.map((data, i) => (
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
