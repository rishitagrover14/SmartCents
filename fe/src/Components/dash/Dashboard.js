import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import logoBlue from './logoBlue.png'
import logoOrange from './logoOrange.png'
import logoPurple from './logoPurple.png'
function Dashboard(){
    const navigate=useNavigate();
    return<div className='modules'>
        
        <div className='outline3'>
            <div className='cardt'>Smart Budgeting Made Simple</div>
            <div className='cardcontent'> Master your finances with our 50-30-20 budgeting tool. Simply enter your monthly income, and we'll automatically divide it into 50% for needs, 30% for expenses, and 20% for savings, tailored to each user's monthly budget.Take control of your financial future with our user-friendly platform, designed to make budgeting simple and effective.<span> #SpendSmart</span></div>
           <div className='out2'>
           <img src={logoOrange}/>
            <div className='button' onClick={()=> navigate('/budget')}>Lets Save!</div>
           </div>
        </div>
         <div className='outline1'>
            <div className='cardt'>Unlock Banking Secrets, One Card at a Time </div>
            <div className='cardcontent'> Users tackle diverse questions about banking by through a card game board to reveal scenarios. These must be sorted into relevant categories. Each level brings new challenges, and completing them rewards users with coins. Dive into "Card Flip" and help yourself become <span> #BankSmart</span>.</div>
           <div className='out1'>
           <img className='lo1'src={logoPurple}/>
               <div className='button' onClick={()=> navigate('/timeline')}>Lets Save!</div>
           </div>
        </div>

        <div className='outline2'>
            <div className='cardt'>Navigate the Investment Landscape</div>
            <div className='cardcontent'>Dive into the world of investments with our interactive Stocks and Real Estate module.Enhance your knowledge with our engaging quiz, and practice investing an real estate investing with dummy stocks and in-app coins in a risk-free environment.<span> #InvestWise</span></div>
            <div className='out2' >
                <img src={logoBlue}/>
            <div className='button' onClick={()=>navigate('/investing')}>Lets Go!</div>
            </div>
        </div>

       </div>
}
export default Dashboard;