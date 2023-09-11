import React from 'react';
import {Route, Routes} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import Standings from './Pages/standings';
import Fantasy from './Pages/fantasy';
import Scores from './Pages/Scores';
import Home from './Pages/home';
import SignInOptionsPage from './Pages/SignInOptionsPage';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import Stats from './Pages/stats';
import Profile from './Pages/profile';
import Favourite from './Pages/favourite';

function App() {
    return (
<Routes>
        <Route path='/' > 
        <Route index element={<Home />} />
        <Route path="Pages/scores" element={<Scores />} />
        <Route path="Pages/standings" element={<Standings />} />
        <Route path="Pages/stats" element={<Stats />} />
        <Route path="Pages/fantasy" element={<Fantasy />} />
        <Route path="Pages/favourite" element={<Favourite />} />
        <Route path="sign-in-options" element={<SignInOptionsPage />} />
        <Route path="Pages/signin" element={<SignInPage />} />
        <Route path="Pages/signup" element={<SignUpPage />} />
        <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>



    );
}
export default App; 
