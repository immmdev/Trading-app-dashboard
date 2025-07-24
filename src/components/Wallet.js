import axios from 'axios';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useAuthContext } from '../hooks/useAuthContext';
import ZeroContext from '../context/ZeroContext';

function Wallet() {
    const { user } = useAuthContext();
    let {deposit, setDeposit} = useContext(ZeroContext);
    let {withdraw, setWithdraw} = useContext(ZeroContext);
    let [isWithdraw, setIsWithdraw] = useState(0);
    let [isLoading, setIsLoading] = useState(false);
    const { wallet, setWallet } = useContext(ZeroContext);


    const fetchWallet = async () => {
        axios.get("https://trading-app-wilt.onrender.com/wallet", {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then((res) => {
            setWallet(res.data);
        }).catch((err) => {
            toast.error("Wallet fetch failed!");
        })
    }

    useEffect(() => {
        if (user) {
            fetchWallet();
        }
    }, [setDeposit, setIsWithdraw, user, wallet]);

    const onClickHandle = (e) => {
        e.preventDefault();
        

        if (isWithdraw === 1) {
            if (isNaN(withdraw) || withdraw <= 0) {
                toast.error("Enter a valid withdrawal amount!");
                setIsLoading(false);
                
                return;
            }
            if (withdraw > wallet.amount) {
                toast.error("Insufficient amount!");
                setIsLoading(false);
                
                return;
            }
        } else {
            if (isNaN(deposit) || deposit <= 0) {
                toast.error("Enter a valid deposit amount!");
                setIsLoading(false);
        
                return;
            }
        }
        const amountTosend = isWithdraw ? -Math.abs(withdraw) : Math.abs(deposit);

        axios.post("https://trading-app-wilt.onrender.com/wallet", { updatedAmount: amountTosend }, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then((res) => {
            console.log(res);
            fetchWallet();
            toast.success("Updated Wallet successfully");
            setIsLoading(false);
            

        }).catch((err) => {
            console.log(err);
            toast.error("Updation wallet failed");
            setIsLoading(false);
        
        });
    }




    return (
        <div className="container d-flex justify-content-center align-items-center mt-5">
            <div className="card shadow p-0" style={{ maxWidth: '500px', width: '100%' }}>
                {/* Toggle Buttons */}

                <div className="card-header d-flex justify-content-start">
                    <div className="row ">
                        <div className="col-6 text-center">
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsWithdraw(0);
                                }}
                                className={`d-inline-block pb-3 fw-semibold ${isWithdraw === 0 ? 'text-success border-success border-2 border-bottom' : 'text-muted'}`}
                                style={{ textDecoration: "none" }}
                            >
                                Deposit
                            </a>
                        </div>
                        <div className="col-6 pb-3 text-center">
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsWithdraw(1);
                                }}
                                className={`d-inline-block fw-semibold ${isWithdraw === 1 ? 'text-danger border-danger border-2 border-bottom' : 'text-muted'}`}
                                style={{ textDecoration: "none" }}
                            >
                                Withdraw
                            </a>
                        </div>
                    </div>

                </div>
                <div className='p-4'>
                    {isWithdraw ? (
                        <>
                            <div className="mb-3">
                                <label htmlFor="widthdraw" className="form-label">
                                    Withdraw amount from wallet
                                </label>
                                <input
                                    placeholder="Withdraw Amount"
                                    id="widthdraw"
                                    type="number"
                                    className="form-control"
                                    value={withdraw === 0 ? '' : withdraw}
                                    onChange={(e) => setWithdraw(Number(e.target.value))}
                                />
                            </div>
                            <div className="d-grid">
                                <button onClick={onClickHandle} disabled={isLoading} className="btn withdraw-btn">{isLoading ? "Withdrawing..." : "WITHDRAW"}</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mb-3">
                                <label htmlFor="amount" className="form-label">
                                    Add amount to wallet
                                </label>
                                <input
                                    placeholder="Deposit Amount"
                                    id="amount"
                                    type="number"
                                    className="form-control"
                                    value={deposit === 0 ? '' : deposit}
                                    onChange={(e) => setDeposit(Number(e.target.value))}
                                />

                            </div>
                            <div className="d-grid">
                                <button onClick={onClickHandle} disabled={isLoading} className="btn deposit-btn">{isLoading ? "Depositing..." : "DEPOSIT"}</button>
                            </div>
                        </>
                    )}

                    <p className="text-center text-muted mt-4">
                        Available amount: <strong>{wallet.amount ? (wallet.amount).toFixed(2) : 0}</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Wallet;
