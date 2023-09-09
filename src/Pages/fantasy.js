import React, { useEffect, useState } from "react";
import { FaSort } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/table.css";

function Fantasy() {
  const [fantasyData, setFantasyData] = useState([]);
  const [sortBy, setSortBy] = useState({
    key: "form",
    ascending: false,
  });
  const [searchText, setSearchText] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

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

  //cost returned incorrectly from API, fix to display properly
  const formatPrice = (rawPrice) => {
    const price = parseFloat(rawPrice);
    if (price < 10) {
      return price.toFixed(1);
    } else {
      return (price / 10).toFixed(1);
    }
  };

  useEffect(() => {
    async function fetchStatistics() {
      try {
        const response = await fetch(`http://localhost:8800/api/fantasy`);
        const data = await response.json();
        // Format the price data
        const formattedData = data.elements.map((player) => ({
          ...player,
          now_cost: formatPrice(player.now_cost),
        }));
        setFantasyData(formattedData);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    }

    fetchStatistics();
  }, []);

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

  const sortedFantasyData = fantasyData.slice().sort((a, b) => {
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
      return 0; // You can choose how to handle this case
    }
  });

  const filteredFantasyData = sortedFantasyData
    .filter((player) => {
      const playerName = `${player.first_name} ${player.second_name}`;
      return playerName.toLowerCase().includes(searchText.toLowerCase());
    })
    .filter((player) => !selectedTeam || player.team === parseInt(selectedTeam))
    .filter(
      (player) =>
        !selectedPosition || player.element_type === parseInt(selectedPosition)
    )
    .filter(
      (player) => {
        if (!selectedPrice) {
          return true; // Show all players if no price filter is selected
        } 
        const playerCost = parseFloat(player.now_cost); 
        return playerCost <= selectedPrice; 
      }
        
    );

  const renderTableRows = () => {
    return filteredFantasyData.map((player) => (
      <tr key={player.id}>
        <td>
          {player.first_name} {player.second_name}
        </td>
        <td>{teamMapping[player.team]}</td>
        <td>{positionMapping[player.element_type]}</td>
        <td>{player.form}</td>
        <td>£{player.now_cost}m</td>
        <td>{player.selected_by_percent}%</td>
        <td>{player.points_per_game}pts</td>
        <td>{player.total_points}pts</td>
        <td>{player.ict_index}</td>
        <td>{player.influence}</td>
        <td>{player.creativity}</td>
        <td>{player.threat}</td>
        <td>{player.transfers_in_event}</td>
        <td>{player.transfers_out_event}</td>
      </tr>
    ));
  };

  return (
    <div className="stats-container">
      <h1>Fantasy Premier League Statistics</h1>
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
            {Object.entries(positionMapping).map(([positionNumber, position]) => (
              <option key={positionNumber} value={positionNumber}>
                {position}
              </option>
            ))}

          </select>
        </div>
        <div className="filter">
          <label htmlFor="priceFilter">Price</label>
          <select
            id="priceFilter"
            onChange={(e) => setSelectedPrice(e.target.value)}
            value={selectedPrice}
          >
            <option value="">Unlimited</option>
            <option value="10.0">£10.0m</option>
            <option value="9.5">£9.5m</option>
            <option value="9.0">£9.0m</option>
            <option value="8.5">£8.5m</option>
            <option value="8.0">£8.0m</option>
            <option value="7.5">£7.5m</option>
            <option value="7.0">£7.0m</option>
            <option value="6.5">£6.5m</option>
            <option value="6.0">£6.0m</option>
            <option value="5.5">£5.5m</option>
            <option value="5.0">£5.0m</option>
            <option value="4.5">£4.5m</option>
            <option value="4.0">£4.0m</option>
          </select>
        </div>
      </div>

      <table className="stats-table">
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Team</th>
            <th>Position</th>
            <th>Form {<FaSort onClick={() => handleSort("form")} />}</th>
            <th>
              Current Price {<FaSort onClick={() => handleSort("now_cost")} />}
            </th>
            <th>
              Selected Percentage{" "}
              {<FaSort onClick={() => handleSort("selected_by_percent")} />}
            </th>
            <th>
              Points Per Game{" "}
              {<FaSort onClick={() => handleSort("points_per_game")} />}
            </th>
            <th>
              Total Points{" "}
              {<FaSort onClick={() => handleSort("total_points")} />}
            </th>
            <th>ICT {<FaSort onClick={() => handleSort("ict_index")} />}</th>
            <th>
              Influence {<FaSort onClick={() => handleSort("influence")} />}
            </th>
            <th>
              Creativity {<FaSort onClick={() => handleSort("creativity")} />}
            </th>
            <th>Threat {<FaSort onClick={() => handleSort("threat")} />}</th>
            <th>
              GW Transfers In{" "}
              {<FaSort onClick={() => handleSort("transfers_in_event")} />}
            </th>
            <th>
              GW Transfers Out{" "}
              {<FaSort onClick={() => handleSort("transfers_out_event")} />}
            </th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
}

export default Fantasy;
