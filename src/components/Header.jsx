// src/components/Header.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Header({ cartItemCount, toggleCart }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // remove from both storages (safe)
    localStorage.removeItem("myezz_user");
    sessionStorage.removeItem("myezz_user");
    // redirect to login
    navigate("/login");
  };

  return (
    <motion.header
      className="bg-sky-800 text-white py-3 shadow-lg sticky top-0 w-full z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-extrabold tracking-wide flex items-center">⚡ MyEzz ⚡</h1>
          <p className="hidden md:block text-sky-100 text-lg">Enjoy the best vendors at one place</p>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            className="relative p-3 rounded-full bg-sky-700 hover:bg-sky-600 transition-colors flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleCart}
          >
            {/* cart icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>

            {/* badge */}
            {cartItemCount > 0 && (
              <motion.div
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full h-6 w-6 flex items-center justify-center shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                {cartItemCount}
              </motion.div>
            )}
          </motion.button>

        </div>
      </div>
    </motion.header>
  );
}

export default Header;
