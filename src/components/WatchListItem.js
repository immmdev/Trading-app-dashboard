import React, { useContext, useState } from "react";
import WatchListActions from "./WatchListAction";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import BuyForm from "./BuyForm";
import ZeroContext from "../context/ZeroContext";
import HoldingPriceGraph from "./Graph";


const WatchListItem = ({ stock }) => {
  let [buyWindow, setBuyWindow] = useState(false);
  let [statsWindow, setStatsWindow] = useState(false);
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);
  let { setIsSell } = useContext(ZeroContext);

  let handleClickSell = (e) => {
    e.preventDefault();
    setBuyWindow(!buyWindow);
    setIsSell(1);
    console.log("clicked");
  }

  let handleClickBuy = (e) => {
    e.preventDefault();
    setBuyWindow(!buyWindow);
    setIsSell(0);
    console.log("clicked");
  }

  let onClickHandleStats = (e) => {
    e.preventDefault();
    setStatsWindow(!statsWindow);
    console.log("clicked");
  }




  return (
    <li
      className="p-3 mb-0"
      onMouseEnter={() => setShowWatchlistActions(true)}
      onMouseLeave={() => setShowWatchlistActions(false)}

    >
      <div>
        <div className="item">
          <b><h7 className={stock.isDown ? "down" : "up"}>{stock.name}</h7></b>
          <div>
            {showWatchlistActions && <WatchListActions handleClickBuy={handleClickBuy} handleClickSell={handleClickSell} onClickHandleStats={onClickHandleStats} />}
          </div>

          <div className="itemInfo d-flex gap-2 justify-content-center">
            <span className="percent">{stock.percent} %</span>
            <span>
              {stock.isDown ? (
                <KeyboardArrowDown className="down" />
              ) : (
                <KeyboardArrowUp style={{ color: "green" }} className="down" />
              )}
            </span>
            <span className="price">{stock.price}</span>
          </div>

        </div>
      </div>
      {statsWindow ?
        <>
          <div className="d-flex justify-content-between align-items-center mt-3 mb-4 border-bottom pb-2 px-3">
            <div className="text-center w-100">
              <h5 className="fw-semibold text-muted m-0">Stock Performance (₹)</h5>
            </div>
            <div className="text-end" style={{ position: "absolute", right: "20px", fontSize: "13px", lineHeight: "1.2" }}>
              <p className="m-0  text-info">X-Axis : Time</p>
              <p className="m-0 text-warning">Y-Axis : Price </p>
            </div>
          </div>




          <HoldingPriceGraph stock={stock} />
        </> : null}
      {buyWindow ?
        <>
          < BuyForm stock={stock} setShowWatchlistActions={setShowWatchlistActions} setBuyWindow={setBuyWindow} />
        </>

        : null}
    </li>
  );
};

export default WatchListItem;
