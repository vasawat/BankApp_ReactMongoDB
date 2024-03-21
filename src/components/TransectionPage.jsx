import NavBar from "./NavBar";
import Footer from "./Footer";
import "./TransectionPage.css";
import { useContext } from "react";
import { BankContext } from "../context/BankContext";
import Table from "react-bootstrap/Table";
export default function TransectionPage() {
  const { userTransection } = useContext(BankContext);
  const sortedTransections = userTransection.sort((a, b) => {
    return new Date(a.datetime) - new Date(b.datetime);
  });
  console.log(userTransection);
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
              <th>status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransections.length > 0 &&
              sortedTransections.map((transection, index) => (
                <tr className="">
                  <td>{index + 1}</td>
                  <td>{transection.from}</td>
                  <td>{transection.to}</td>
                  <td>{transection.amount}</td>
                  <td>suscess</td>
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
      <Footer/>
    </section>
  );
}
