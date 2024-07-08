import logo from "./logo.png";
import welcome from "./welcom.png";
import profile from "./profile.png";
import coins from "./coin.png";
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import "./Navdash.css";

export const handleLogout = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/logout", {
      method: "GET", // Assuming your logout endpoint uses GET method
      headers: {
        "Content-Type": "application/json",
        // Add any necessary headers (e.g., authorization headers)
      },
      // Add any necessary body or parameters if required
    });

    if (response.ok) {
      // Clear user session/token in client-side storage if needed
      sessionStorage.removeItem("token");
      localStorage.removeItem("expenses");
      window.location.href = "/login"; // Redirect to your login page
    } else {
      // Handle logout failure
      console.error("Logout failed");
      // Display error message or perform other actions as needed
    }
  } catch (error) {
    console.error("Logout error:", error);
    // Handle network errors or other exceptions
  }
};

function Navbar() {
  const menu = ["Dashboard", "Log-out", "Support"];
  const [open, setOpen] = useState(false);
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

  return (
    <div>
      <div className="navbar">
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
                    onClick={
                      item === "Log-out" ? handleLogout : () => setOpen(false)
                    }
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
      <div className="box">
        <div className="text">
          <span className="user">HELLO USER</span>
          <br />
          Welcome to SmartCents! Get Ready to Take Control of Your Financial
          Future
        </div>
        <img className="welcome" src={welcome} alt="Welcome" />
      </div>
      <Dashboard />
    </div>
  );
}

export default Navbar;
