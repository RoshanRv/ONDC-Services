import Title from "../components/Title"
import HomeHero from "../components/HomeHero"
import ServiceList from "../components/ServiceList"
import Head from "next/head"
import { useEffect, useState } from "react"

const Home = () => {
    const [state, setState] = useState(false)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                getDistance(pos)
            },
            (err) => console.log(err)
        )
    }, [state])

    const getDistance = ({ coords }) => {
        const lat2 = 10.066942
        const lon2 = 78.222133
        const speed = 20 * (5 / 18) //km/h=>m/s
        if (coords.latitude == lat2 && coords.longitude == lon2) {
            return 0
        } else {
            let radlat1 = (Math.PI * coords.latitude) / 180
            let radlat2 = (Math.PI * lat2) / 180
            let theta = coords.longitude - lon2
            let radtheta = (Math.PI * theta) / 180
            let dist =
                Math.sin(radlat1) * Math.sin(radlat2) +
                Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
            if (dist > 1) {
                dist = 1
            }
            dist = Math.acos(dist)
            dist = (dist * 180) / Math.PI
            dist = dist * 60 * 1.1515
            dist = dist * 1.609344
            let time = (dist * 1000) / speed / 60

            console.log({
                dist: Math.round(dist * 100) / 100,
                time: Math.round(time * 100) / 100,
            })
        }
    }

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
                {/* <button onClick={() => setState((e) => !e)}>hello</button> */}
            </main>
        </>
    )
}

export default Home
