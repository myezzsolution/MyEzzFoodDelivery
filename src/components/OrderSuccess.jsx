import React from "react";
import { QRCodeCanvas } from 'qrcode.react'; // ✅ FIXED

function OrderSuccess({ response }) {
  const orderId = Math.floor(100000 + Math.random() * 900000); // Simulated order ID

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-semibold text-green-600 mb-2">
        ✅ Your order has been placed successfully!
      </h2>
      <p className="mb-4 text-gray-700">
        Thank you for ordering with MyEzz! You'll receive a confirmation email shortly.
      </p>

      <div className="bg-gray-100 p-4 rounded shadow-md inline-block text-left">
        <p><strong>Order ID:</strong> #{orderId}</p>
        <p><strong>Status:</strong> Confirmed</p>
        <p><strong>Payment:</strong> {response?.paymentMethod?.toUpperCase() || "Paid"}</p>
      </div>

      <div className="my-6">
        <QRCodeCanvas value={`Order ID: ${orderId}`} size={128} />
        <p className="text-sm text-gray-500 mt-2">Scan to verify order</p>
      </div>

      <button
        onClick={() => window.print()}
        className="mt-4 px-6 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
      >
        🖨️ Print Receipt
      </button>
    </div>
  );
}

export default OrderSuccess;
