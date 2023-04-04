import React , {useEffect,useState} from 'react'

import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import HomePage from "./pages/HomePage/HomePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import MasterPage from "./pages/MasterPage/MasterPage";
import ProcedurePage from "./pages/ProcedurePage/ProcedurePage";
function App() {


  return (
      <div>
        <Router>
            <Routes>
              <Route path="/" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/admin" element={<AdminPage/>}/>
                <Route path="/masters"element={<MasterPage/>}></Route>
                <Route path="/procedures"element={<ProcedurePage/>}></Route>
                </Routes>
        </Router>
      </div>
  );

}







export default App;
