import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import HomeHero from '../components/HomeHero'
import NewArrivals from '../components/NewArrivals'
import Search from '../components/Search'

const Home: NextPage = () => {
  return (
    <div className="font-rale">
      <HomeHero/>
      <Search />
      <NewArrivals/>
    </div>
  )
}

export default Home
