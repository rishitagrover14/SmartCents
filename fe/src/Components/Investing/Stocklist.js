// import './Dashboard.css'
import Stockdata from './Stockdata'
import './Stocklist.css'
import StockDashboard from './StockDashboard'
import { useNavigate } from 'react-router-dom';

function Stocklist(props){
    const navigate = useNavigate();

    const handleButtonClick = async (symbol) => {
        const investmentPoints = 50;
    const token = sessionStorage.getItem("token"); // or wherever you're storing the JWT

    try {
      const response = await fetch('http://localhost:4000/api/v1/invest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `${token}` : "",
        },
        body: JSON.stringify({ investmentPoints }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Investment successful:', result);
        // Update UI accordingly
      } else {
        console.error('Investment failed:', result.message);
      }
    } catch (error) {
      console.error('Error during investment:', error);
    }
    navigate('/stock-dashboard', { state: { symbol } });
    
    };
    return(
        <div className='mainashmeet'>
            
            <table>
                <thead>
                <th>Sr. No.</th>
                <th>COMPANY</th>
                <th>SYMBOL</th>
                <th>PRICE <span>Rs.</span></th>
                <th>DAY HIGH <span>Rs.</span></th>
                <th>CHANGE<span>%</span></th>
                <th></th>
                </thead>
                <tbody>
                {props.stocks.map(
                    (stock)=>
                        <tr>
                            <td>{stock.id}</td>
                            <td className='cname'>{stock.name}</td>
                            <td>{stock.symbol}</td>
                            <td>{stock.prize}</td>
                            <td>{stock.dayhigh}</td>
                            <td><button className='butt2'>{stock.change}% </button></td>
                            <td><button onClick={() => handleButtonClick(stock.symbol)}>BUY</button></td>
                        </tr>
                    
                )}
                </tbody>

               
                
                


            </table>
        </div>
    )
}
export default Stocklist