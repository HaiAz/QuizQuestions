import React, { Children, createContext, useState, useContext, useEffect } from "react";
export const appContext = createContext();

function AppProvider({ children }) {
    const [showMenu, setShowMenu] = useState(false);
    const [navbarTitle, setNavbarTitle] = useState("");

    const getNavTitle = () => navbarTitle;
    const setNavTitle = (value) => setNavbarTitle(value);
    return (
        <appContext.Provider
            value={{
                navbarTitle,
                showMenu,
                setShowMenu,
                getNavTitle,
                setNavTitle,
            }}
        >
            {children}
        </appContext.Provider>
    );
}
export const useAppContext = () => {
    const { showMenu, setShowMenu, getNavTitle, setNavTitle, navbarTitle } = useContext(appContext);
    return {
        showMenu,
        setShowMenu,
        getNavTitle,
        setNavTitle,
        navbarTitle,
    };
};

export default AppProvider;
