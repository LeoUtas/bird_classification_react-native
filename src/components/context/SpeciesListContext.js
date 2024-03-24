import React, { createContext, useContext } from "react";
import SpeciesList from "../../../assets/data/class_indices.json";

const SpeciesListContext = createContext(Object.values(SpeciesList));

export const SpeciesListProvider = ({ children }) => {
    return (
        <SpeciesListContext.Provider value={useContext(SpeciesListContext)}>
            {children}
        </SpeciesListContext.Provider>
    );
};

export const useSpeciesList = () => useContext(SpeciesListContext);
