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
    window.location.reload();
  };

  const handleSignOutClick = () => {
    const confirmed = window.confirm("Are you sure you want to sign out?");
    if (confirmed) {
      handleSignOut();
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="nav">
      <Container>
        <Navbar.Brand as={Link} to="/" className="nav-options">
          EPL Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Pages/scores/" className="nav-options">
              Results
            </Nav.Link>
            <Nav.Link as={Link} to="/Pages/standings/" className="nav-options">
              Standings
            </Nav.Link>
            <Nav.Link as={Link} to="/Pages/stats/" className="nav-options">
              Statistics
            </Nav.Link>
            <Nav.Link as={Link} to="/Pages/fantasy/" className="nav-options">
              Fantasy
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={isAuthenticated ? "/Pages/favourite/" : "/sign-in-options"}
              className="nav-options"
            >
              Favourite
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              as={Link}
              to={isAuthenticated ? "/profile/" : "/sign-in-options"}
              className="nav-options"
            >
              Profile
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={isAuthenticated ? "/" : "/sign-in-options/"}
              onClick={isAuthenticated ? handleSignOutClick : null}
              className={
                isAuthenticated ? "sign-out-animation nav-options" : "nav-options"
              }
            >
              {isAuthenticated ? "Sign Out" : "Sign In"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BSNavbar;
