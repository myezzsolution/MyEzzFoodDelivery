import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function PaymentPage() {
  const [method, setMethod] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const { customerInfo, cart } = state || {};

  const total = cart?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    const orderItems = cart.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      vendor: item.vendor,
      portion: item.portion || "Regular",
      preference: item.jain ? "Jain" : "Non-Jain",
      total: item.price * item.quantity,
    }));

    const orderData = {
      customer: customerInfo,
      items: orderItems,
      total,
      paymentMethod: method, // Pass payment method
      orderDate: new Date().toISOString(),
    };

    await fetch("https://script.google.com/macros/s/AKfycbykq2IHzdfSrrlUcq_N6YicaY2xBNnaWQM-Vl0covOdgcsN0S_mJcNJgt-LYrjFAoYA/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
      mode: "no-cors",
    });

    navigate("/success", {
      state: { response: { paymentMethod: method } }
    });
  };

  const handlePay = async () => {
    if (!method) return alert("Select payment method");

    if (method === "cod") return await placeOrder();

    const options = {
      key: "rzp_test_nw1wID8r8nxtnI", // ✅ Replace with live key in production
      amount: total * 100,
      currency: "INR",
      name: "MyEzz",
      description: "Order Payment",
      handler: async function (response) {
        await placeOrder(); // Only after payment succeeds
      },
      prefill: {
        name: customerInfo.name,
        email: customerInfo.email,
        contact: customerInfo.phone,
      },
      theme: { color: "#0ea5e9" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!customerInfo || !cart) {
    return <p className="text-center mt-10 text-red-500">Missing order data</p>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 mt-8 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Choose Payment Method</h2>

      <div className="space-y-3 mb-6">
        <label><input type="radio" name="pay" onChange={() => setMethod("card")} /> Credit / Debit Card</label><br />
        <label><input type="radio" name="pay" onChange={() => setMethod("upi")} /> UPI</label><br />
        <label><input type="radio" name="pay" onChange={() => setMethod("cod")} /> Cash on Delivery</label>
      </div>

      <button
        onClick={handlePay}
        className="w-full bg-sky-600 text-white py-2 rounded hover:bg-sky-700"
      >
        Pay ₹{total}
      </button>
    </div>
  );
}

export default PaymentPage;
