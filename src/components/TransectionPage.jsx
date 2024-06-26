import NavBar from "./NavBar";
import "./TransectionPage.css";
import { useContext, useEffect } from "react";
import { BankContext } from "../context/BankContext";
import Table from "react-bootstrap/Table";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
export default function TransectionPage() {
  const { userTransection, checkToken } = useContext(BankContext);
  const sortedTransections = userTransection.sort((a, b) => {
    return new Date(a.datetime) - new Date(b.datetime);
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
    checkToken();
    // eslint-disable-next-line
  }, []);

  return (
    <section className="App">
      <NavBar />
      <div className="MainSection">
        <div className="TransectionsBox">
          <h3 className="mb-4">Transection</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransections.length > 0 &&
                sortedTransections.map((transection, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{transection.from}</td>
                    <td>{transection.to}</td>
                    <td>{transection.amount}</td>
                    <td>
                      {transection.datetime
                        .toString()
                        .slice(0, 19)
                        .replace("T", " ")}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Footer />
    </section>
  );
}
