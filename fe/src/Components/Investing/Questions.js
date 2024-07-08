import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Questions.css'
import NavBlack from "../navbarBlack/NavBlack";
function Questions(){
    
    const nviii=useNavigate()
    
    return(
       <div>
        <NavBlack/>
         <div className="modulesashmeet">
            <h1>Answer a few questions to let us know about your preferences in stocks!!</h1>
            <div className="question1">
                <h2 className="headddd">Question 1 out of 4</h2><br/>
                <h3>What kind of stocks would you like to invest in?</h3><br/>
                        <button className="buttonashmeet" onClick={()=>nviii('/question2')}>
                        <h4>Common Stocks</h4><br/>
                        <p>Perks:On buying a Common Stock you get to weigh in on corporate decisions by voting for the board of directors and corporate policies </p><br/>
                        <p>Downsides:When a company goes out of business and has to sell off everything it owns (liquidate its assets), the money from these sales is used to pay back people the company owes. Common Stock shareholders get paid only after bondholders, preferred shareholders, and other creditors.</p>
                        </button> 
                      
                        <button className="buttonashmeet" onClick={()=>nviii('/question2')}>
                    <h4>Preferred Stocks</h4><br/>
                        <p>Perks: Preferred stockholders have a higher claim to dividends or asset distribution than common stockholders</p><br/>
                        <p>Downsides:Unlike common stockholders, preferred stockholders have limited rights, which usually does not include voting.</p>
                        </button>
            </div>
        </div>
       </div>

    );
}
export default Questions