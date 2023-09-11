import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import App from './App';
import BSNavbar from './Components/Navbar/Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <header>
        <BSNavbar />
      </header>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
