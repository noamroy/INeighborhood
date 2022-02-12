import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import SystemTable from "../SystemTable/SystemTable";

function Dashbord() {
    return (
        <main>
            <Navbar/>
            <SystemTable/>
        </main>
    );
}

export default Dashbord;