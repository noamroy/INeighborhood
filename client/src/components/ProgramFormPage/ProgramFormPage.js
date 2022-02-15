import React from "react";
import ProgramForm from "../ProgramForm/ProgramForm";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
function ProgramFormPage() {

    return (
        <React.Fragment>
            <Header pageName="Program Info" />
            <Navbar className="navbarClass" selectedPage="addprogram" />
            <main className="mainClass">
                <ProgramForm />
            </main>
        </React.Fragment>

    );
}

export default ProgramFormPage;