import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

class Header extends Component {
    render(){

        return(
            <Router>
                
                {/* Nav for logged In */}
      
                <div className="bg-black text-center text-white px-5 sticky-top loggedIn" style={{ display: 'none' }}>
                    <div className="App">
                        <div className="d-flex">
                        <div className="me-auto p-2"><h3>LiveChat</h3></div>
                        <div className="p-2 my-auto"><Link to="/" className="text-decoration-none text-white">Chat</Link></div>
                        <div className="p-2 my-auto"><Link to="/register" className="text-decoration-none text-white">Call</Link></div>
                        <div className="p-2 my-auto"><Link to="/login" className="text-decoration-none text-white">Logout</Link></div>
                        </div>
                    </div>
                </div>
      
        <div className="bg-black text-center text-white px-5 sticky-top loggedOut" id='loggedOut'>
          <div className="App">
            <div className="d-flex">
              <div className="me-auto p-2"><h3>LiveChat</h3></div>
              <div className="p-2 my-auto"><Link to="/contact" className="text-decoration-none text-white">Sign In</Link></div>
              <div className="p-2 my-auto"><Link to="/terms" className="text-decoration-none text-white">Sign Up</Link></div>
            </div>
          </div>
        </div>
      

        <Routes>
          {/* <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/terms" element={<Terms/>}/> */}
        
        </Routes>
        
    </Router>
        )
    }
}
export default Header;