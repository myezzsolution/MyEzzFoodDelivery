// src/auth/OTPVerification.jsx
import React, { useState } from "react";
import { verifySmsOtp } from "./authService";
import { useNavigate } from "react-router-dom";

export default function OTPVerification() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // pending data (name/phone) stored earlier
  const pending = JSON.parse(localStorage.getItem("myezz_pending_user") || "{}");

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = await verifySmsOtp(code);
      // Save user info to localStorage (you may want to save more)
      const userObj = {
        uid: user.uid,
        phone: user.phoneNumber || pending.phone || "",
        displayName: pending.name || user.displayName || "",
        email: user.email || "",
      };
      localStorage.setItem("myezz_user", JSON.stringify(userObj));
      localStorage.removeItem("myezz_pending_user");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("OTP verification failed: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-3">Enter OTP</h3>
      <p className="text-sm text-gray-600 mb-4">We sent an SMS OTP to <strong>{pending.phone}</strong></p>
      <form onSubmit={handleVerify} className="space-y-3">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="4-6 digit code"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full py-2 bg-sky-600 text-white rounded" disabled={loading}>
          {loading ? "Verifying..." : "Verify & Continue"}
        </button>
      </form>
    </div>
  );
}
