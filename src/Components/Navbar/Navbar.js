import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css"

function BSNavbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track user authentication state to see if signed in or not, display accordingly 

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
  };

  const handleSignOutClick = () => {
    const confirmed = window.confirm("Are you sure you want to sign out?");
    if (confirmed) {
      handleSignOut();
    }
  };

  return (
  <Navbar className="nav" >
      <Container>
        <Navbar.Brand className="nav-options" href="/">EPL Home</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link className="nav-options" href="../../Pages/scores">Results</Nav.Link>
          <Nav.Link className="nav-options" href="../../Pages/standings">Standings</Nav.Link>
          <Nav.Link className="nav-options" href="../../Pages/stats">Statistics</Nav.Link>
          <Nav.Link className="nav-options" href="../../Pages/fantasy">Fantasy</Nav.Link>
          <Nav.Link className="nav-options" href={isAuthenticated ? "../../Pages/favourite" : "/sign-in-options"}>Favourite</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link className="nav-options" href={isAuthenticated ? "/profile" : "/sign-in-options" }>Profile</Nav.Link>
          <Nav.Link
            href={isAuthenticated ? "/" : "/sign-in-options"}
            onClick={isAuthenticated ? handleSignOutClick : null}
            className={isAuthenticated ? "sign-out-animation nav-options" : "nav-options"}
          >
            {isAuthenticated ? "Sign Out" : "Sign In"}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default BSNavbar;
