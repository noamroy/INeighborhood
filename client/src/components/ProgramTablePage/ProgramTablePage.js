import React, { useState } from "react";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import ProgramTable from "../ProgramTable/ProgramTable";
import './ProgramTablePage.scss'

function ProgramTablePage() {
    const [userName, setUserName] = React.useState(localStorage.getItem('name'));
    const [token, setToken] = React.useState(localStorage.getItem('token'));
    const [group, setGroup] = React.useState(localStorage.getItem('group'));

    React.useEffect(() => {
    }, []);
    return (
        <React.Fragment>
            <Header pageName="Programs" />
            <Navbar className="navbarClass" selectedPage="programs" />
            <main className="mainClass">
                <div className="programTableClassPage">
                    <ProgramTable />
                </div>
            </main>
        </React.Fragment>
    );
}

export default ProgramTablePage;