import React, { useState } from "react";
import GoogleMap from "../GoogleMap/GoogleMap";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import SystemTable from "../SystemTable/SystemTable";
import './Dashboard.scss'

function Dashbord() {
    const [mapLocation, setMapLocation] = React.useState("shenkar%20College");
    const [userName, setUserName] = React.useState(localStorage.getItem('name'));
    const [token, setToken] = React.useState(localStorage.getItem('token'));
    const [group, setGroup] = React.useState(localStorage.getItem('group'));

    React.useEffect(() => {
        console.log(userName)
        console.log(token)
        console.log(group)
    }, []);
    React.useEffect(() => {
        console.log("Map Location change sadas")
    }, [mapLocation]);


    function handleMapChange(newValue) {
        console.log("Updated Father location");
        setMapLocation(newValue);
    }

    return (
        <React.Fragment>
            <Header pageName="dashboard" />
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