import React, { createContext, useState, useContext } from "react";

const BirdInfoLoadedContext = createContext();

export function useBirdInfoLoaded() {
    return useContext(BirdInfoLoadedContext);
}

export const BirdInfoLoadedProvider = ({ children }) => {
    const [birdInfosLoaded, setBirdInfosLoaded] = useState([]);

    return (
        <BirdInfoLoadedContext.Provider
            value={{ birdInfosLoaded, setBirdInfosLoaded }}
        >
            {children}
        </BirdInfoLoadedContext.Provider>
    );
};
