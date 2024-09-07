import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem('USER_ID');
        if (storedData) {
            setData(storedData);
        }
    }, []);

    return (
        <UserContext.Provider value={{ data }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
