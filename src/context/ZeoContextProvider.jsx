import React,{useState} from 'react';
import ZeroContext from './ZeroContext';

const ZeroContextProvider=({children})=>{
    let [holdings, setHoldings] = useState([]);
    let [watchlist, setWatchlist] = useState([]);
    let [wallet, setWallet] = useState({});
    let [deposit, setDeposit] = useState(0);
    let [withdraw, setWithdraw] = useState(0);
    let [isSell, setIsSell] = useState(0);

    
    return (
        <ZeroContext.Provider value={{holdings, setHoldings,
            watchlist, setWatchlist, 
            wallet, setWallet, 
            deposit, setDeposit,
            withdraw, setWithdraw,
            isSell, setIsSell
            }}>
            {children}
        </ZeroContext.Provider>
    )
}

export default ZeroContextProvider;