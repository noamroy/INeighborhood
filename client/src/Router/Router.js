import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../components/LoginPage/LoginPage'
import RegisterPage from '../components/RegisterPage/RegisterPage';
import Navbar from '../components/Navbar/Navbar';
import Dashbord from '../components/Dashboard/Dashboard';
import SystemFormPage from '../components/SystemFormPage/SystemFormPage';
const ReactRouter = () => {
    return (
        <React.Fragment>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<LoginPage />} />
                <Route exact path="/register" element={<RegisterPage />} />
                <Route exact path="/dashboard" element={<Dashbord />} />
                <Route exact path="/addsystem" element={<SystemFormPage />} />
            </Routes>
        </React.Fragment>
    )
}
export default ReactRouter;