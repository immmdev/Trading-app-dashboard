
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";



const Holdings = ({pnl,pnlp,currPrice,totalPrice,holdings}) => {


  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th style={{fontSize:"14px"}}>Instrument</th>
            <th style={{fontSize:"14px"}}>Qty.</th>
            <th style={{fontSize:"14px"}}>Avg. cost</th>
            <th style={{fontSize:"14px"}}>LTP</th>
            <th style={{fontSize:"14px"}}>Cur. val</th>
            <th style={{fontSize:"14px"}}>P&L</th>
            <th style={{fontSize:"14px"}}>Net chg.</th>
            <th style={{fontSize:"14px"}}>Day chg.</th>
          </tr>

          {holdings.map((stock, index) => {

            const currValue = stock.price * stock.qty;
            const isProfit = currValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";
            return (
              <tr key={index} className="">
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg}</td>
                <td>{stock.price}</td>
                <td>{currValue.toFixed(2)}</td>
                <td className={profClass}>
                  {(currValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={profClass}>{stock.net}%</td>
                <td style={{ fontSize: "14px" }} className={dayClass}>{stock.day}%</td>
              </tr>
            );
          })}
        </table>
      </div>
      <div className="row">
        <div className="col">
          <h5>
            {totalPrice}k
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {currPrice}k
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>{pnl}k ({pnlp} %)</h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;
