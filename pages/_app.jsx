import "../styles/globals.css"
import Header from "../components/Header"
import Store from "../components/Context"
import { useEffect } from "react"
import { Context } from "../components/Context"
import { useContext } from "react"

function MyApp({ Component, pageProps }) {
    // const [_,setData]= useContext(Context)

    return (
        <>
            <Store>
                <Header />
                <Component {...pageProps} />
            </Store>
        </>
    )
}

export default MyApp
