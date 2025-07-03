import React,{useState} from 'react';
import ZeroContext from './ZeroContext';

const ZeroContextProvider=({children})=>{
    let [holdings, setHoldings] = useState([]);
    let [watchlist, setWatchlist] = useState([]);

    
    return (
        <ZeroContext.Provider value={{holdings, setHoldings,watchlist, setWatchlist}}>
            {children}
        </ZeroContext.Provider>
    )
}

export default ZeroContextProvider;