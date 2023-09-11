import React, { useEffect, useState } from "react";
import { FaSort } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/table.css";

function Stats() {
  const [stats, setStats] = useState([]);
  const [sortBy, setSortBy] = useState({
    key: "goals_scored",
    ascending: false,
  });
  const [searchText, setSearchText] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
    5: "Brighton",
    6: "Burnley",
    7: "Chelsea",
    8: "Crystal Palace",
    9: "Everton",
    10: "Fulham",
    11: "Liverpool",
    12: "Luton",
    13: "Man City",
    14: "Man Utd",
    15: "Newcastle",
    16: "Nottingham Forest",
    17: "Sheffield Utd",
    18: "Tottenham",
    19: "West Ham",
    20: "Wolves",
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await fetch(`https://eplhub-api-jasonsidhu.onrender.com/api/fantasy`);
      if (response.status === 200){
        const data = await response.json();
        setStats(data.elements);
        setLoading(false)
      } else {
        setError(response.message);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching statistics:", error);
      setLoading(false);
      setError(error.message);
    }
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
      // For example, if aValue or bValue is not a valid number, for now all cases are valid since only sorting numbers
      return 0;
    }
  });

  const filteredData = sortedData
    .filter((player) => {
      const playerName = `${player.first_name} ${player.second_name}`;
      return playerName.toLowerCase().includes(searchText.toLowerCase());
    })
    .filter((player) => !selectedTeam || player.team === parseInt(selectedTeam))
    .filter(
      (player) =>
        !selectedPosition || player.element_type === parseInt(selectedPosition)
    );

  const renderTableRows = () => {
    return filteredData.map((player) => (
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
    <div className="stats-container">
      <h1>2023/24 Premier League Statistics</h1>
      <input
        type="text"
        placeholder="Search Player"
        value={searchText}
        onChange={handleSearch}
        className="search-bar"
      />

      <div className="filters-container">
        <div className="filter">
          <label htmlFor="teamFilter">Filter by Team: </label>
          <select
            id="teamFilter"
            onChange={(e) => setSelectedTeam(e.target.value)}
            value={selectedTeam}
          >
            <option value="">All Teams</option>
            {Object.entries(teamMapping).map(([teamNumber, teamName]) => (
              <option key={teamNumber} value={teamNumber}>
                {teamName}
              </option>
            ))}
          </select>
        </div>
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
            <th>Goals Scored{<FaSort onClick={() => handleSort("goals_scored")} />} </th>
            <th>Assists {<FaSort onClick={() => handleSort("assists")} /> } </th>
            <th>Yellow Cards {<FaSort onClick={() => handleSort("yellow_cards")} />}</th>
            <th>Red Cards {<FaSort onClick={() => handleSort("red_cards")} />} </th>
            <th>xG per 90{<FaSort onClick={() => handleSort("expected_goals_per_90")} />} </th>
            <th>xA per 90{<FaSort onClick={() => handleSort("expected_assists_per_90")} />} </th>
            <th>Clean Sheets{<FaSort onClick={() => handleSort("clean_sheets")} />} </th>
          </tr>
        </thead>
        <tbody>
          {error ? (
            <p className="error-message">{error}</p>
          ) : loading ? (
            <p>Loading...</p>
          ) : (
            renderTableRows()
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Stats;
