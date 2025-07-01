import React, { useEffect, useState } from "react";
import WatchListItem from "./WatchListItem";
import axios from "axios";
import { useContext } from "react";
import ZeroContext from "../context/ZeroContext";

const WatchList = () => {
  let { watchlist, setWatchlist } = useContext(ZeroContext);

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function isInLoss(currentPrice,avgPrice) {
    if (currentPrice<avgPrice) return true;
    else return false;
    }



  useEffect(() => {
    let intervalId;

    axios.get("http://localhost:3002/watchlist").then((res) => {
      let initialData = res.data;
      setWatchlist(initialData);

      intervalId = setInterval(() => {

      setWatchlist((prevList) => {

          return prevList.map((stock) => {

            let deviation = 0;

            if (stock.price <= 200) {
              deviation = getRandomInt(-10, 10);
            } else if (stock.price <= 800) {
              deviation = getRandomInt(-50, 50);
            } else if (stock.price <= 2000) {
              deviation = getRandomInt(-200, 200);
            } else if (stock.price <= 3000) {
              deviation = getRandomInt(-400, 400);
            } else {
              deviation = getRandomInt(-1000, 1000);
            }

            let priceChg = (stock.price - deviation).toFixed(2);
            let perChg = ((( stock.price-stock.avg)/stock.avg)*100).toFixed(2);
            let marker=isInLoss(stock.price, stock.avg);

            return {
              ...stock,
              price: priceChg,
              percent:perChg,
              isDown:marker,
            };
          });
        });
      }, 10000);
    });

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts">{watchlist.length} / 50</span>
      </div>

      <ul className="list m-0 p-0">
        {watchlist.map((stock, index) => (
          <WatchListItem stock={stock} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default WatchList;
