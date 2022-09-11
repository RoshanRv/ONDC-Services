import "../styles/globals.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Store from "../components/Context"
import { useEffect, useState } from "react"
import { Context } from "../components/Context"
import { useContext } from "react"
import { useRouter } from "next/router"
import Spinner from "../components/Spinner"

function MyApp({ Component, pageProps }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const handleStart = (url) => url !== router.asPath && setLoading(true)
        const handleComplete = (url) =>
            url === router.asPath && setLoading(false)

        router.events.on("routeChangeStart", handleStart)
        router.events.on("routeChangeComplete", handleComplete)
        router.events.on("routeChangeError", handleComplete)

        return () => {
            router.events.off("routeChangeStart", handleStart)
            router.events.off("routeChangeComplete", handleComplete)
            router.events.off("routeChangeError", handleComplete)
        }
    })

    return (
        <>
            <Store>
                {loading ? (
                    <div className="w-full h-screen bg-sky-300 flex justify-center items-center">
                        <Spinner />
                    </div>
                ) : (
                    <>
                        <Header />
                        <Component {...pageProps} />
                        <Footer />
                    </>
                )}
            </Store>
        </>
    )
}

export default MyApp
