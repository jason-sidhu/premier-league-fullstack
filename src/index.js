import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
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
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if(process.env.NODE_ENV === 'production') {disableReactDevTools()};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Chorasmian&family=Poppins:wght@100&display=swap" rel="stylesheet"/>
    </Helmet>
  <header>
    <BSNavbar/>
  </header>
    <Router>
      <Routes>
        <Route path='https://eplhub.onrender.com' element={<Home/>} />
        <Route path="https://eplhub.onrender.com/Pages/scores" element={<Scores />} />
        <Route path="https://eplhub.onrender.com/Pages/standings" element={<Standings />} />
        <Route path="https://eplhub.onrender.com/Pages/stats" element={<Stats />} />
        <Route path="https://eplhub.onrender.com/Pages/fantasy" element={<Fantasy />} />
        <Route path="https://eplhub.onrender.com/Pages/favourite" element={<Favourite />} />
        <Route path="https://eplhub.onrender.com/sign-in-options" element={<SignInOptionsPage />} />
        <Route path="https://eplhub.onrender.com/Pages/signin" element={<SignInPage/>} />
        <Route path="https://eplhub.onrender.com/Pages/signup" element={<SignUpPage />} />
        <Route path="https://eplhub.onrender.com/profile" element={<Profile/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
