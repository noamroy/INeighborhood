//IMPORTS
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//CSS
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./LoginForm.scss";
//GLOBAL DEFINITIONS
import constants from "../../static/constants";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      navigate(`/dashboard`);
    }
    else
      localStorage.clear();
  }, [redirect]);

  function validateForm() {
    return name.length > 2 && password.length > 2;
  }


  async function handleSubmit(event) {
    event.preventDefault();
    const info = { "name": name, "password": password };
    const loginResponse = await fetch(`${constants.hostNoam}user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(info)
    });
    const loginResponseJson = await loginResponse.json();
    if (loginResponseJson.status != 200) {
      alert("Wrong name or password please try again");
    } else {
      localStorage.setItem('name', loginResponseJson.name);
      localStorage.setItem('token', loginResponseJson.token);
      localStorage.setItem('group', loginResponseJson.group);
      alert("Login succesful");
      setRedirect(true);
    }
  }
    return (
      <div className="Login">
        <Form>
          <Form.Group  size="lg" controlId="name">
            <Form.Label className="labelClass">Name</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group  size="lg" controlId="password">
            <Form.Label className="labelClass">Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button className="loginBtn" block size="lg" type="submit" disabled={!validateForm()} onClick={handleSubmit}>
            Login
          </Button>
        </Form>
      </div>
    );

}