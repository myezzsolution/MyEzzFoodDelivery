import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function OrderForm({ cart, onCancel, isSubmitting }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number should be 10 digits";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // ✅ Redirect to /payment with formData and cart
      navigate("/payment", {
        state: {
          customerInfo: formData,
          cart: cart
        }
      });
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-bold text-sky-800 mb-4">Delivery Information</h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500`}
            placeholder="Your full name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500`}
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500`}
            placeholder="Your phone number"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Address */}
        <div className="mb-6">
          <label htmlFor="address" className="block text-gray-700 font-medium mb-1">Delivery Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className={`w-full px-3 py-2 border ${errors.address ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500`}
            placeholder="Your full delivery address"
          ></textarea>
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <motion.button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white py-2 px-6 rounded-lg font-medium flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Place Order"}
          </motion.button>

          <motion.button
            type="button"
            className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 py-2 px-4 rounded-lg font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </motion.button>
        </div>
      </form>
    </div>
  );
}

export default OrderForm;
