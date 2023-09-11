import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom"; // Use Link and useNavigate from react-router-dom
import "./Navbar.css";

function BSNavbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track user authentication state to see if signed in or not, display accordingly 
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  // Check if user is authenticated
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      setIsAuthenticated(true);
    }
  }, []);

  // Function to handle sign-out
  const handleSignOut = () => {
    // Remove user token from local storage and update state
    localStorage.removeItem("userToken");
    setIsAuthenticated(false);
    navigate("/"); // Navigate to the home page after sign out
  };

  const handleSignOutClick = () => {
    const confirmed = window.confirm("Are you sure you want to sign out?");
    if (confirmed) {
      handleSignOut();
    }
  };

  return (
    <Navbar className="nav">
      <Container>
        <Link to="/" className="nav-options">EPL Home</Link> {/* Use Link instead of href */}
        <Nav className="me-auto">
          <Link to="/Pages/scores" className="nav-options">Results</Link> {/* Use Link instead of href */}
          <Link to="/Pages/standings" className="nav-options">Standings</Link> {/* Use Link instead of href */}
          <Link to="/Pages/stats" className="nav-options">Statistics</Link> {/* Use Link instead of href */}
          <Link to="/Pages/fantasy" className="nav-options">Fantasy</Link> {/* Use Link instead of href */}
          <Link
            to={isAuthenticated ? "/Pages/favourite" : "/sign-in-options"}
            className="nav-options"
          >
            Favourite
          </Link>
        </Nav>
        <Nav>
          <Link
            to={isAuthenticated ? "/profile" : "/sign-in-options"}
            className="nav-options"
          >
            Profile
          </Link>
          <span
            onClick={isAuthenticated ? handleSignOutClick : null}
            className={
              isAuthenticated ? "sign-out-animation nav-options" : "nav-options"
            }
          >
            {isAuthenticated ? "Sign Out" : "Sign In"}
          </span>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default BSNavbar;
