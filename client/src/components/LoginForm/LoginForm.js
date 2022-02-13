//IMPORTS
import React, { useState } from "react";
//CSS
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./LoginForm.scss";
//GLOBAL DEFINITIONS
import host from "../configuration";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return name.length > 2 && password.length > 2;
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
    const info= {"name": name, "password": password};
    //console.log(JSON.stringify(info));
    const loginResponse = await fetch(`${host}user/login`, {
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
        alert("SUCCESS LOGIN");
        //MISHA GO TO HOMEPAGE WITH SEND: loginResponseJson.name, loginResponseJson.token, loginResponseJson.group
    }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}