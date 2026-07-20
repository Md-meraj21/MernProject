import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./appContext.js";

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState()
    const value = { navigate, user, setUser, setIsSeller, isSeller }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
