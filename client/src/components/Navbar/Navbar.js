import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import './Navbar.scss';
function Navbar() {
    return (
        <div className="navigation">
            <NavLink exact="true" to="/">Login</NavLink>
            <NavLink exact="true" to="/register">Register User</NavLink>
            <NavLink exact="true" to="/dashboard">Dashbord</NavLink>
            <NavLink exact to="/addsystem" >Add System</NavLink>
            <NavLink exact to="/programs" >Programs</NavLink>
            <NavLink exact to="/addprogram" >Add Program</NavLink>
        </div>
    );
}

export default Navbar;