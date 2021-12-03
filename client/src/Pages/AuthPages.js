import { Form } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useContext, useState } from "react";
import path from "path";

function Register() {
  const [formState, setFormState] = useState({
    selectAns: 0,
  });
  const [validated, setValidated] = useState(false);
  const [registerMessage, setRegisterMessage] = useState(null);

  const route = "/register";

  const registerIntoAPI = async (form) => {
    setRegisterMessage(null);
    const data = new URLSearchParams(new FormData(form));
    const res = await fetch(route, {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (res.status == 200) {
      window.location = "/";
    } else {
      const message = await res.text();
      setRegisterMessage(message);
    }
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      registerIntoAPI(form);
    }
    event.preventDefault();
    setValidated(true);
  };

  const handleUsernameChange = (e) => {
    if (e.currentTarget.value.includes(" ")) {
      e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
    }
  };

  return (
    <Container>
      <div className="auth-form-container mt-5">
        <h2>Register to Tutorial Bundler</h2>
        <Form
          validated={validated}
          onSubmit={handleSubmit}
          method="POST"
          action={route}
          noValidate
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email address.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="Enter username"
              onChange={handleUsernameChange.bind(this)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a non empty username.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a non-empty password.
            </Form.Control.Feedback>
          </Form.Group>
          {registerMessage && (
            <p className="mt-2 text-danger">{registerMessage}</p>
          )}
          <p className="lead mt-2">
            Already have an account? <a href="/signin">Sign In</a>
          </p>
          <Button variant="primary" type="submit" className="mt-2">
            Sign Up
          </Button>
        </Form>
      </div>
    </Container>
  );
}

function SignIn(props) {
  const [validated, setValidated] = useState(false);

  const [signInFailure, setSignInFailure] = useState(false);

  const route = "/signin";
  const signInIntoAPI = async (form) => {
    setSignInFailure(false);
    const data = new URLSearchParams(new FormData(form));
    const res = await fetch(route, {
      method: "POST",
      body: data,
      credentials: "include",
      withCredentials: true,
    });
    if (res.status == 200) {
      window.location = "/";
    } else {
      setSignInFailure(true);
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      signInIntoAPI(form);
    }
    event.preventDefault();

    setValidated(true);
  };

  const handleUsernameChange = (e) => {
    if (e.currentTarget.value.includes(" ")) {
      e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
    }
  };
  return (
    <Container>
      <div className="auth-form-container mt-5">
        <h2>Sign in to Tutorial Bundler</h2>
        <Form validated={validated} noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="Enter username"
              onChange={handleUsernameChange.bind(this)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a non empty username.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a non-empty password.
            </Form.Control.Feedback>
          </Form.Group>
          {signInFailure && (
            <p className="mt-2 text-danger">Incorrect Username or Password</p>
          )}
          <p className="lead">
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
          <Button variant="primary" type="submit" className="mt-2">
            Sign In
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export { Register, SignIn };
