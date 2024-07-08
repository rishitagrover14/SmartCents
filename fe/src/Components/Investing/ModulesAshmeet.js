import stock from './stock.png'
import realestate from './realestate2.png'
import './ModulesAshmeet.css'
import { Link, useNavigate } from 'react-router-dom';
import Navblack from '../navbarBlack/NavBlack'
function Modules(){
    const navigate=useNavigate()
    function gotostock()
    {
        navigate('/stocks')
    }
    return(
       <div>
<Navblack/>
        <div className='modulesashmeet'>
        <div className='stockss'>
            <div className='image'>
                <div ><img className='ima'src={stock} alt="Logo"></img></div>
            
                <p>A stock represents a share in the ownership of a company, including a claim on the company's earnings and assets. As such, stockholders are partial owners of the company. Answer Some Questions to let us know of your preferences and invest in stocks using your in-app coins </p>
            </div>
            <div ><button className='btns'onClick={gotostock}>Explore Stocks</button></div>
        </div>
        <div className='realestate'>
            <div className='imagee'>
                <div ><img className='ima'src={realestate} alt="Logo"></img></div>
            </div>
            <div>
                <p>An investment in commercial real estate might involve the ownership of retail stores, office buildings, or storage facilities and warehouses. From a map simulation, choose the property you want to buy from the markups and buy them using your in-app coins </p>
            </div>
            <div ><button className='btns' onClick={()=>navigate('/map')}>Explore Real-Estate</button></div>
        </div>
        </div>
       </div>
    );
}
export default Modules