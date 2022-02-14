import React, { useState } from "react";
import GoogleMap from "../GoogleMap/GoogleMap";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import SystemTable from "../SystemTable/SystemTable";

function Dashbord() {
    const [mapLocation, setMapLocation] = React.useState("shenkar%20College");
    const [userName, setUserName] = React.useState(localStorage.getItem('name'));
    const [token, setToken] = React.useState(localStorage.getItem('token'));
    const [group, setGroup] = React.useState(localStorage.getItem('group'));

    React.useEffect(() => {
        console.log(userName)
        console.log(token)
        console.log(group)
        if(!token){
            alert("Unauthorized");
            window.location.href = '/';
        }
    }, []);
    React.useEffect(() => {
        console.log("Map Location change sadas")
    }, [mapLocation]);


    function handleMapChange(newValue) {
        console.log("Updated Father location");
        setMapLocation(newValue);
    }

    return (
        <main>
            <Header />
            <Navbar />
            <SystemTable onMapLocationChange={handleMapChange} />
            <GoogleMap location={mapLocation} />
        </main>
    );
}

export default Dashbord;