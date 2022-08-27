import { createContext, useState } from "react";

export const Context = createContext('')

const Store = ({children})=>{

    const [userData,setUserData]=useState({})

    return(
        <Context.Provider value={[userData,setUserData]} >
            {children}
        </Context.Provider>
    )

}

export default Store