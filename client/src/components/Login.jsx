import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Login() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="login-form">
      <h4 style={{ marginTop: "2rem" }}> Login to play</h4>
      <Form className="d-flex flex-grow-2 flex-wrap">
        <Form>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            style={{ marginTop: "2rem" }}
          >
            <Form.Control
              type="email"
              placeholder="Enter your E-Mail"
              style={{ padding: "10px 90px 10px 0" }}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              style={{ padding: "10px 90px 10px 0" }}
            />
          </Form.Group>
          <Button
            variant="success my-2 align-self-center"
            style={{
              backgroundColor: "#e7bd40",
              color: "white",
              borderColor: "black",
              fontSize: "17px",
              padding: "10px 50px",
            }}
          >
            Login
          </Button>
          <div>
            Not a member?{" "}
            <p
              onClick={handleShow}
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "17px",
              }}
            >
              Sign Up
            </p>
          </div>
        </Form>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign up to play</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>E-Mail Address</Form.Label>
              <Form.Control type="email" placeholder="Enter your E-Mail" />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter a password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleClose}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
