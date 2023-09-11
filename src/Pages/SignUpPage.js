import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [team, setTeam] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const premierLeagueTeams = [
    "Arsenal",
    "Aston Villa",
    "Bournemouth",
    "Brentford",
    "Brighton Hove",
    "Burnley",
    "Chelsea",
    "Crystal Palace",
    "Everton",
    "Fulham",
    "Liverpool",
    "Luton Town",
    "Man City",
    "Man United",
    "Newcastle",
    "Nottingham",
    "Sheffield Utd",
    "Tottenham",
    "West Ham",
    "Wolverhampton",
  ];

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://eplhub-api-jasonsidhu.onrender.com/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password, team }),
      });

      if (response.status === 201) {
        // Registration successful
        const data = await response.json();
        localStorage.setItem("userToken", data.token); // Store the token in local storage to authenticate sign in later
        window.location.href = "/";
      } else {
        // Registration failed
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Internal Server Error");
    }
  };
  return (
    <Container fluid className="mt-5">
      <Card
        className="p-4 shadow"
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <h2 className="text-center mb-4">Sign Up</h2>
        <Form onSubmit={handleRegistration}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Create a username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button variant="light" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select Favorite Team</Form.Label>
            <Form.Control
              as="select"
              name="newFavourite"
              onChange={(e) => setTeam(e.target.value)}
            >
              <option value="">Select a team...</option>
              {Object.entries(premierLeagueTeams).map(([teamNumber, teamName]) => (
              <option key={teamNumber} value={teamName}>
                {teamName}
              </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Sign Up
          </Button>
          {error && <p className="text-danger mt-3">{error}</p>}
        </Form>
        <div className="mt-3 text-center">
          Already registered? <Link to="../../Pages/signin">Sign in</Link>
        </div>
      </Card>
    </Container>
  );
}

export default SignUpPage;
