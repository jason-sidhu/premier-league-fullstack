// Front-End: src/components/FavoritePage.js

import React, { useState, useEffect } from 'react';


function Favourite() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(2023); // State to store selected season
  const [error, setError] = useState(null);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    favoriteTeam: "",
  });

  useEffect(() => {
    // Fetch user data from the backend when the component mounts
    fetchUserData();
  }, []);

  useEffect(() => {
    const cachedStandings = localStorage.getItem(`standings-${selectedSeason}`);
    //if data cached and not most recent season, use cached data 
    if (cachedStandings && (selectedSeason !== 2023)) {
      setStandings(JSON.parse(cachedStandings));
      setLoading(false);
    } else {
      fetchStandings(selectedSeason);
    }
  }, [selectedSeason]);

  const fetchStandings = async (season) => {
    try {
      const response = await fetch(`http://localhost:8800/api/standings?season=${season}`);
      if(!response.ok){
        if(response.status === 500) {
          throw new Error("Too many Requests :( please wait a minute before refreshing to make a new request")
        }
      }
      const data = await response.text(); // Log the raw JSON string
      const parsedData = JSON.parse(data);
      

      setStandings(parsedData);
      setLoading(false);
      //cache data
      localStorage.setItem(`standings-${season}`, JSON.stringify(parsedData));
    } catch (error) {
      console.error("Error fetching standings:", error.message);
      setLoading(false);
      setError(error.message);
    }
  };


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
        // Handle unauthorized or other errors
        // Redirect to the sign-in page or show an error message
        window.location.href = "/sign-in-options";
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };



  return (
    <div>
      <h1>{userData.team}</h1>
    </div>
  );
}

export default Favourite;
