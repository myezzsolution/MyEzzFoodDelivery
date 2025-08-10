import { auth, googleProvider } from "../firebase";
import { signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// Google Login
export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

// Setup Recaptcha
function setUpRecaptcha(containerId) {
  if (window.recaptchaVerifier) {
    window.recaptchaVerifier.clear(); // cleanup old one
  }

  window.recaptchaVerifier = new RecaptchaVerifier(
    containerId, // The HTML element ID
    {
      size: "invisible",
      callback: () => {
        console.log("reCAPTCHA solved");
      }
    },
    auth // IMPORTANT → auth must be passed here
  );

  return window.recaptchaVerifier;
}

// Send OTP
export async function sendSmsOtp(phoneNumber, containerId) {
  if (!phoneNumber.startsWith("+")) {
    throw new Error("Phone number must be in E.164 format, e.g. +919876543210");
  }

  const appVerifier = setUpRecaptcha(containerId);

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    window.confirmationResult = confirmationResult;
    return confirmationResult;
  } catch (error) {
    console.error("Error sending SMS OTP:", error);
    throw error;
  }
}

// Verify OTP
export async function verifySmsOtp(code) {
  if (!window.confirmationResult) {
    throw new Error("No OTP request found. Please request OTP again.");
  }
  try {
    const result = await window.confirmationResult.confirm(code);
    return result.user;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
}
