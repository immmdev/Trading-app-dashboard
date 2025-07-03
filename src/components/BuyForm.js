import axios from 'axios';
import { useState, useContext } from 'react';
import ZeroContext from '../context/ZeroContext';
import { toast } from 'react-toastify';
import { useAuthContext } from '../hooks/useAuthContext';

function BuyForm({ stock, setBuyWindow, setShowWatchlistActions }) {
  const { user } = useAuthContext();
  const { holdings, setHoldings, watchlist } = useContext(ZeroContext);
  const [qantity, setQantity] = useState(0);
  const[sellQantity, setSellQantity]=useState(0);
  let [isSell, setIsSell] = useState(0);
  const { wallet, setWallet } = useContext(ZeroContext);

  let AvailableAmount = wallet.amount;


    let requiredStock = holdings.filter((el) => {
      return el.name == stock.name;
    })

  

  

  const handleBuy = async (amountTosend) => {

    if (amountTosend > AvailableAmount) {
      return false;
    }

    amountTosend = -Math.abs(amountTosend);

    try {
      await axios.post("http://localhost:3002/wallet", { updatedAmount: amountTosend }, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };


  const [order, setOrder] = useState({
    name: " ",
    qty: " ",
    price: 0,
    totalPrice: 0,
    mode: "online",
  });



  // handleing click
  const onClickHandle = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in");
      return;
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

    const isBalanceSufficient = await handleBuy(qantity * stock.price); //asynchronous function handled using await

    if (!isBalanceSufficient) {  // checking consion on wallet
      setBuyWindow(false);
      setTimeout(() => {
        setShowWatchlistActions(false);
      }, 100);
      toast.error("Insufficient balance");
      return;
    }



    axios
      .post("http://localhost:3002/order", payload, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        toast.success("Order placed successfully!");

        setBuyWindow(false);
        setTimeout(() => {
          setShowWatchlistActions(false);
        }, 100);

      })
      .catch(() => {
        toast.error("Order failed");
        setBuyWindow(false);
        setTimeout(() => {
          setShowWatchlistActions(false);
        }, 100);
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
          <div className="row">
            <div className="col-6 text-center">
              <a
                href="#"
                onClick={(e) => setIsSell(0)}
                className={`d-inline-block pb-3 fw-semibold ${isSell == 0
                  ? "text-success border-success border-2 border-bottom"
                  : "text-muted"
                  }`}
                style={{ textDecoration: "none" }}
              >
                Buy
              </a>
            </div>
            <div className="col-6 pb-3 text-center">
              <a
                href="#"
                onClick={(e) => setIsSell(1)}
                className={`d-inline-block fw-semibold ${isSell == 1
                  ? "text-danger border-danger border-2 border-bottom"
                  : "text-muted"
                  }`}
                style={{ textDecoration: "none" }}
              >
                Sell
              </a>
            </div>
          </div>
        </div>

        {isSell == 0 ? (
          <>
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
            </div>
          </>
        ) : (
          <>

            <div className="card-body">
              <div className="d-flex gap-2">
                <div className="mb-3">
                  <label className="form-label d-flex justify-content-between">
                    <span>Qty Available</span>
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    value={requiredStock[0].qty}
                    readOnly
                    // onChange={onChangeHandle}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label d-flex justify-content-between">
                    <span>Qty to sell</span>
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    value={sellQantity}
                    onChange={(e)=> setSellQantity(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label d-flex justify-content-between">
                    <span>At Price</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={requiredStock[0].price}
                    readOnly
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Total (INR)</label>
                <input
                  type="text"
                  className="form-control"
                  value={requiredStock[0].price * sellQantity}
                  readOnly
                />
              </div>
            </div>
          </>
        )}

        <div className="d-flex justify-content-center">
          {isSell ? (
            <>
              <button className="btn buy-btn w-100" onClick={onClickHandle}>
                SELL
              </button>
            </>
          ) : (
            <>
              <button className="btn buy-btn w-100" onClick={onClickHandle}>
                BUY
              </button>
            </>
          )}

          <button
            style={{ backgroundColor: "red" }}
            className="btn buy-btn w-100"
            onClick={() => {
              setBuyWindow(false);
              setTimeout(() => {
                setShowWatchlistActions(false);
              }, 100);
              toast.error("Order cancelled!");
            }}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyForm;
