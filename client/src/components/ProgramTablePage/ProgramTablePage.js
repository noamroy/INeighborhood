import React, { useState } from "react";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import ProgramTable from "../ProgramTable/ProgramTable";

function ProgramTablePage() {
    const [mapLocation, setMapLocation] = React.useState("shenkar%20College");
    const [userName, setUserName] = React.useState(localStorage.getItem('name'));
    const [token, setToken] = React.useState(localStorage.getItem('token'));
    const [group, setGroup] = React.useState(localStorage.getItem('group'));

    React.useEffect(() => {
        console.log(userName)
        console.log(token)
        console.log(group)
    }, []);
    return (
        <React.Fragment>
            <Header pageName="Programs" />
            <Navbar className="navbarClass" selectedPage="programs" />
            <main className="mainClass">
                <ProgramTable />
            </main>
        </React.Fragment>
    );
}

export default ProgramTablePage;