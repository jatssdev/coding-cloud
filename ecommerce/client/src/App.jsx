import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import './App.css'

export let mainContext = createContext()

const App = () => {
  let [loginUser, setLoginUser] = useState(null)
  let navigate = useNavigate()
  const appStyle = {
    backgroundColor: '#121212',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  };

  let getUserData = (user) => {
    setLoginUser(user)
  }



  let contextValues = {
    navigate
    ,
    loginUser,
    getUserData
  }
  return (
    <mainContext.Provider value={contextValues}>
      <div style={appStyle}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </mainContext.Provider>
  );
};

export default App;