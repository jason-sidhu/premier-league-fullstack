import React from "react";
import { Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function SignInOptionsPage() {
  return (
    <Container className="mt-5" fluid>
      <Card className="p-4 shadow">
        <h2 className="text-center mb-4">Sign In or Sign Up</h2>
        <div className="d-flex flex-column align-items-center">
          <p>If you already have an account, you can sign in:</p>
          <Button
            as={Link}
            to="../../Pages/signin"
            variant="primary"
            className="mb-3"
          >
            Sign In
          </Button>
          <p>If you're new here, you can sign up:</p>
          <Button as={Link} to="../../Pages/signup" variant="primary">
            Sign Up
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default SignInOptionsPage;
