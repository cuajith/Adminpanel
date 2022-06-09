import React, { useState } from "react";
import Login from "./Components/auth/Login";
import Registration from "./Components/auth/Register";
import { Route, Routes } from "react-router-dom";
import City from "./Components/location/City";
import Country from "./Components/location/Country";
import State from "./Components/location/State";
import Home from "./Components/views/Home";
import Sidebar from "./Components/Sidebar/Sidebar";
import Resetpassword from "./Components/auth/Resetpassword";
import Createpassword from './Components/auth/Createpassword';

function App() {
  return (
    <>
      <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/signup" element={<Registration />} />
            <Route exact path="/otp" element={<Resetpassword />} /> 
            <Route exact path='/createpassword' element={<Createpassword />} />
            <Route exact path='/sidebar' element={<Sidebar />} />
            <Route exact path="/dashboard" element={<Home />} />
            <Route exact path="/country" element={<Country />} />
            <Route exact path="/state" element={<State />} />
            <Route exact path="/city" element={<City />} />
      </Routes>
    </>
  );
}

export default App;
