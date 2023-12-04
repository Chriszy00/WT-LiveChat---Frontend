import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import Login from './component/Login';
import Register from './component/Register';
import Home from './component/Home';

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


// Main App component
function App() {
  return (
    <Router>
      <div className="text-center text-white px-5 sticky-top loggedIn" style={{ display: 'block', backgroundColor: '#242526', borderBottom: '1px solid #3F4041' }}>
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

      <div className="text-center text-white px-5 sticky-top loggedOut" id='loggedOut' style={{ display: 'none', backgroundColor: '#242526', borderBottom: '1px solid #3F4041'  }}>
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
      </Routes>
    </Router>
  );
}

export default App;
