import { useState, useEffect, useContext } from "react";
import { Route, Routes,Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

import AppsZero from "./AppsZero";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import ZeroContext from "../context/ZeroContext";

import LoginPage from "../signup/LoginPage";
import SignupPage from "../signup/SignupPage";

import { useAuthContext } from "../hooks/useAuthContext";
import Wallet from "./Wallet";

const Dashboard = () => {
  const [ordersDetail, setOrdersDetail] = useState([]);
  const {user}=useAuthContext();
  const { holdings, setHoldings, watchlist } = useContext(ZeroContext);
  const [stats, setStats] = useState({
    totalPrice: 0,
    currPrice: 0,
    pnl: 0,
    pnlp: 0,
  });

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      axios.get("https://trading-app-wilt.onrender.com/orders-display",{
        headers:{
          'Authorization':`Bearer ${user.token}`
        }
      })
      .then((res) => {
        setOrdersDetail(res.data);
      })
      .catch((err) => {
        toast.error("Orders fetch failed");
      });
    }

    if(user){
      fetchOrders();
    }

  }, [user,ordersDetail,setOrdersDetail]);

  // Fetch and update holdings
  useEffect(() => {
    const fetchHoldings=async()=>{
      axios.get("https://trading-app-wilt.onrender.com/holdings-display",{
         headers:{
          'Authorization':`Bearer ${user.token}`
        }
      })
      .then((res) => {
        const data = res.data;

        if (!watchlist || watchlist.length === 0) {
          setHoldings(data);
          calculateStats(data);
        } else {
          const updated = data.map((item) => {
            const match = watchlist.find((stock) => stock.name === item.name);
            return match
              ? { ...item, price: match.price, net: match.percent }
              : item;
          });
          setHoldings(updated);
          calculateStats(updated);
        }
      })
      .catch(() => {
        toast.error("Holdings fetch failed");
      });
    }

    if(user){
      fetchHoldings();
    }
    
  }, [user,holdings,setHoldings]);

  const calculateStats = (holdingsData) => {
    let totalPrice = 0;
    let currPrice = 0;

    holdingsData.forEach((item) => {
      totalPrice += (item.avg * item.qty) || 0;
      currPrice += (item.price * item.qty) || 0;
    });

    const pnl = currPrice - totalPrice;
    const pnlp = totalPrice !== 0 ? (pnl / totalPrice) * 100 : 0;

    setStats({
      totalPrice,
      currPrice,
      pnl,
      pnlp,
    });
  };

  return (
    <div className="dashboard-container">
      <WatchList />
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="content">
        <Routes>
          <Route path="/" element={
            user? <Summary
              pnl={(stats.pnl / 1000).toFixed(2)}
              pnlp={stats.pnlp.toFixed(2)}
              currPrice={(stats.currPrice / 1000).toFixed(2)}
              avgPrice={(stats.totalPrice / 1000).toFixed(2)}
            />:<Navigate to='/login'/>
          } />
          <Route path="/orders" element={user? <Orders ordersDetail={ordersDetail} />: <Navigate to='/login'/>} />
          <Route path="/holdings" element={ user?
            <Holdings
              pnl={(stats.pnl / 1000).toFixed(2)}
              pnlp={stats.pnlp.toFixed(2)}
              currPrice={(stats.currPrice / 1000).toFixed(2)}
              totalPrice={(stats.totalPrice / 1000).toFixed(2)}
              holdings={holdings}
            />: <Navigate to='/login'/>

          } />
          <Route path="/positions" element={user? <Positions />:<Navigate to='/login'/>} />
          <Route path="/apps" element={<AppsZero />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
           <Route path="/wallet" element={user? <Wallet />:<Navigate to='/login'/>} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
