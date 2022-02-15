import React, { useState } from "react";
import SystemForm from "../SystemForm/SystemForm";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
function SystemFormPage() {

    return (
        <React.Fragment>
            <Header pageName="System info" />
            <Navbar className="navbarClass" selectedPage="addsystem" />
            <main className="mainClass">
                <SystemForm />
            </main>
        </React.Fragment>
    );
}

export default SystemFormPage;