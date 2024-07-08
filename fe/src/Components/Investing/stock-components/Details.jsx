import React, { useContext } from "react";
import './details.css';


const Details = ({ details }) => {


  const detailsList = {
    name: "Name",
    country: "Country",
    currency: "Currency",
    exchange: "Exchange",
    ipo: "IPO Date",
    marketCapitalization: "Market Capitalization",
    finnhubIndustry: "Industry",
  };

  const convertMillionToBillion = (number) => {
    return (number / 1000).toFixed(2);
  };

  return (
    <>
      <ul
        className='detailslist'
      >
        {Object.keys(detailsList).map((item) => {
          return (
            <li key={item} className="list-heading">
              <p>{detailsList[item]}</p>
              <p className="font-bold">
                {item === "marketCapitalization"
                  ? `${convertMillionToBillion(details[item])}B`
                  : details[item]}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Details;