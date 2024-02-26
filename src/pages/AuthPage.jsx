import { Col, Image, Row, Button, Modal, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useLocalStorage from "use-local-storage";


export default function AuthPage() {
  const loginImage = "https://sig1.co/img-twitter-1";
  const url = "https://ea3a886b-753f-4f5b-bb5d-0b40ce9f66a0-00-i5imkoqjnr4s.worf.replit.dev";

  const [modalShow, setModalShow] = useState(null);
  const handleShowSignUp = () => setModalShow("SignUp")
  const handleShowLogin = () => setModalShow("Login")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [authToken, setAuthToken] = useLocalStorage("authToken", "");

// asdsd

  //for sign up
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.post(`${url}/signup`, { username, password });

      if (res.data && res.data.auth === true && res.data.token) {
        setAuthToken(res.data.token);
        console.log("log was successful, token saved");
      }

    } catch (error) {
      if (error.response) {
        setError(`Server responded with ${error.response.status} status`);
      } else if (error.request) {
        setError("No response received from the server");
      } else {
        setError("Error setting up the request");
      }
    }
  };


  //for login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/login`, { username, password });
      if (res.data && res.data.auth === true && res.data.token) {
        setAuthToken(res.data.token);
        console.log("log was successful, token saved");
      }
    } catch (error) {
      console.error(error)

      setError("Your username or password is invalid, Please try again.");
    }
  };

  const handleClose = () => setModalShow(null);

  return (
    <Row>
      <Col sm={6}>
        <Image src={loginImage} fluid />
      </Col>
      {/* p is padding */}
      <Col sm={6} className="p-4">
        <i className="bi bi-twitter" style={{ fontSize: 50, color: "dodgerblue" }}
        ></i>
        <p className="mt-5" style={{ fontSize: 64 }}>Happening Now</p>

        <h2 className="mt-5" style={{ fontSize: 31 }}>Join Twitter today.</h2>

        <Col sm={5} className="d-grid gap-2">
          <Button className="rounded-pill" variant="outline-dark">
            <i className="bi bi-google"> Sign Up with Google</i>
          </Button>
          <Button className="rounded-pill" variant="outline-dark">
            <i className="bi bi-apple"> Sign Up with Apple</i>
          </Button>
          <p style={{ textAlign: "center" }}>or</p>

          {/* Create an account */}
          <Button
            className="rounded-pill"
            onClick={handleShowSignUp}
          >Create an account
          </Button>

          <p style={{ fontSize: "12px" }}>By signing up, you agree to the Term of Service and Privacy Policy including Cookie Use.</p>
          <p className="mt-5" style={{ fontWeight: "bold" }}>
            Already have an account?
          </p>
          {/* Sign In */}
          <Button
            className="rounded-pill"
            onClick={handleShowLogin}
            variant="outline-primary">
            {modalShow === "SignUp" ? "Create your account" : "Sign in"}
          </Button>
          <p style={{ fontSize: "12px" }}> Agree to terms</p>
          <p className="mt-5" style={{ fontSize: 64 }}> Happening Now</p>


          <Modal
            is
            show={modalShow !== null}
            onHide={handleClose}
            animation={false}
            centered
          >
            {/* px is padding on x-axis */}
            <Modal.Body>
              {/* conditional rendering 'create your account or login' */}
              <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                {/* Create your account */}
                {modalShow === "SignUp" ? "Create your account" : "Sign in"}
              </h2>

              {/*if signUp run the handleSignUp function, if login run the handleLogin function */}
              <Form className="d-grid- gap-2" onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" />
                </Form.Group>
                <p style={{ fontSize: "12px" }}>
                  By signing up, you agree to the Term of Service and Privacy Policy, including Cookie Use, SigmaTweets may use your contact information, including your email address and phone number for purposes outline in our Privacy Policy, like keeping your account secure and personalising our services, including ads. Learn more. Other will be able to find you by email or phone number, when provided, unless you choose otherwise here.
                </p>

                <p style={{ color: "red", fontSize: "14px" }}>{error}</p>

                <Button className="rounded-pill" type="submit" style={{ width: "100%" }} >
                  {modalShow === "SignUp" ? "Create your account" : "Sign in"}
                </Button>

              </Form>
            </Modal.Body>
          </Modal>

        </Col>
      </Col>
    </Row >
  );
}
