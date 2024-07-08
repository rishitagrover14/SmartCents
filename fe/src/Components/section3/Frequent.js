import './Frequent.css'
import { useState } from 'react'
const data=[
    {
        question:'What is financial planning?',
        answer:'Financial Planning is the comprehensive evaluation of your current financial position and future goals to chalk-out a time-bound strategy for the future. It involves assessing your financial position, identifying leakages, acknowledging your goals, assessing your risk profile, designing a suitable asset allocation plan and laying down a strategy timeline to accomplish the goals.'
    },
    {
        question:'What is a budget, and how do I create one?',
        answer:'A budget is a financial plan that helps you allocate your income towards expenses, savings, and debt repayment. To create a budget, list your income sources, track your monthly expenses, categorize them (necessities, discretionary, savings), and ensure your expenses do not exceed your income.'
    },
    {
        question:'What is the difference between a savings account and a checking account?',
        answer:'A savings account is designed for saving money and earns interest, while a checking account is for daily transactions and usually has lower or no interest.'
    },
    {
        question:'How do I start investing in the stock market?',
        answer:'Educate yourself on stock market basics, determine your investment goals, open a brokerage account, start with diversified investments like mutual funds or ETFs, and consider working with a financial advisor.'
    },
    {
        question:'What is the time value of money?',
        answer: 'The time value of money is the concept that money available today is worth more than the same amount in the future due to its earning potential. It underpins discounted cash flow analysis, interest rates, and investment appraisal.'
    }
]
function Frequent(){
    const[selected,setselected]=useState(null)
    const toggle=(i)=>{
        if(selected === i){
            return setselected(null);
        }
       
        setselected(i)
    }
    return(
    <div className='wrapper'>
        <din className='acordian'>
            {
                data.map((item,i)=>(
                    <div className='item'  onClick={()=> toggle(i)}>
                        <div className='title'><h2>{item.question}</h2>
                        {/* <span>{selected === i ? '-' :'+'}</span> */}
                        </div>
                        
                        <div className={selected === i ? 'content show' :'content'}>{item.answer}</div>
                    </div>
                ))
            }
        </din>
    </div>)
       

       
}

export default Frequent;