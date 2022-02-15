import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import './Navbar.scss';
function Navbar(props) {
    useEffect(() => {
        const idName= `li-${props.selectedPage}`;
        console.log(idName)
        document.getElementById(idName).className = "current";
    }, []);
    return (
        <div className="navbarClass">
            <ul>
                <li id="li-dashboard"><NavLink exact="true" to="/dashboard">Dashbord</NavLink></li>
                <li id="li-addsystem"><NavLink exact to="/addsystem" >Add System</NavLink></li>
                <li id="li-programs"><NavLink exact to="/programs" >Programs</NavLink></li>
                <li id="li-addprogram"><NavLink exact to="/addprogram" >Add Program</NavLink></li>
                <li id="li-users"><NavLink exact="true" to="/users">Users</NavLink></li>
                <li id="li-register"><NavLink exact="true" to="/register">Register User</NavLink></li>
                <li id="li-register"><NavLink exact="true" to="/">Sign Out</NavLink></li>
            </ul>
        </div>
    );
}

export default Navbar;