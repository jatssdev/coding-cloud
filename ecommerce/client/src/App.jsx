import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import './App.css'
import AddProduct from './components/admin/AddProduct';

export let mainContext = createContext()

const App = () => {
  let [loginUser, setLoginUser] = useState(null)
  let navigate = useNavigate()
  const appStyle = {
    // backgroundColor: '#121212',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  };

  let getUserData = () => {
    let localUser = JSON.parse(localStorage.getItem('user'))
    setLoginUser(localUser)
  }



  let logoutHandler = () => {
    localStorage.removeItem('user')
    getUserData()

  }
  useEffect(() => {
    getUserData()
  }, [])


  let contextValues = {
    navigate
    ,
    loginUser,
    getUserData,
    logoutHandler
  }
  return (
    <mainContext.Provider value={contextValues}>
      <div style={appStyle}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/product/add" element={<AddProduct />} />
        </Routes>
      </div>
    </mainContext.Provider>
  );
};

export default App;