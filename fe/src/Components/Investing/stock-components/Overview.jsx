import React from "react";
import './overview.css';


const Overview = ({ symbol, price, change, changePercent, currency }) => {
  return (
    <div className="overview-main">
      <span className="symbol">
        {symbol}
      </span>
      <div className="price">
        <p className="price-price">
          ${price} {currency}
        </p>
        <p className={`${change > 0 ? "pchange" : "nchange"}`}>
          {change} ({changePercent}%)
        </p>
      </div>
    </div>
  );
};

export default Overview;