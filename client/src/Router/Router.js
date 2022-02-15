import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../components/LoginPage/LoginPage'
import RegisterPage from '../components/RegisterPage/RegisterPage';
import Dashbord from '../components/Dashboard/Dashboard';
import SystemFormPage from '../components/SystemFormPage/SystemFormPage';
import ProgramTable from '../components/ProgramTable/ProgramTable'
import ProgramFormPage from '../components/ProgramFormPage/ProgramFormPage'
const ReactRouter = () => {
    return (
        <React.Fragment>
            <Routes>
                <Route exact path="/" element={<LoginPage />} />
                <Route exact path="/register" element={<RegisterPage />} />
                <Route exact path="/dashboard" element={<Dashbord />} />
                <Route path="/addsystem" element={<SystemFormPage />} />
                <Route path="/programs" element={<ProgramTable />} />
                <Route path="/addprogram" element={<ProgramFormPage />} />
            </Routes>
        </React.Fragment>
    )
}
export default ReactRouter;