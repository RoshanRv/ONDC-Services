import { createContext, useState } from "react"
import { getCurrentLocation } from "../util/util"

export const Context = createContext("")

const Store = ({ children }) => {
    const [userData, setUserData] = useState(null)
    const [userCoords, setUserCoords] = useState(null)

    return (
        <Context.Provider
            value={{ userData, setUserData, userCoords, setUserCoords }}
        >
            {children}
        </Context.Provider>
    )
}

export default Store
