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

  function isInLoss(currentPrice, avgPrice) {
    if (currentPrice < avgPrice) return true;
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

            if (stock.price <= 10) {
              deviation = getRandomInt(-0.5, 0.5);
            } else if (stock.price <= 20) {
              deviation = getRandomInt(-1, 1);
            } else if (stock.price <= 50) {
              deviation = getRandomInt(-2, 2);
            } else if (stock.price <= 100) {
              deviation = getRandomInt(-5, 5);
            } else if (stock.price <= 150) {
              deviation = getRandomInt(-7, 7);
            } else if (stock.price <= 200) {
              deviation = getRandomInt(-10, 10);
            } else if (stock.price <= 300) {
              deviation = getRandomInt(-15, 15);
            } else if (stock.price <= 400) {
              deviation = getRandomInt(-25, 25);
            } else if (stock.price <= 500) {
              deviation = getRandomInt(-35, 35);
            } else if (stock.price <= 600) {
              deviation = getRandomInt(-45, 45);
            } else if (stock.price <= 700) {
              deviation = getRandomInt(-55, 55);
            } else if (stock.price <= 800) {
              deviation = getRandomInt(-70, 70);
            } else if (stock.price <= 1000) {
              deviation = getRandomInt(-100, 100);
            } else if (stock.price <= 1200) {
              deviation = getRandomInt(-150, 150);
            } else if (stock.price <= 1500) {
              deviation = getRandomInt(-200, 200);
            } else if (stock.price <= 1800) {
              deviation = getRandomInt(-250, 250);
            } else if (stock.price <= 2000) {
              deviation = getRandomInt(-300, 300);
            } else if (stock.price <= 2500) {
              deviation = getRandomInt(-350, 350);
            } else if (stock.price <= 3000) {
              deviation = getRandomInt(-400, 400);
            } else if (stock.price <= 3500) {
              deviation = getRandomInt(-500, 500);
            } else if (stock.price <= 4000) {
              deviation = getRandomInt(-600, 600);
            } else if (stock.price <= 5000) {
              deviation = getRandomInt(-800, 800);
            } else {
              deviation = getRandomInt(-1000, 1000);
            }


            let priceChg = (stock.price - deviation).toFixed(2);
            let perChg = (((stock.price - stock.avg) / stock.avg) * 100).toFixed(2);
            let marker = isInLoss(stock.price, stock.avg);

            return {
              ...stock,
              price: priceChg,
              percent: perChg,
              isDown: marker,
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
