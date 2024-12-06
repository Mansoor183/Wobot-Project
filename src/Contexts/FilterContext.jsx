import React, { createContext, useState } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [locationFilter, setLocationFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    return (
        <FilterContext.Provider value={{ locationFilter, setLocationFilter, statusFilter, setStatusFilter }}>
            {children}
        </FilterContext.Provider>
    );
};
