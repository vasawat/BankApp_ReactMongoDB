import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { BankContext } from "../context/BankContext";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function NavBar(params) {
  const {
    handleLogin,
    handleRegister,
    setUserLogined,
    loginShow,
    setLoginShow,
    registerShow,
    setRegisterShow,
    wrongPass,
    userToken,
    setUserToken,
    PassNotMatch,
  } = useContext(BankContext);

  const { register: userLogin, handleSubmit: loginHandleSubmit } = useForm();
  const { register: userRegister, handleSubmit: registerHandleSubmit } =
    useForm();

  return (
    <Nav className="p-4">
      <Nav.Item ><Link className="Logo" to={"/"}>BankApp</Link></Nav.Item>
      {userToken ? (
        <Nav.Item className="ms-auto">
          <Link to={`/`} className="me-2 btn btn-primary">
            Home
          </Link>
          <Link
            to={`/Transaction/${userToken}`}
            className="me-2 btn btn-primary"
          >
            Transection
          </Link>
          <Link
            className="btn btn-primary me-2"
            to={`/`}
            onClick={() => {
              setUserLogined(null);
              setUserToken(null);
              localStorage.removeItem("token");
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "success",
                title: "Logout successfully",
              });
            }}
          >
            Logout
          </Link>
        </Nav.Item>
      ) : (
        <Nav.Item className="ms-auto">
          <Button onClick={() => setLoginShow(true)} className="me-2">
            login
          </Button>
          <Button onClick={() => setRegisterShow(true)}>register</Button>
        </Nav.Item>
      )}

      <Modal show={loginShow} onHide={() => setLoginShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={loginHandleSubmit((data) => {
              handleLogin(data);
            })}
          >
            <Form.Group className="mb-3" controlId="ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                {...userLogin("email", { required: true })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                {...userLogin("password", { required: true })}
              />
            </Form.Group>
            {wrongPass ? (
              <Form.Label className="text-danger">
                *wrong email or password
              </Form.Label>
            ) : null}

            <Modal.Footer>
              <Button type="submit" variant="primary">
                Login
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={registerShow} onHide={() => setRegisterShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={registerHandleSubmit((data) => {
              handleRegister(data);
            })}
          >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                {...userRegister("emailRegister", { required: true })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                {...userRegister("passwordRegister", { required: true })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="passwordAgain">
              <Form.Label>Password Again</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                {...userRegister("confirmPasswordRegister", { required: true })}
              />
            </Form.Group>
            {PassNotMatch ? (
              <Form.Label className="text-danger">
                Password Not Match
              </Form.Label>
            ) : null}
            <Modal.Footer>
              <Button type="submit" variant="primary">
                Register
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </Nav>
  );
}
