import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import useFormValues from "../../hooks/useFormValues";
import Input from "../shared/input";

import auth from "../../auth";

import api from "../../apis/backend";

const defaultFormState = {
  uvid: "",
  password: ""
};

const LoginForm = props => {
  const [formState, handleChange, clearState] = useFormValues(defaultFormState);
  const [loginFailed, setLoginFailed] = useState("");

  const { setLoggedIn } = props;

  const handleSubmit = e => {
    e.preventDefault();

    api
      .post("/auth/login", formState)
      .then(response => {
        if (response.data.err) {
          setLoginFailed(response.data.errMsg);
        } else {
          auth.login(response.data.token, () => {
            setLoginFailed("");
            setLoggedIn(auth.isAuthenticated());
            props.history.push("/");
          });
        }
      })
      .catch(err => {
        console.log(err);
      });

    clearState(defaultFormState);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Col>
            <Input
              id="uvid"
              label="UVID"
              placeholder="Enter your UVID."
              type="text"
              state={formState}
              handleChange={handleChange}
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Input
              id="password"
              label="Password"
              placeholder="Enter your password."
              type="password"
              state={formState}
              handleChange={handleChange}
            />
          </Col>
        </Form.Row>
        {loginFailed}
        <Form.Row>
          <Form.Group>
            <Form.Label></Form.Label>
            <Form.Control type="submit" value="Login" />
          </Form.Group>
        </Form.Row>
      </Form>
    </Container>
  );
};

export default LoginForm;
