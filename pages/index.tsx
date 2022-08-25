import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import HomeHero from '../components/HomeHero'

const Home: NextPage = () => {
  return (
    <div className="">
      <Header/>
      <HomeHero/>
    </div>
  )
}

export default Home
