import React , {useEffect,useState} from 'react'

import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import HomePage from "./pages/HomePage/HomePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import MasterPage from "./pages/MasterPage/MasterPage";
import ProcedurePage from "./pages/ProcedurePage/ProcedurePage";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ScheduleList from "./pages/ScheduleList/ScheduleList";
import MainPage from "./pages/MainPage/MainPage";
import ReviewPage from "./pages/ReviewPage/ReviewPage";
import PetsList from "./componets/PetsList";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");
function App() {

  return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
          <>
              <Router>
                  <Routes>
                      <Route index element={<RegisterPage/>}/>
                      <Route path="login" element={<LoginPage/>}/>
                      <Route path="app" element={<MainPage/>}>
                          <Route path="" element={<HomePage/>}></Route>
                          <Route path="masters"element={<MasterPage/>}></Route>
                          <Route path="profile" element={<ProfilePage/>}>
                              <Route path="schedule" element={<ScheduleList/>}></Route>
                              <Route path="pets" element={<PetsList/>}></Route>
                          </Route>
                          <Route path="procedures" element={<ProcedurePage/>}></Route>
                          <Route path="reviews" element={<ReviewPage />}></Route>
                      </Route>
                      <Route path="admin" element={<AdminPage/>}/>
                  </Routes>
              </Router>
          </>
      </LocalizationProvider>
  );

}







export default App;
