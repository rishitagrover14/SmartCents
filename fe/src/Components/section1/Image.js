import { useAuth } from "../../AuthContext";
import "./Image.css";
import plane from "./plane.jpg";
import { useNavigate } from "react-router-dom";
function Image() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleButtonClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <div className="maining">
        {/* <img src={highlight}></img> */}
        <div className="guide">Your Personal Finance Guide</div>
        <div className="tagline">
          Bridging Financial Wisdom With Practicalitly
        </div>
        <button onClick={() => handleButtonClick()}>Lets Go</button>
      </div>
      <div>
        <img className="plane" src={plane} />
      </div>
    </div>
  );
}
export default Image;
