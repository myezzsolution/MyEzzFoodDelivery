import React from "react";
import { signInWithGoogle } from "./authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      localStorage.setItem(
        "myezz_user",
        JSON.stringify({
          uid: user.uid,
          phone: user.phoneNumber || "",
          displayName: user.displayName || "",
          email: user.email || "",
        })
      );
      navigate("/");
    } catch (error) {
      alert("Google sign-in failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        {/* Logo / Heading */}
        <h1 className="text-3xl font-extrabold text-gray-800 mb-3">
          Welcome to <span className="text-blue-600">MyEzz</span> 🍽️
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          MyEzz brings your favorite meals right to your doorstep.  
          Browse top-rated vendors, enjoy Jain & Non-Jain options, and experience fast, reliable delivery.  
          Fresh food, great taste — anytime, anywhere!
        </p>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md transition duration-300"
        >

      
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
