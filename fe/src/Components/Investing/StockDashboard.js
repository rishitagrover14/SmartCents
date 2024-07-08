import { useLocation } from 'react-router-dom';
import React, {  useEffect, useState } from "react";
import Overview from "./stock-components/Overview";
import Details from "./stock-components/Details";
import Chart from "./stock-components/Chart";
import StckHeader from "./stock-components/StckHeader";
import { fetchStockDetails, fetchQuote } from "./api/stockApi";
import './stockdashboard.css';
import NavBlack from '../navbarBlack/NavBlack';

const StockDashboard = () => {
  const location = useLocation();
  const { symbol } = location.state || {};
  const [stockDetails, setStockDetails] = useState({});

  const [quote, setQuote] = useState({});
  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await fetchStockDetails(symbol);
        setStockDetails(result);
      } catch (error) {
        setStockDetails({});
        console.log(error);
      }
    };

    const updateStockOverview = async () => {
      try {
        const result = await fetchQuote(symbol);
        setQuote(result);
      } catch (error) {
        setQuote({});
        console.log(error);
      }
    };

    updateStockDetails();
    updateStockOverview();
  }, []);

    return (
      <>
      <NavBlack/>
        <div className='stckdashboard'
      
        >
          <div className="stckheader">
            <StckHeader name={stockDetails.name} />
          </div>
          <div className="stckchart">
            <Chart symbol={symbol}/>
          </div>
          <div className='stckoverview'>
            <Overview
              symbol={symbol}
              price={quote.pc}
              change={quote.d}
              changePercent={quote.dp}
              currency={stockDetails.currency}
            />
          </div>
          <div className="stckdetails">
            <Details details={stockDetails} />
          </div>
        </div>
        </>
      );
  
}

export default StockDashboard