// Front-End: src/components/FavoritePage.js
import React from "react";
import { useState, useEffect } from "react";
import {
  Container,
  Table,
  DropdownButton,
  Dropdown,
  Row,
  Col,
  ButtonGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSort } from "react-icons/fa";
import "./styles/standings.css";
import "./styles/table.css";

function Favourite() {
  const [matchday, setMatchday] = useState("1"); // State for selected matchday
  const [matches, setMatches] = useState([]); // State for match data
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(2023);
  const [season, setSeason] = useState(2023);
  const [error, setError] = useState(null);
  const [team, setTeam] = useState("");
  const [tableLoading, setTableLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [sortBy, setSortBy] = useState({
    key: "goals_scored",
    ascending: false,
  });
  const [searchText, setSearchText] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");

  const positionMapping = {
    1: "GK",
    2: "Defender",
    3: "Midfielder",
    4: "Forward",
  };

  const teamMapping = {
    1: "Arsenal",
    2: "Aston Villa",
    3: "Bournemouth",
    4: "Brentford",
    5: "Brighton Hove",
    6: "Burnley",
    7: "Chelsea",
    8: "Crystal Palace",
    9: "Everton",
    10: "Fulham",
    11: "Liverpool",
    12: "Luton Town",
    13: "Man City",
    14: "Man United",
    15: "Newcastle",
    16: "Nottingham",
    17: "Sheffield Utd",
    18: "Tottenham",
    19: "West Ham",
    20: "Wolverhampton",
  };

  useEffect(() => {
    // Fetch user data from the backend when the component mounts
    fetchUserData();
  }, []);

  useEffect(() => {
    const cachedStandings = localStorage.getItem(
      `${team}standings-${selectedSeason}`
    );
    //if data cached and not most recent season, use cached data
    if (cachedStandings && selectedSeason !== 2023) {
      setStandings(JSON.parse(cachedStandings));
      setLoading(false);
    } else {
      fetchStandings(selectedSeason);
    }
  }, [selectedSeason]);

  useEffect(() => {
    fetchMatches(season, matchday);
  }, [season, matchday]);

  useEffect(() => {
    async function fetchStatistics() {
      try {
        const response = await fetch(`http://localhost:8800/api/fantasy`);
        const data = await response.json();
        setStats(data.elements);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    }

    fetchStatistics();
  }, []);

  //FETCH THE MATCHES
  const fetchMatches = async (season, matchday) => {
    try {
      setLoading(true);
      const cachedData = localStorage.getItem(`scores-${season}-${matchday}`); //"key" for a season/matchday data to check if in cache already

      if (cachedData) {
        //if cached, get the data and use it
        const data = JSON.parse(cachedData);
        setMatches(data.matches);
        setError(null);
        setLoading(false);
      } else {
        //else fetch with api and handle errors, also set the data in cache for next time
        const response = await fetch(
          `http://localhost:8800/api/scores?season=${season}&matchday=${matchday}`
        );
        if (response.status === 500) {
          setError("Too Many Requests. Please try again later.");
        } else {
          setError(null);
          const data = await response.json();
          setMatches(data.matches);
          localStorage.setItem(
            `scores-${season}-${matchday}`,
            JSON.stringify(data)
          );
        }
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching standings:", error.message);
      setLoading(false);
      setError(error.message);
    }
  };

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

  //FETCH THE POSITION
  const fetchStandings = async (season) => {
    try {
      const response = await fetch(
        `http://localhost:8800/api/standings?season=${season}`
      );
      if (!response.ok) {
        if (response.status === 500) {
          throw new Error(
            "Too many Requests :( please wait a minute before refreshing to make a new request"
          );
        }
      }
      const data = await response.text(); // Log the raw JSON string
      const parsedData = JSON.parse(data);

      setStandings(parsedData);
      setTableLoading(false);
      //cache data
      localStorage.setItem(
        `${team}standings-${season}`,
        JSON.stringify(parsedData)
      );
    } catch (error) {
      console.error("Error fetching standings:", error.message);
      setTableLoading(false);
      setError(error.message);
    }
  };

  //FETCH THE USER DATA
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
        setTeam(data.team);
      } else {
        // Handle unauthorized or other errors
        // Redirect to the sign-in page or show an error message
        window.location.href = "/sign-in-options";
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const filterStandingsForFavouriteTeam = (standings) => {
    return standings[0]?.table.filter(
      (teamData) => teamData.team.shortName === team
    );
  };

  //FILTER SCORES
  const filterScoresForFavouriteTeam = () => {
    return matches.filter(
      (teamData) =>
        teamData.homeTeam.shortName === team ||
        teamData.awayTeam.shortName === team
    );
  };

  const handleSort = (key) => {
    if (sortBy.key === key) {
      setSortBy({
        key,
        ascending: !sortBy.ascending,
      });
    } else {
      setSortBy({
        key,
        ascending: false,
      });
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const sortedData = stats.slice().sort((a, b) => {
    const aValue = parseFloat(a[sortBy.key]);
    const bValue = parseFloat(b[sortBy.key]);

    if (!isNaN(aValue) && !isNaN(bValue)) {
      if (sortBy.ascending) {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    } else {
      // Need to handle cases where values cannot be converted to numbers
      // For example, if aValue or bValue is not a valid number
      return 0;
    }
  });

  const filteredData = sortedData
    .filter((player) => {
      const playerName = `${player.first_name} ${player.second_name}`;
      return playerName.toLowerCase().includes(searchText.toLowerCase());
    })
    .filter(
      (player) =>
        !selectedPosition || player.element_type === parseInt(selectedPosition)
    );

    const filteredDataForTeam = filteredData.filter(
      (player) => teamMapping[player.team] === team
    );
    

  const renderTableRows = () => {
    return filteredDataForTeam.map((player) => (
      <tr key={player.id}>
        <td>
          {player.first_name} {player.second_name}
        </td>
        <td>{teamMapping[player.team]}</td>
        <td>{positionMapping[player.element_type]}</td>
        <td>{player.goals_scored}</td>
        <td>{player.assists}</td>
        <td>{player.yellow_cards}</td>
        <td>{player.red_cards}</td>
        <td>{player.expected_goals_per_90}</td>
        <td>{player.expected_assists_per_90}</td>
        <td>{player.clean_sheets}</td>
      </tr>
    ));
  };

  return (
    <div>
      <Container className="stats-container">
        <div className="header">
          <h1>{team} Premier League Standings</h1>
          <DropdownButton
            className="dropdown-btn"
            id="season-dropdown"
            title={`Season: ${selectedSeason}`}
            data-bs-theme="dark"
            menuVariant="dark"
          >
            <Dropdown.Item onClick={() => setSelectedSeason("2023")}>
              2023/24
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedSeason("2022")}>
              2022/23
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedSeason("2021")}>
              2021/22
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedSeason("2020")}>
              2020/21
            </Dropdown.Item>
          </DropdownButton>
        </div>
        {error ? (
          <p className="error-message">{error}</p>
        ) : tableLoading ? (
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
              {filterStandingsForFavouriteTeam(standings).map((team, index) => (
                <tr key={index}>
                  <td>{team.position}</td>
                  <td>
                    <img
                      alt={team.team.shortName + "crest"}
                      src={team.team.crest}
                      className="team-badge"
                    />
                    {team.team.shortName}
                  </td>
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

      <Container className="scores-container">
        <div className="dropdown-container">
          <h1 className="page-title">{team} Results and Fixtures</h1>
          <ButtonGroup>
            <DropdownButton
              className="dropdown-btn"
              id="season-dropdown"
              title={`Match Day: ${matchday}`}
              data-bs-theme="dark"
              menuVariant="dark"
            >
              <Dropdown.Menu
                className="scrollable-menu"
                data-bs-theme="dark"
                menuVariant="dark"
              >
                {displayMatchdays()}
              </Dropdown.Menu>
            </DropdownButton>

            <DropdownButton
              className="dropdown-btn"
              id="season-dropdown"
              title={`Season: ${season}`}
              data-bs-theme="dark"
              menuVariant="dark"
            >
              <Dropdown.Item onClick={() => setSeason("2023")}>
                2023/24
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSeason("2022")}>
                2022/23
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSeason("2021")}>
                2021/22
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSeason("2020")}>
                2020/21
              </Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
        </div>

        <div>
          {/* if error display error, if loading display loading*/}
          {error ? (
            <p className="error-message">{error}</p>
          ) : loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {/* iterate over every match in matches array and use the anon function to display */}
              {filterScoresForFavouriteTeam().map((match, index) => (
                <Container fluid className="match-card" key={index}>
                  <Row key={match.id}>
                    <Col>
                      <img
                        src={match.homeTeam.crest}
                        alt={match.homeTeam.shortName}
                        className="team-crest"
                      />
                      <p className="team-name">{match.homeTeam.name}</p>
                    </Col>

                    <Col md="auto">
                      <p className="score">
                        {" "}
                        {match.score.fullTime.home} -{" "}
                        {match.score.fullTime.away}
                      </p>
                    </Col>

                    <Col>
                      <img
                        src={match.awayTeam.crest}
                        alt={match.awayTeam.shortName}
                        className="team-crest"
                      />
                      <p className="team-name">{match.awayTeam.name}</p>
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

      <Container>
      <div className="stats-container">
      <h1>2023/24 {team} Premier League Statistics</h1>
      <input
        type="text"
        placeholder="Search Player"
        value={searchText}
        onChange={handleSearch}
        className="search-bar"
      />

      <div className="filters-container">
        <div className="filter">
          <label htmlFor="positionFilter">Position</label>
          <select
            id="positionFilter"
            onChange={(e) => setSelectedPosition(e.target.value)}
            value={selectedPosition}
          >
            <option value="">All Positions</option>
            {Object.entries(positionMapping).map(
              ([positionNumber, position]) => (
                <option key={positionNumber} value={positionNumber}>
                  {position}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      <table className="stats-table">
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Team</th>
            <th>Position</th>
            <th>
              Goals Scored{" "}
              {<FaSort onClick={() => handleSort("goals_scored")} />}
            </th>
            <th>Assists {<FaSort onClick={() => handleSort("assists")} />}</th>
            <th>
              Yellow Cards{" "}
              {<FaSort onClick={() => handleSort("yellow_cards")} />}
            </th>
            <th>
              Red Cards {<FaSort onClick={() => handleSort("red_cards")} />}
            </th>
            <th>
              {" "}
              xG per 90{" "}
              {<FaSort onClick={() => handleSort("expected_goals_per_90")} />}
            </th>
            <th>
              xA per 90
              {<FaSort onClick={() => handleSort("expected_assists_per_90")} />}
            </th>
            <th>
              Clean Sheets
              {<FaSort onClick={() => handleSort("clean_sheets")} />}
            </th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
      </Container>
    </div>
  );
}

export default Favourite;
