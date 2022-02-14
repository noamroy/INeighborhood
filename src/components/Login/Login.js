//IMPORTS
import React, { Component } from 'react';
import constants from '../../static/constants';
//CSS
import './Login.scss';
//GLOBAL VARS
class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
    }
    async handleSubmit(event) {
        event.preventDefault();
        const formName = document.getElementById("name").value;
        const formPassword = document.getElementById("password").value;
        const info= {"name": formName, "password": formPassword};
        const loginResponse = await fetch(`${constants.hostNoam}user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(info)
        });
        const loginResponseJson = await loginResponse.json();
        console.log(JSON.stringify(loginResponseJson));
        if (loginResponseJson.status!=200){
            alert("Wrong name or password please try again");
        } else {
            localStorage.setItem('name', loginResponseJson.name);
            localStorage.setItem('token', loginResponseJson.token);
            localStorage.setItem('group', loginResponseJson.group);
            alert("SUCCESS LOGIN");
            this.props.onSuccess("dashboard");
        }
    }
    render() {
        return (
            <div className="Login">
              <form>
                <label>Name</label>
                <input type="text" name="name" id="name"></input>
                <label>Password</label>    
                <input type="password" name="password" id="password"></input>
                <button type="submit" onClick={this.handleSubmit}>
                  Login
                </button>
              </form>
            </div>
          );
    }
}

export default Login;