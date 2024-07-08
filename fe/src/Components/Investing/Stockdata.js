import Stocklist from './Stocklist'
import './Stockdata.css'
import NavBlack from '../navbarBlack/NavBlack';
import { fetchStockDetails, fetchQuote } from "./api/stockApi";
import { useEffect, useState } from 'react';

function Stockdata() {
  const [data, setData] = useState([
    { id: '1', name: 'Apple', symbol: 'AAPL', prize: '', dayhigh: '', change: '' },
    { id: '2', name: 'Microsoft', symbol: 'MSFT', prize: '', dayhigh: '', change: '' },
    { id: '3', name: 'Google', symbol: 'GOOGL', prize: '', dayhigh: '', change: '' },
    { id: '4', name: 'Amazon', symbol: 'AMZN', prize: '', dayhigh: '', change: '' },
    { id: '5', name: 'Tesla', symbol: 'TSLA', prize: '', dayhigh: '', change: '' }
  ]);


  useEffect(()=>{
    const updateStockOverview = async () => {
      try {
        const results = await Promise.all(data.map(stock => fetchQuote(stock.symbol)));
        console.log(results);
        const updatedData = data.map((stock, index) => ({
          ...stock,
          prize: results[index].c,
          dayhigh: results[index].h,
          change: results[index].d,
        }));
        setData(updatedData);
      } catch (error) {
        console.log(error);
      }
    };

    updateStockOverview();
    console.log(data);
    
  },[]

  )
  

  // const data=[
  //   {
  //     id:1,
  //     name:'Dabur India',
  //     prize:600.25,
  //     dayhigh:633.40,
  //     change:'+5.52'
  //   },
  //   {
  //     id:2,
  //     name:'Hero Motors',
  //     prize:5658.50,
  //     dayhigh:5775.20,
  //     change:'+2.062'
  //   },
  //   {
  //     id:3,
  //     name:'Emami',
  //     prize:699.0,
  //     dayhigh:745.00,
  //     change:'+6.58'
  //   },
  //   {
  //     id:4,
  //     name:'Bajaj Autos',
  //     prize:9602.25,
  //     dayhigh:9679.00,
  //     change:'+0.79'
  //   },{
  //     id:5,
  //     name:'Trent',
  //     prize:4903.80,
  //     dayhigh:4932.05,
  //     change:'+0.57'
  //   }
  // ]

  return (<div>
    <NavBlack/>
    <div className='top'>
    <h2 className='headd2'>Here are Some Stocks based on your preferences</h2>
    <div className='stockhead'>
      To look for more information, click on buy.
      Clicking on buy gets your points deducted by 50.
    </div>
    
    <Stocklist stocks={data}/>
    </div>
  </div>
  );
}

export default Stockdata;