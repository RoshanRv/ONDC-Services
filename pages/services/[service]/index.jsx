import React from "react"
import Title from "../../../components/Title"
import { useRouter } from "next/router"
import Card from "../../../components/Card"
import axios from "axios"

const Service = ({ details }) => {
    const { service } = useRouter().query

    return (
        <main className="text-center mb-10">
            <Title>{`${service} Services`}</Title>
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 grid-cols-1 w-max mx-auto">
                {details.map((data, i) => (
                    <Card key={i} data={data} />
                ))}
            </section>
        </main>
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
