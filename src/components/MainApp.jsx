import { useContext } from "react";
import "./MainApp.css";
import { BankContext } from "../context/BankContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { BsPiggyBank } from "react-icons/bs";

export default function MainApp(params) {
  const {
    userLogined,
    handleDeposit,
    handleWithdrew,
    transferShow,
    setTransferShow,
    handleTransfer,
  } = useContext(BankContext);
  const { register: transfer, handleSubmit: transferHandleSubmit } = useForm();
  const { register: deposit, handleSubmit: depositHandleSubmit } = useForm();
  const { register: withdrew, handleSubmit: withdrewHandleSubmit } = useForm();
  return (
    <section className="MainSection">
      <div className="formBox">
        {userLogined && userLogined._id ? (
          <div>
            <BsPiggyBank className="Logo" />
            <h5>hi {userLogined.email}</h5>
            <h5>Your balance : {userLogined.balance} $</h5>

            <Button className="mt-2" onClick={() => setTransferShow(true)}>
              Transfer
            </Button>

            <Form
              onSubmit={depositHandleSubmit((data) => {
                handleDeposit(data);
              })}
            >
              <Form.Group className="mb-3 mt-2" controlId="ControlInput1">
                <Form.Label>Deposit</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type="number"
                    placeholder="deposit amount"
                    min={0}
                    {...deposit("deposit", { required: true })}
                  />
                  <Button type="submit" className="btn btn-success ms-1">
                    Deposit
                  </Button>
                </div>
              </Form.Group>
            </Form>

            <Form
              onSubmit={withdrewHandleSubmit((data) => {
                handleWithdrew(data);
              })}
            >
              <Form.Group className="mb-3" controlId="ControlInput1">
                <Form.Label>Withdrew</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type="number"
                    placeholder="withdrew amount"
                    min={0}
                    {...withdrew("withdrew", { required: true })}
                  />
                  <Button type="submit" className="btn btn-warning ms-1">
                    withdrew
                  </Button>
                </div>
              </Form.Group>
            </Form>
          </div>
        ) : (
          <div className="welcomeBox text-center">
            <BsPiggyBank className="Logo mt-5" />
            <p className="mt-2 welcomeBoxText">Welcome</p>
            <p className="mt-2">Please Login</p>
          </div>
        )}
      </div>

      <Modal show={transferShow} onHide={() => setTransferShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={transferHandleSubmit((data) => {
              handleTransfer(data);
            })}
          >
            <Form.Group className="mb-3" controlId="ControlInput1">
              <Form.Label>Transfer To</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                {...transfer("transferTo", { required: true })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ControlInput1">
              <Form.Label>transfer amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="transfer amount"
                min={0}
                {...transfer("transferAmount", { required: true })}
              />
            </Form.Group>

            <Modal.Footer>
              <Button type="submit" variant="primary">
                Transfer
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </section>
  );
}
