
import { useNavigate } from "react-router-dom";
import './Questions.css'
import NavBlack from "../navbarBlack/NavBlack";
function Question2()
{
    
    const nviii=useNavigate()
   
    return(
        <div>
            <NavBlack/>
            <div className="modulesashmeet"><br/>
            <h1>Answer a few questions to let us know about your preferences in stocks!!</h1>
            <div className="question1">
                <h2 className="headddd">Question 2 out of 4</h2><br/>
                <h3>What kind of stocks would you like to invest in?</h3><br/>
                       <button className="buttonashmeet" onClick={()=>nviii('/question3')}>
                        <h4>Growth Stocks</h4><br/>
                        <p>Perks:Growth stocks offer the allure of high returns, with investments in companies on a robust growth trajectory potentially yielding substantial profits over time.</p><br/>
                        <p>Downsides:These kinds of stocks are more susceptible to market fluctuations and economic downturns, exposing investors to increased risk and potential losses during turbulent periods.</p>
                        </button>

                        <button className="buttonashmeet"  onClick={()=>nviii('/question3')}>
                    <h4>Value Stocks</h4><br/>
                        <p>Perks: Value stocks are often priced lower than their intrinsic worth, which can offer investors the opportunity to buy undervalued companies</p><br/>
                        <p>Downsides: Value stocks may be undervalued for a reason, such as fundamental problems with the company or its industry. This can lead to a situation known as a "value trap," where the stock remains undervalued or declines further, resulting in poor performance and potential losses for investors.</p>
                        </button> 

            </div>
        </div>
        </div>

    );
}
export default Question2