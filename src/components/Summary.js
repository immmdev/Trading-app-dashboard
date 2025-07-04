import React,{useContext} from "react";
import ZeroContext from "../context/ZeroContext";


const Summary = ({pnl,pnlp,currPrice,avgPrice}) => {
    const { wallet, setWallet } = useContext(ZeroContext);
    const {holdings}= useContext(ZeroContext);
    let margin = currPrice>=avgPrice?  (currPrice-avgPrice).toFixed(2) : 0;
    let balnceAvailable=(wallet.amount/1000).toFixed(2);
    let pnlClass= currPrice>=avgPrice? "profit":"loss";
  return (
    <>
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{margin}k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Balance <span>{balnceAvailable}k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={pnlClass}>
              {pnl}k <small className={pnlClass}>{pnlp}%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{currPrice}k</span>{" "}
            </p>
            <p>
              Investment <span>{avgPrice}k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
