//IMPORTS
import React, { useState } from "react";
//CSS
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './RegisterForm.scss'
//GLOBAL DEFINITIONS
import constants from "../../static/constants";

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [group, setGroup] = useState(0);

  function validateForm() {
    return name.length >= 3 && password.length >= 4;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const info = { "name": name, "password": password, "group": group };

    const registerResponse = await fetch(`${constants.hostNoam}user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(info)
    });
    const registerResponseJson = await registerResponse.json();
    console.log(JSON.stringify(registerResponseJson));
    if (registerResponseJson.status != 200) {
      alert(registerResponseJson.msg);
    } else {
      alert("Register success");
      window.location.href = '/dashboard';
    }
  }
  return (
    <div className="Register">
      <Form >
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
        <Form.Group size="lg" controlId="group">
          <Form.Label>Group</Form.Label>
          <Form.Control
            type="number"
            min="0"
            max="5"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" onClick={handleSubmit} disabled={!validateForm()}>
          Register
        </Button>
      </Form>
    </div>
  );
}
