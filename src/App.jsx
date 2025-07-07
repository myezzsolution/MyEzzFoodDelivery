// src/App.jsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import PaymentPage from "./components/PaymentPage";
import OrderSuccess from "./components/OrderSuccess";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/success" element={<OrderSuccess />} />
    </Routes>
  );
}

export default App;
