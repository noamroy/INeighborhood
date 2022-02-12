import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <div className="navigation">
            <NavLink exact="true" to="/">Login</NavLink>
            <NavLink exact="true" to="/register">Register</NavLink>
            <NavLink exact="true" to="/dashboard">Dashbord</NavLink>
        </div>
    );
}

export default Navbar;