import React, { useEffect, useState } from "react";
import { Container, DropdownButton, Dropdown, Card, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import "./styles/scores.css";
import "bootstrap/dist/css/bootstrap.min.css";

// first page made, too many comments...
function Scores() {
  const [matchday, setMatchday] = useState("1"); 
  const [season, setSeason] = useState("2023"); 
  const [matches, setMatches] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // useEffect to do something after render and change to our dependency array [season, matchday] (fetch data)
  useEffect(() => {
    fetchMatches(season, matchday);
  }, [season, matchday]);

  /* ------ API Call fetch data ------- */ 
  // Async function (fetchmatches), with two parameters, arrow function syntax. async function so rest of application is not blocked waiting for api response
  // Using await so our async function pauses code execution until promise is resolved and we receive our response from api
  const fetchMatches = async (season, matchday) => {
    try {
    
      setLoading(true);
      const cachedData = localStorage.getItem(`scores-${season}-${matchday}`); // "key" for a season/matchday data to check if in cache already
      
      if (cachedData && (season !== 2023)) {
        // If cached, get the data and use it 
        const data = JSON.parse(cachedData);
        setMatches(data.matches);
        setError(null);
        setLoading(false);
      } else {
        // Else fetch with api and handle errors, also set the data in cache for next time
        const response = await fetch(`http://localhost:8800/api/scores?season=${season}&matchday=${matchday}`);
        if (response.status === 500) {
          setError("Too Many Requests. Please try again later.");
        } else {
          setError(null);
          const data = await response.json();
          setMatches(data.matches);
          localStorage.setItem(`scores-${season}-${matchday}`, JSON.stringify(data));
        }
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching standings:", error.message);
      setLoading(false);
      setError(error.message);
    }
  };

  //to not write out 38 drop down items
  const displayMatchdays = () => {
    const matchdayItems = [];
  
    for (let i = 1; i <= 38; i++) {
      matchdayItems.push(
        <Dropdown.Item key={i} onClick={() => setMatchday(i.toString())}>
          {i}
        </Dropdown.Item>
      );
    }
  
    return matchdayItems;
  };

  return (
    <Container className="scores-container">
    <div className="dropdown-container">
      <h1 className="page-title">Premier League Results and Fixtures</h1>
      <ButtonGroup>
      <DropdownButton className="dropdown-btn" id="season-dropdown" title={`Match Day: ${matchday}`} data-bs-theme="dark"  menuVariant="dark">
          <Dropdown.Menu className="scrollable-menu"  data-bs-theme="dark"  menuVariant="dark">
            {displayMatchdays()}
          </Dropdown.Menu>
        </DropdownButton>

        <DropdownButton className="dropdown-btn" id="season-dropdown" title={`Season: ${season}`} data-bs-theme="dark"  menuVariant="dark" >
          <Dropdown.Item onClick={() => setSeason("2023")}>2023/24</Dropdown.Item>
          <Dropdown.Item onClick={() => setSeason("2022")}>2022/23</Dropdown.Item>
          <Dropdown.Item onClick={() => setSeason("2021")}>2021/22</Dropdown.Item>
          <Dropdown.Item onClick={() => setSeason("2020")}>2020/21</Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
       
      </div>

      <div>
      {error ? (
        <p className="error-message">{error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
          <div>
            {matches.map((match) => (
              <Container fluid className="match-card">
                <Row key={match.id} >

                  <Col>
                    <img src={match.homeTeam.crest} alt={match.homeTeam.shortName} className="team-crest" />
                    <p className="team-name">{match.homeTeam.name}</p>
                  </Col>

                  <Col md="auto"> 
                    <p className="score"> {match.score.fullTime.home} - {match.score.fullTime.away}</p>
                  </Col>

                  <Col >  
                    <img src={match.awayTeam.crest} alt={match.awayTeam.shortName} className="team-crest" />
                    <p className="team-name">{match.awayTeam.shortName}</p>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <p className="match-details">
                    {new Date(match.utcDate).toLocaleString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </p>
                  <p className="venue">{match.venue}</p>
                  </Col>
                </Row>
              </Container>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
export default Scores;