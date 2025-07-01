import React, { useContext, useState } from "react";
import WatchListActions from "./WatchListAction";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import BuyForm from "./BuyForm";


const WatchListItem = ({ stock }) => {
  let [buyWindow, setBuyWindow] = useState(false);
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  let handleClick = (e) => {
      e.preventDefault();
      setBuyWindow(!buyWindow);
      console.log("clicked")
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
            {showWatchlistActions && <WatchListActions handleClick={handleClick}/>}
          </div>

          <div className="itemInfo d-flex gap-2 justify-content-center">
            <span className="percent">{stock.percent} %</span>
            <span>
            {stock.isDown ? (
              <KeyboardArrowDown  className="down" />
            ) : (
              <KeyboardArrowUp style={{color:"green"}} className="down" />
            )}
            </span>
            <span className="price">{stock.price}</span>
          </div>
     
        </div>
      </div>
        {buyWindow? < BuyForm stock={stock} setShowWatchlistActions={setShowWatchlistActions} setBuyWindow={setBuyWindow} />: null} 
    </li>
  );
};

export default WatchListItem;
