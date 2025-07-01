import React, { useState } from 'react';

function Wallet() {
    let [amount, setAmount] = useState(0);
    let [Widthdraw, setWithdraw] = useState(0);
    let [isWithdraw, setIsWidthdraw] = useState(0);

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
                                        setIsWidthdraw(0);
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
                                        setIsWidthdraw(1);
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
                                    value={Widthdraw}
                                    onChange={(e) => setWithdraw(e.target.value)}
                                />
                            </div>
                            <div className="d-grid">
                                <button className="btn withdraw-btn">WITHDRAW</button>
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
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                            <div className="d-grid">
                                <button className="btn deposit-btn">DEPOSIT</button>
                            </div>
                        </>
                    )}

                    <p className="text-center text-muted mt-4">
                        Available amount: <strong>₹20,000</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Wallet;
