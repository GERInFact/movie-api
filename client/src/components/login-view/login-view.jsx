import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("https://my-flix-gerinfact.herokuapp.com/login", {
        username: username,
        password: password
      })
      .then(res => {
        const data = res.data;
        console.log(data);
        props.onLoggedIn(data);
      })
      .catch(err => console.log(err.message));
  };

  return (
    <Form>
      <Form.Group controlId="formBasicUser">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button
        className="submit"
        variant="primary"
        type="button"
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Form>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};
