import "../dash/Navdash.css";
import "./navblack.css";
import logo from "./logo.png";
import {useEffect, useState} from "react";
import profile from "./profile.png";
import coins from "./coin.png";
import { handleLogout } from "../dash/Navdash";
import { useNavigate } from "react-router-dom";
function NavBlack() {
  const menu = ["Dashboard", "Log-out", "Support"];
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [points, setPoints] = useState(100);

  useEffect(() => {
    // Fetch current user data when the component mounts
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch("http://localhost:4000/api/v1/currentUser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
            // Add any necessary headers (e.g., authorization headers)
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.user) {
            setPoints(data.user.points); // Set user's points
          }
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleMenuItemClick = (item) => {
    if (item === "Dashboard") {
      navigate("/dashboard"); // Navigate to /dashboard route
    } else if (item === "Log-out") {
      handleLogout(); // Call handleLogout function for logout
    }
    setOpen(false); // Close the menu
  };

  return (
    <div className="navblack">
      <div className="navbar1">
        <img className="logo" src={logo} alt="Logo" />
        <div className="nav2">
          <div className="nav">
            <img className="coins" src={coins} alt="Coins" />
            <div className="coincount">${points}</div>
          </div>
          <div>
            <img
              onClick={() => setOpen(!open)}
              className="profile"
              src={profile}
              alt="Profile"
            />
            {open && (
              <div className="click">
                {menu.map((item) => (
                  <div
                    className="listitem"
                    onClick={() => handleMenuItemClick(item)}
                    key={item}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default NavBlack;
