import React, { Children, createContext, useState, useContext, useEffect } from "react";
export const appContext = createContext();

function AppProvider({ children }) {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <appContext.Provider
            value={{
                showMenu,
                setShowMenu,
            }}
        >
            {children}
        </appContext.Provider>
    );
}

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return windowSize;
};

export const useAppContext = () => {
    const { showMenu, setShowMenu } = useContext(appContext);
    return {
        showMenu,
        setShowMenu,
    };
};

export default AppProvider;
