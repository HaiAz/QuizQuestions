import React, { Children, createContext, useState, useContext } from "react";
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

export const useAppContext = () => {
    const { showMenu, setShowMenu } = useContext(appContext);
    return {
        showMenu,
        setShowMenu,
    };
};

export default AppProvider;
