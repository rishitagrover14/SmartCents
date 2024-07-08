import { useNavigate } from "react-router-dom";
import './Demat.css'
import NavBlack from "../navbarBlack/NavBlack";
function Demat()
{
    const naviga=useNavigate()
    return(
       <div>
        <NavBlack/>
        <div className="dematt">
        <div className="demat">
            
            <div className="heading">
                <h1>Here are simple steps on how to open a demat account</h1>
            </div>
            <div className="steps">
                
               <ul>
                <li>Choose a DP Website
</li>
                <li>Choose the Option 'Open Demat Account'</li>
                <li>Fill Out the Demat Account Opening Form with Proper Details and Submit It</li>
                <li>You Will Receive a One Time OTP</li>
                <li>Submit the Required Documents for Demat Account Opening
                    <ul>
                        <li>Valid proof of identification (PAN card is mandatory)</li>
                        <li>Valid proof of address</li>
                        <li>Valid proof of income</li>
                        <li>Valid proof of bank account</li>
                        <li>Recent passport-sized photographs</li>
                    </ul>
                </li>
                <li>Finish The E-KYC Process, Digitally Authenticate Your KYC Information, and Get Your Demat Account Number</li>
               </ul>
            </div>
            <div className="btn"><button onClick={()=>naviga('/questions')}>OK Got it!!</button></div>
        </div>
        </div>
       </div>
    );
}
export default Demat