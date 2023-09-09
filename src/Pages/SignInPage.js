import React, { useState } from "react";
import { Container, Card, Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import {  FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function SignInPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleSignIn = async (e) => {
        e.preventDefault(); 

        try{
            const response = await fetch("http://localhost:8800/api/signin", {
                method: 'POST', 
                headers:{
                    "Content-Type": "application/json",},
                body: JSON.stringify({ username, password }),
            }); 
            
             // Sign-in successful
            if (response.status === 200){
                const data = await response.json(); // Store the token in local storage for authentication later
                localStorage.setItem("userToken", data.token); 
                window.location.href = "/";
            } else {
                 // Sign-in failed 
                const data = await response.json();
                setError(data.message); 
            }
        } catch (error) {
            console.error("Sign-in error:", error);
            setError("Internal Server Error");
        }

    }

  return (
    <Container fluid className="mt-5">
      <Card className="p-4 shadow" style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h2 className="text-center mb-4">Sign In</h2>
        <Form onSubmit={handleSignIn}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Enter your username"
                onChange={(e)=>setUsername(e.target.value)}  
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                onChange={(e)=> setPassword(e.target.value)}
                required
              />
                <Button variant="light" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash />:<FaEye />}
                </Button>
            </InputGroup>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Sign In
          </Button>
          {error && <p className="text-danger mt-3">{error}</p>}
        </Form>
        <div className="mt-3 text-center">
            Not Registered? <Link to="../../Pages/signup">Sign up</Link>
        </div>
      </Card>
    </Container>
  );
}

export default SignInPage;
