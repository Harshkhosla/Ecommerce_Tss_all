import React, { createContext, useContext, useState } from 'react';
import ListingData from './listingManagement';
import Table from '../../../UI/CommonTable/Table';

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

const DataContextProvider = ({ children }) => {
    const [sharedData, setSharedData] = useState('Initial Shared Data');

    return (
        <DataContext.Provider value={{ sharedData, setSharedData }}>
            <ListingData />
            <Table />
        </DataContext.Provider>
    );
};

export default DataContextProvider;