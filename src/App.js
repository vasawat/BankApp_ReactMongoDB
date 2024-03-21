import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BankProvider } from "./context/BankContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import TransectionPage from "./components/TransectionPage";

function App() {
  return (
    <BankProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/Transaction/:user_id"
            element={<TransectionPage />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </BankProvider>
  );
}

export default App;
