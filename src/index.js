import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import BSNavbar from './Components/Navbar/Navbar';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <header>
    <BSNavbar/>
  </header>
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<App/>} />
    </Routes>
  </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);
 
