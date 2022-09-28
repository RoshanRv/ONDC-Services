import Title from "../components/Title"
import HomeHero from "../components/HomeHero"
import ServiceList from "../components/ServiceList"
import Head from "next/head"
import { useContext } from "react"
import { Context } from "../components/Context"

const Home = () => {
    // const { userData, setUserData } = useContext(Context)
    // console.log(userData)

    return (
        <>
            <Head>
                <title>ONDC | Home</title>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content={`One Stop For Quick Services`}
                />
            </Head>
            <main className="mb-20">
                <HomeHero />
                <Title>Services</Title>
                <ServiceList />
            </main>
        </>
    )
}

export default Home
