import React, { useState } from "react";
import GoogleMap from "../GoogleMap/GoogleMap";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import SystemTable from "../SystemTable/SystemTable";
import { useNavigate } from "react-router-dom";
//CSS
import './Dashboard.scss'

function Dashbord() {
    const [mapLocation, setMapLocation] = React.useState("shenkar%20College");
    const [userName, setUserName] = React.useState(localStorage.getItem('name'));
    const [token, setToken] = React.useState(localStorage.getItem('token'));
    const [group, setGroup] = React.useState(localStorage.getItem('group'));
    const navigate = useNavigate();


        
    React.useEffect(() => {
        if ((!userName) || (!token) || isNaN(group)){
            localStorage.clear();
            navigate(`/`);
        }
    }, []);
    React.useEffect(() => {
    }, [mapLocation]);


    function handleMapChange(newValue) {
        setMapLocation(newValue);
    }

    return (
        <React.Fragment>
            <Header pageName="Dashboard" />
            <Navbar className="navbarClass" selectedPage="dashboard" />
            <main className="mainClass">
                <div className="systemTableClass">
                    <SystemTable onMapLocationChange={handleMapChange} />
                </div>
                <div className="googleMapClass">
                    <GoogleMap location={mapLocation} />
                </div>
            </main>
        </React.Fragment>
    );
}

export default Dashbord;