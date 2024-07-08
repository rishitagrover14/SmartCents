import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Questions.css'
import NavBlack from "../navbarBlack/NavBlack";
function Question3()
{
    
    const nviii=useNavigate()
    function gotonext()
    {
        nviii('/stocklist')
    }
    return(
       <div>
        <NavBlack/>
         <div className="modulesashmeet">
            <h1>Answer a few questions to let us know about your preferences in stocks!!</h1><br/>
            <div className="question1">
                <h2 className="headddd">Question 4 out of 4</h2><br/>
                <h3>What kind of stocks would you like to invest in?</h3><br/>

                        <button className="buttonashmeet" onClick={gotonext}>
                        <h4>Cyclical Stocks</h4><br/>
                        <p>Perks:Cyclical stocks tend to perform very well during periods of economic growth.</p><br/>
                        <p>Downsides:The performance of cyclical stocks is closely tied to the overall economy. During economic downturns or recessions, these stocks can suffer significant declines as consumer spending and business investments decrease. </p><br/>
                        </button> 

                    <button className="buttonashmeet" onClick={gotonext}>
                    <h4>Non-Cyclical Stocks</h4><br/>
                        <p>Perks: Non-cyclical stocks, often found in industries like utilities, healthcare, and consumer staples, tend to be more stable during economic downturns. </p><br/>
                        <p>Downsides:Because non-cyclical companies often operate in mature, stable industries with consistent demand, they may not experience the same level of growth during economic upturns as cyclical stocks. </p><br/>
                        </button>
 
            </div>
        </div>
       </div>

    );
}
export default Question3