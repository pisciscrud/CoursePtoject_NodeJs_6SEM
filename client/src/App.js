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
import PanelPage from "./pages/PanelPage/PanelPage";
import ScheduleTable from "./componets/ScheduleTable";

import NotificationPage from "./pages/NotificationPage/NotificationPage";
import SchedulePage from "./pages/SchedulePage/SchedulePage";


import ConfirmationPage from "./pages/ConfirmationPage/ConfirmationPage";

import StatisticAdminPage from './pages/StatisticAdminPage/StatisticAdminPage'


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
                              <Route path="schedule/:id" element={<SchedulePage/>}></Route>
                              <Route path="pets" element={<PetsList/>}></Route>
                              <Route path="notifications" element={<NotificationPage/>}></Route>
                          </Route>
                          <Route path="procedures" element={<ProcedurePage/>}></Route>
                          <Route path="reviews" element={<ReviewPage />}></Route>
                      </Route>
                      <Route path="admin" element={<AdminPage/>}>
                          <Route path="" element={<HomePage/>}></Route>
                          {/*<Route path="" element={<HomePage/>}></Route>*/}
                          <Route path="masters"element={<MasterPage/>}></Route>
                          <Route path="panel" element={<PanelPage/>}>
                               <Route path="schedule" element={<ScheduleTable/>}></Route>
                               <Route path="confirmation" element={<ConfirmationPage/>}></Route>
                              <Route path="statistics" element={<StatisticAdminPage/>}></Route>
                          </Route>
                          <Route path="procedures" element={<ProcedurePage/>}></Route>
                          <Route path="reviews" element={<ReviewPage />}></Route>
                      </Route>
                  </Routes>
              </Router>
          </>
      </LocalizationProvider>
  );

}







export default App;
