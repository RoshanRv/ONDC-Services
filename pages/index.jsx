import Title from "../components/Title"
import HomeHero from '../components/HomeHero'
import Card from "../components/Card"
import { motion } from "framer-motion"
import ServiceList from "../components/ServiceList"


const Home =()=>{

    return (
        <main className="mb-20">
            <HomeHero/>
            <Title>Services</Title>
            <ServiceList />
        </main>
    )
}

export default Home