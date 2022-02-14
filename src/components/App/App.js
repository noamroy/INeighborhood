import React, { Component } from 'react';

import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';

import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Page : "login"
        }
        this.changePage = this.changePage.bind(this);
    }
    componentDidMount() {
    }
    changePage(mode) {
        if (mode!=this.state.Page){
            console.log(`change page to: ${mode}`);   //DEBUG
            this.setState(prevState => ({
                Page: mode,
            }))
        }

    }
    render() {
        if (this.state.Page=="login"){
            return(
                <Login onSuccess={this.changePage}></Login>
            )
        } else {
            return(
                <Dashboard onLogout={this.changePage}></Dashboard>
            )
        }
    }
}

export default App;