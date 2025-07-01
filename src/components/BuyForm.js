import axios from 'axios';
import { useState} from 'react';
import { toast } from 'react-toastify';
import { useAuthContext } from '../hooks/useAuthContext';


function BuyForm({ stock, setBuyWindow, setShowWatchlistActions}) {
  const {user}=useAuthContext();
  const [qantity, setQantity] = useState(0);
  const [order, setOrder] = useState({
    name: " ",
    qty: " ",
    price: 0,
    totalPrice: 0,
    mode: "online",
  });



  const onClickHandle = (e) => {
    e.preventDefault();

    if(!user){
      toast.error("You must be logged in");
      return 
    }
    
    const avg = stock.avg;
    const net = (((stock.price - avg) / avg) * 100).toFixed(2);
    const day = (((stock.price - avg) / avg) * 100).toFixed(2);

    const payload = {
      order: {
        name: stock.name,
        qty: qantity,
        price: stock.price,
        totalPrice: qantity * stock.price,
        mode: "online",
      },
      holding: {
        name: stock.name,
        qty: qantity,
        avg: avg,
        price: stock.price,
        net: net,
        day: day,
      },
    };

    setOrder(payload.order);

    axios
      .post("http://localhost:3002/order", payload,{
         headers:{
          'Authorization':`Bearer ${user.token}`
        }
      })
      .then(() => {
        toast.success("Order placed successfully!");
        setBuyWindow(false);
        setTimeout(()=>{setShowWatchlistActions(false)},100);

      })
      .catch(() => {
        toast.error("Order failed");
        setBuyWindow(false);
        setTimeout(()=>{setShowWatchlistActions(false)},100)
      });
  };





  
  const onChangeHandle = (e) => {
    e.preventDefault();
    setQantity(e.target.value);
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-header d-flex justify-content-start">
          <div className="buy-tab">BUY</div>
        </div>

        <div className="card-body">
          <div className="d-flex gap-2">
            <div className="mb-3">
              <label className="form-label d-flex justify-content-between">
                <span>Qty</span>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Quantity"
                value={qantity}
                onChange={onChangeHandle}
              />
            </div>

            <div className="mb-3">
              <label className="form-label d-flex justify-content-between">
                <span>At Price</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={stock.price}
                readOnly
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Total (INR)</label>
            <input
              type="text"
              className="form-control"
              value={stock.price * qantity}
              readOnly
            />
          </div>

          <div className="d-flex justify-content-center">
            <button className="btn buy-btn w-100" onClick={onClickHandle}>
              BUY
            </button>
            <button
              style={{ backgroundColor: "red" }}
              className="btn buy-btn w-100"
              onClick={() => {
                setBuyWindow(false);
                setTimeout(()=>{setShowWatchlistActions(false)},100)
                toast.error("Order cancelled!");
              }}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default  BuyForm;