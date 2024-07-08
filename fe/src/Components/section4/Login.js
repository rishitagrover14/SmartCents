import "./Login.css";
import logo from "./logo.png";
import login1 from "./login1.png";
import arrow from "./arrow.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      // Successful login, store JWT token if needed
      login(data?.token);
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="left">
        <img
          src={arrow}
          className="arrow"
          onClick={() => navigate("/landing")}
          alt="Arrow Image"
        ></img>
        <div className="textlogin">
          <span>New here?</span>
          <br />
          Whoever you are, at whatever stage of life you are in, there is an
          offering for you at SmartCents. Get Started Now!
        </div>
        <button className="signup" onClick={() => navigate("/signup")}>
          Sign up
        </button>
        <img src={login1} className="login1" alt="Login Image"></img>
      </div>

      <div className="right">
        <img className="logo" src={logo} alt="Logo"></img>
        <div className="textsignin">Sign in</div>
        <form className="formlogin" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          ></input>
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          {error && <div className="error">{error}</div>}
          <button type="submit" className="signin">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
