import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState( '' );

    const isLogin = (data) => {
        setUserData(data);
    } 

    return(
        <UserContext.Provider value={{ userData, isLogin }}>
            {children}
        </UserContext.Provider>
    )
}