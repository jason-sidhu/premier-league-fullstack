import React from "react";
import { useState, useEffect } from "react";
import { Container, Table, DropdownButton, Dropdown } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/standings.css";
import "./styles/table.css"

function Standings() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(2023);
  const [error, setError] = useState(null);

  //------------on change to season------------
  useEffect(() => {
    const cachedStandings = localStorage.getItem(`standings-${selectedSeason}`);
    // If data cached and not most recent season, use cached data 
    if (cachedStandings && (selectedSeason !== 2023)) {
      setStandings(JSON.parse(cachedStandings));
      setLoading(false);
    } else {
      fetchStandings(selectedSeason);
    }
  }, [selectedSeason]);
  


  //------------fetch standings if needed------------
  const fetchStandings = async (season) => {
    try {
      const response = await fetch(`https://eplhub-api-jasonsidhu.onrender.com/api/standings?season=${season}`);
      if(!response.ok){
        if(response.status === 500) {
          setError(
            "Too many Requests :( please wait a minute before refreshing to make a new request"
          );
        }
      }
      const data = await response.text(); // Log the raw JSON string
      const parsedData = JSON.parse(data);
      

      setStandings(parsedData);
      setLoading(false);
      // Cache data
      localStorage.setItem(`standings-${season}`, JSON.stringify(parsedData));
    } catch (error) {
      console.error("Error fetching standings:", error.message);
      setLoading(false);
      setError(error.message);
    }
  };

  //------------Season Select------------
  const handleSeasonSelect = (season) => {
    setSelectedSeason(season);
  }


  return (
    <Container className="stats-container  p-4 shadow">
      <div className="header">
        <h1>Premier League Standings</h1>
        <DropdownButton id="season-dropdown" title={`Season ${selectedSeason}`} data-bs-theme="dark"  menuVariant="dark">
          <Dropdown.Item onClick={() => handleSeasonSelect('2023')} active={selectedSeason === '2023'}>2023/24</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSeasonSelect('2022')} active={selectedSeason === '2022'}>2022/23</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSeasonSelect('2021')} active={selectedSeason === '2021'}>2021/22</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSeasonSelect('2020')} active={selectedSeason === '2020'}>2020/21</Dropdown.Item>
        </DropdownButton>
      </div>
      {error ? (
        <p className="error-message">{error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <table className="stats-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Team</th>
              <th>GP</th>
              <th>Wins</th>
              <th>Draws</th>
              <th>Losses</th>
              <th>GF</th>
              <th>GA</th>
              <th>Dif</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {standings[0]?.table
              .map((team, index) => (
                <tr key={index} >
                  <td>{index+1}</td>
                  <td><img alt={team.team.shortName + "crest"} src={team.team.crest} className="team-badge"/>{team.team.shortName}</td>
                  <td>{team.playedGames}</td>
                  <td>{team.won}</td>
                  <td>{team.draw}</td>
                  <td>{team.lost}</td>
                  <td>{team.goalsAgainst}</td>
                  <td>{team.goalDifference}</td>
                  <td>{team.goalsFor}</td>
                  <td>{team.points}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Container>
  );
}

export default Standings;
