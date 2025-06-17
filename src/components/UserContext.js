import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState( '' );

    const isLogin = (data) => {
        // JSON.parse(localStorage.getItem('userData'));
        setUserData(data);
    } 

    return(
        <UserContext.Provider value={{ userData, isLogin }}>
            {children}
        </UserContext.Provider>
    )
}