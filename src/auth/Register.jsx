import React, { useState } from "react";
import { sendSmsOtp } from "./authService";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }
    if (!phone.startsWith("+91")) {
      alert("Please enter phone number in format: +91XXXXXXXXXX");
      return;
    }

    try {
      setLoading(true);
      await sendSmsOtp(phone, "recaptcha-container");
      localStorage.setItem("myezz_pending_user", JSON.stringify({ name, phone }));
      navigate("/otp-verify");
    } catch (error) {
      alert("Failed to send OTP: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register for MyEzz</h2>
      <form onSubmit={handleRegister} className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+91XXXXXXXXXX"
          className="w-full p-2 border rounded"
        />
        <div id="recaptcha-container"></div> {/* must exist before sending OTP */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-green-600 text-white rounded"
        >
          {loading ? "Sending OTP..." : "Register"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-sky-600 underline">
          Login
        </a>
      </p>
    </div>
  );
}
