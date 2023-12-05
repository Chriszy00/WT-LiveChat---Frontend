import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import Login from './component/Login';
import Register from './component/Register';
import Home from './component/Home';
import Chat from './component/Chat';

// NavigationLink component with dynamic styling
function NavigationLink({ to, label }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <div className={`p-2 my-auto ${isActive ? 'fw-bold' : ''}`}>
      <Link to={to} className="text-decoration-none text-white">
        {label}
      </Link>
    </div>
  );
}

const Logout = () => {
  //Logout
  localStorage.removeItem('ID');
  localStorage.removeItem('ACCESS_TOKEN');
  window.location.href = '/login'; 
};

// Main App component
function App() {

  const loggedOutNav = useRef(null);
  const loggedInNav = useRef(null);

  useEffect(() => {
    // Check if user data is stored in localStorage
    const loggedUser = localStorage.getItem('ID');
  
    if (loggedInNav.current && loggedOutNav.current) {
      if (loggedUser) {
        loggedInNav.current.style.display = 'block';
        loggedOutNav.current.style.display = 'none';
      } else {
        // User does not exist
        loggedInNav.current.style.display = 'none';
        loggedOutNav.current.style.display = 'block';
      }
    }
  }, [loggedInNav, loggedOutNav]);

  return (
    <Router>
      <div className="text-center text-white px-5 sticky-top loggedIn" style={{ display: 'none', backgroundColor: '#242526', borderBottom: '1px solid #3F4041' }} ref={loggedInNav}>
        <div className="App">
          <div className="d-flex">
            <div className="me-auto p-2"><h3>LiveChat</h3></div>
            <NavigationLink to="/home" label="Home" />
            <NavigationLink to="/chat" label="Chat" />
            <NavigationLink to="/call" label="Call" />
            <NavigationLink to="/logout" label="Logout"/>
          </div>
        </div>
      </div>

      <div className="text-center text-white px-5 sticky-top loggedOut" id='loggedOut' style={{ backgroundColor: '#242526', borderBottom: '1px solid #3F4041'  }} ref={loggedOutNav}>
        <div className="App">
          <div className="d-flex">
            <div className="me-auto p-2"><h3>LiveChat</h3></div>
            <NavigationLink to="/login" label="Sign In" />
            <NavigationLink to="/register" label="Sign Up" />
          </div>
        </div>
      </div>

      <Routes>
        {/* Define your routes here */}
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/logout" element={<Logout/>}/>
      </Routes>
    </Router>
  );
}

export default App;
