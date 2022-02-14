import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../components/LoginPage/LoginPage'
import RegisterPage from '../components/RegisterPage/RegisterPage';
import Dashbord from '../components/Dashboard/Dashboard';
import SystemFormPage from '../components/SystemFormPage/SystemFormPage';
import LoginForm from "../components/LoginForm/LoginForm";
const ReactRouter = () => {
    return (
        <React.Fragment>
            <Routes>
                <Route exact path="/" element={<LoginForm />} />
                <Route exact path="/register" element={<RegisterPage />} />
                <Route exact path="/dashboard" element={<Dashbord />} />
                <Route path="/addsystem" element={<SystemFormPage />} />
            </Routes>
        </React.Fragment>
    )
}
export default ReactRouter;