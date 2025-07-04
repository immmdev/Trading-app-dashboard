import React,{useState,useEffect} from "react";
import { positions } from "../data/data";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";


const Positions = () => {
  const [positions,setPositions]=useState([]);
  const {user}=useAuthContext();
  useEffect(()=>{

    const featchPositions=()=>{axios.get("https://trading-app-wilt.onrender.com/allpositions-display",{
       headers:{
          'Authorization':`Bearer ${user.token}`
        }
    })
    .then((res)=>{
      setPositions(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

    if(user){
      featchPositions();
    }
  },[user])
  return (
    <>
      <h3 className="title">Positions {positions.length}</h3>

      <div className="order-table">
        <table>
          <tr>
            <th style={{fontSize:"14px"}}>Product</th>
            <th style={{fontSize:"14px"}}>Instrument</th>
            <th style={{fontSize:"14px"}}>Qty.</th>
            <th style={{fontSize:"14px"}}>Avg.</th>
            <th style={{fontSize:"14px"}}>LTP</th>
            <th style={{fontSize:"14px"}}>P&L</th>
            <th style={{fontSize:"14px"}}>Chg.</th>
          </tr>
          {positions.map((stock, index) => {
            const currValue = stock.price * stock.qty;
            const isProfit = currValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "prof";
            return (
              <tr key={index}>
                <td>{stock.product}</td>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg}</td>
                <td>{stock.price}</td>
                <td className={profClass}>
                  {(currValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td style={{fontSize:"14px"}} className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Positions ;
