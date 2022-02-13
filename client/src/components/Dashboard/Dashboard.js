import React, { useState } from "react";
import GoogleMap from "../GoogleMap/GoogleMap";
import Navbar from "../Navbar/Navbar";
import SystemTable from "../SystemTable/SystemTable";

function Dashbord() {
    const [mapLocation, setMapLocation] = React.useState("shenkar%20College");

    React.useEffect(() => {
        
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
            <SystemTable onMapLocationChange={handleMapChange} />
            <GoogleMap location={mapLocation} />
        </main>
    );
}

export default Dashbord;