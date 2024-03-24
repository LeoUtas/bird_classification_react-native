import React, { createContext, useState, useContext } from "react";

const BirdInfoContext = createContext();

export function useBirdInfo() {
    return useContext(BirdInfoContext);
}

export const BirdInfoProvider = ({ children }) => {
    const [birdInfo, setBirdInfo] = useState({
        predicted_probability: "",
        predicted_label: "",
        predicted_scientific_name: "",
        predicted_index: "",
        execution_time: "",
        funFact: "",
        imageUri: "",
        ID: "",
        userUID: "",
    });

    return (
        <BirdInfoContext.Provider value={{ birdInfo, setBirdInfo }}>
            {children}
        </BirdInfoContext.Provider>
    );
};
