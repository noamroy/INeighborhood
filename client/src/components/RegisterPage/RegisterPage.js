import React, { useState } from "react";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import RegisterForm from "../RegisterForm/RegisterForm";

function RegisterPage() {

    return (
        <React.Fragment>
            <Header pageName="Register" />
            <Navbar className="navbarClass" selectedPage="register" />
            <main className="mainClass">
                <RegisterForm />
            </main>
        </React.Fragment>

    );
}

export default RegisterPage;