import React, { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import './LoginPage.scss';
function LoginPage() {

    return (
        <div className="loginClass">
            <LoginForm />
        </div>
    );
}

export default LoginPage;