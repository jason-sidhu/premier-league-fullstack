import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./styles/home.css";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication and load info depending on this
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="home-page">
      <div className="jumbotron">
        <Container>
          <h1>Premier League Hub</h1>
          <p>
            Your one-stop destination for Premier League scores, updates,
            fantasy football, and statistics!
          </p>
          <p>
            {isAuthenticated
              ? "Checkout the favorite tab to see information about your favorite team"
              : "Sign in to have a customized experience with your favorite team"}{" "}
          </p>
        </Container>
      </div>
      <Container className="card-container">
        <Row>
          <Col>
            <Card className="custom-card p-4 shadow">
              <Card.Body>
                <Card.Title className="custom-card-title">What We Offer Now</Card.Title>
                <Card.Text>
                  Premier League Hub provides you with up-to-date scores, fixtures, player statistics, standings, and data from your favorite team. The Fantasy section will help you manage your Fantasy Premier League team
                  efficiently, providing valuable insights into key player performance attributes.
                </Card.Text>
                <Card.Text>
                  You can filter your search to find results and standings from specific seasons and matchdays, and 
                  filter your fantasy or Premier League player statistics by a number of different attributes.  
                </Card.Text>
                <Card.Text>
                 Once you have signed in, you can view data specific to your favorite team under the Favourite tab. See your favorite team's position, fixtures, and player
                 statistics all in one place. 
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        
          <Col>
            <Card className="custom-card  p-4 shadow">
              <Card.Body>
                <Card.Title className="custom-card-title">Coming Soon</Card.Title>
                <Card.Text>
                  Premier League Hub is a work in progress and is working hard to bring you
                  more features and a better user experience.
                </Card.Text>
                <Card.Text>
                  Upgrades will be made to the current APIs that are being used to offer a more tailored and enriched user experience.
                  In particular, there is lots of focus on the development of a more personalized Fantasy Premier League page, and a new Fantasy Premier League game. 
                  Here is a preview of some of the things we want to bring soon:
                </Card.Text>
                <Card.Text>
                  <ul>
                    <li>Pre-match statistics and lineups</li>
                    <li>Live match pages with in-game statistics and updates</li>
                    <li>A Fantasy Premier League game with a unique scoring system for a better fantasy experience</li>
                    <li>Live betting odds and predictions</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        </Container>
        <Container className="card-container">
        <Row>
          <Col>
            <Card className="custom-card p-4 shadow" >
              <Card.Body>
                <Card.Title className="custom-card-title">About Me</Card.Title>
                <Card.Text>
                  My name is Jason Sidhu, a computer engineering student at the University of Waterloo and the creator of Premier League Hub.
                </Card.Text>
                <Card.Text>
                  As a football fan, I wanted to create something that I felt passionate about while
                  testing my skills in creating a full-stack web application. I wanted to create a platform
                  that offers everything a Premier League fan could want in one place. 
                </Card.Text>
                <Card.Text>
                  I created this site to test my full-stack web development abilities. Using a MERN stack (MongoDB, Express.js, React.js, Node.js), I have been able to use:
                  <ul>
                    <li>Node.js for server-side development and used it to serve as the backend for my React-based web application</li>
                    <li>Express.js framework to create a RESTful API and handle HTTP requests and routes</li>
                    <li>MongoDB and mongoose to create models and schemas to create, read, update, and delete user data</li>
                    <li>JWT to authenticate users and ensure data is exchanged safely between the front and back-end. </li>
                    <li>Bcrypt to encrypt user passwords before storing them in the database</li>
                    <li>Use a caching mechanism to optimize API calls and reduce repeated API requests</li>
                  </ul>
                  If you have any suggestions, feedback, or would like to connect, please don't hesitate to reach out to me at sidhu.jason03@gmail.com 
                  <Card.Text>
  You can also find me on LinkedIn: <a href="https://www.linkedin.com/in/jason-sidhu/" target="_blank" rel="noopener noreferrer">LinkedIn</a>

<Card.Text>
  Explore my GitHub repository for this project: <a href="https://github.com/jason-sidhu/premier-league-fullstack" target="_blank" rel="noopener noreferrer">GitHub</a>
</Card.Text>
</Card.Text>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
