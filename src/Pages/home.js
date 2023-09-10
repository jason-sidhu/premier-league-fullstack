import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container} from 'react-bootstrap';
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
              <p>Your one-stop destination for Premier League scores, updates, fantasy football, and statistics!</p>
              <p>{isAuthenticated ? "Checkout the favorite tab to see information about your favorite team" : "Sign in to have a customized experience with your favorite team"} </p>
            </Container>
          </div>
        </div>
      );
    };

export default Home;
