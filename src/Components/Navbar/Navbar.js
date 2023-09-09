import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function BSNavbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track user authentication state

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
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">EPL Home</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="../../Pages/scores">Results</Nav.Link>
          <Nav.Link href="../../Pages/standings">Standings</Nav.Link>
          <Nav.Link href="../../Pages/stats">Statistics</Nav.Link>
          <Nav.Link href="../../Pages/fantasy">Fantasy</Nav.Link>
          <Nav.Link  href={isAuthenticated ? "../../Pages/favourite" : "/sign-in-options"}>Favourite</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href={isAuthenticated ? "/profile" : "/sign-in-options" }>Profile</Nav.Link>
          <Nav.Link
            href={isAuthenticated ? "/" : "/sign-in-options"}
            onClick={isAuthenticated ? handleSignOutClick : null}
            className={isAuthenticated ? "sign-out-animation" : ""}
          >
            {isAuthenticated ? "Sign Out" : "Sign In"}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default BSNavbar;
