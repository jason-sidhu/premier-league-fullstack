import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Standings from './Pages/standings';
import Fantasy from './Pages/fantasy';
import Scores from './Pages/Scores';
import Home from './Pages/home';
import BSNavbar from './Components/Navbar/Navbar';
import SignInOptionsPage from './Pages/SignInOptionsPage';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import Stats from './Pages/stats';
import Profile from './Pages/profile';
import Favourite from './Pages/favourite';

ReactDOM.render(
  <React.StrictMode>
  <header>
    <BSNavbar/>
  </header>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/Pages/scores" element={<Scores />} />
        <Route path="Pages/standings" element={<Standings />} />
        <Route path="Pages/stats" element={<Stats />} />
        <Route path="Pages/fantasy" element={<Fantasy />} />
        <Route path="Pages/favourite" element={<Favourite />} />
        <Route path="sign-in-options" element={<SignInOptionsPage />} />
        <Route path="Pages/signin" element={<SignInPage />} />
        <Route path="Pages/signup" element={<SignUpPage />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
