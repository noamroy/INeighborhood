import React from "react";
import ProgramForm from "../ProgramForm/ProgramForm";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
function ProgramFormPage() {
    const [userName, setUserName] = React.useState(localStorage.getItem('name'));
    const [token, setToken] = React.useState(localStorage.getItem('token'));
    const [group, setGroup] = React.useState(localStorage.getItem('group'));
    const navigate = useNavigate();

        
    React.useEffect(() => {
        if ((!userName) || (!token) || isNaN(group)){
            localStorage.clear();
            navigate(`/`);
        }
    }, []);

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