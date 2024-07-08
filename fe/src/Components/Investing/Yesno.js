import { useNavigate } from "react-router-dom"
import './Yesno.css'
function Yesno()
{
    const navig=useNavigate()
    
    return(
        <div className="yesnoo">
            <h1 className="headingss1">A Demat account is needed to start investing in stocks</h1>
        <div className="yesno">
            <h2 className="headingss">Do you have a Demat account?</h2>
            <div className="buttonss"><button onClick={()=>navig('/questions')}>Yes</button>
            <button onClick={()=>navig('/demat')}>No</button>
            </div>
        </div>
        </div>
    )
}
export default Yesno