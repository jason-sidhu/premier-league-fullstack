import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function Profile() {
  // Existing user data
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    favoriteTeam: "",
  });
  // Data to update
  const [formValues, setFormValues] = useState({
    newUsername: "",
    newEmail: "",
    newFavourite: "",
    newPassword: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [passwordToDelete, setPasswordToDelete] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");

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

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:8800/api/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setUserData(data);
      } else {
        // Redirect to the sign-in page
        window.location.href = "/sign-in-options";
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Use spread syntax and only change the updated info
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      ...formValues,
      currentPassword: currentPassword,
    };

    // Send HTTP request to update user information
    try {
      const response = await fetch("http://localhost:8800/api/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 200) {
        // Successfully updated user information, reset form and fetch the data to display again
        fetchUserData();
        setFormValues({
          newUsername: "",
          newEmail: "",
          newFavourite: "",
          newPassword: "",
        });
        setCurrentPassword("");
        setSuccessMessage("Information Updated Successfully");
        setError("");
      } else {
        const data = await response.json();
        setError(data.message);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleDeleteAccount = async () => {
    setShowDeleteModal(false); // Close the confirmation modal

    // Send HTTP request to delete the user account
    try {
      const response = await fetch("http://localhost:8800/api/profile/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({ password: passwordToDelete }),
      });

      if (response.status === 200) {
        localStorage.setItem("userToken", "");
        window.location.href = "/sign-in-options";
      } else {
        const data = await response.json();
        setSuccessMessage("");
        setError(data.message);
      }
    } catch (error) {
      console.error("Error deleting user account:", error);
    }
  };

  return (
    <Container fluid className="mt-5">
      <Row className="justify-content-center">
        <Col sm={8} md={6} lg={4}>
          <Card className="p-4 shadow">
            <div>
              <h2 className="text-center mb-4">Profile</h2>
              {successMessage && (
                <div className="alert alert-success mt-4" role="alert">
                  {successMessage}
                </div>
              )}
              {error && (
                <div className="alert alert-danger mt-4" role="alert">
                  {error}
                </div>
              )}
            </div>
            <div className="mb-3">
              <strong>Username:</strong> {userData.username}
            </div>
            <div className="mb-3">
              <strong>Email:</strong> {userData.email}
            </div>
            <div>
              <strong>Favorite Team:</strong> {userData.team}
            </div>

            <Form className="mt-4" onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Update Username</Form.Label>
                <Form.Control
                  type="text"
                  name="newUsername"
                  placeholder="Enter new username"
                  value={formValues.newUsername}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Update Email</Form.Label>
                <Form.Control
                  type="email"
                  name="newEmail"
                  placeholder="Enter new email"
                  value={formValues.newEmail}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Update Favorite Team</Form.Label>
                <Form.Control
                  as="select"
                  name="newFavourite"
                  value={formValues.newFavourite}
                  onChange={handleChange}
                >
                  <option value="">Select a team...</option>
                  {premierLeagueTeams.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="Enter new password"
                    value={formValues.newPassword}
                    onChange={handleChange}
                  />
                  <Button variant="light" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Current Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="currentPassword"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                  <Button variant="light" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup>
              </Form.Group>

              <Row>
                <Col xs={6}>
                  <Button variant="primary" type="submit" className="w-100">
                    Update Information
                  </Button>
                </Col>
                <Col xs={6}>
                  <Button
                    variant="danger"
                    className="w-100"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete Account
                  </Button>
                </Col>
              </Row>

              <Modal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Are you sure you want to delete your account?</p>
                  <Form.Group className="mb-3">
                    <Form.Label>Enter Your Password to Confirm</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        value={passwordToDelete}
                        onChange={(e) => setPasswordToDelete(e.target.value)}
                      />
                      <Button
                        variant="light"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                  </Form.Group>
                  <Button variant="danger" onClick={handleDeleteAccount}>
                    Confirm Deletion
                  </Button>
                </Modal.Body>
              </Modal>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
