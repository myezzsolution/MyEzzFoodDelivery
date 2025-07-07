// src/components/HomePage.jsx
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Cart from "./Cart";
import OrderForm from "./OrderForm";
import Header from "./Header";
import VendorGrid from "./VendorGrid";
import VendorMenu from "./VendorMenu";
import FloatingWhatsApp from "./FloatingWhatsApp";
import menuData from "../data/menuData";

function HomePage() {
  const [cart, setCart] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const appRef = useRef(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({ target: appRef, offset: ["start start", "end start"] });
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectedVendor && !e.target.closest(".vendor-menu") && !e.target.closest(".vendor-card")) {
        setSelectedVendor(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedVendor]);

  useEffect(() => {
    document.body.style.overflow = selectedVendor ? "hidden" : "auto";
  }, [selectedVendor]);

  const addToCart = (item) => {
    const existing = cart.find(i => i.id === item.id && i.vendor === item.vendor);
    if (existing) {
      setCart(cart.map(i => i.id === item.id && i.vendor === item.vendor ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    setShowCart(true);
  };

  const removeFromCart = (item) => {
    const existing = cart.find(i => i.id === item.id && i.vendor === item.vendor);
    if (existing.quantity === 1) {
      setCart(cart.filter(i => !(i.id === item.id && i.vendor === item.vendor)));
    } else {
      setCart(cart.map(i => i.id === item.id && i.vendor === item.vendor ? { ...i, quantity: i.quantity - 1 } : i));
    }
  };

  const clearCart = () => setCart([]);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleOrderFormSubmit = (customerInfo) => {
    navigate("/payment", { state: { customerInfo, cart } });
    setShowOrderForm(false);
    setShowCart(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-sky-50" ref={appRef}>
      <motion.div style={{ opacity: headerOpacity, scale: headerScale }} className="sticky top-0 z-10">
        <Header cartItemCount={cartItemCount} toggleCart={() => setShowCart(!showCart)} />
      </motion.div>

      <div className="container mx-auto px-4 py-8 relative">
        <VendorGrid vendors={menuData} setSelectedVendor={setSelectedVendor} />

        <AnimatePresence>
          {selectedVendor && (
            <VendorMenu
              vendor={selectedVendor}
              closeMenu={() => setSelectedVendor(null)}
              addToCart={addToCart}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showCart && (
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-full md:w-96 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="h-full flex flex-col bg-white">
                <div className="flex-1 overflow-y-auto">
                  <Cart
                    cart={cart}
                    removeFromCart={removeFromCart}
                    addToCart={addToCart}
                    clearCart={clearCart}
                    setShowOrderForm={setShowOrderForm}
                    closeCart={() => setShowCart(false)}
                  />
                </div>

                <AnimatePresence>
                  {showOrderForm && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 border-t border-gray-200"
                    >
                      <OrderForm
                        cart={cart}
                        onSubmit={handleOrderFormSubmit}
                        onCancel={() => setShowOrderForm(false)}
                        isSubmitting={isSubmitting}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FloatingWhatsApp phoneNumber="+918097021356" accountName="MyEzz Support" />

      <footer className="bg-sky-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold">⚡ MyEzz ⚡</p>
          <p className="mt-2">Good food, good mood — only at MyEzz.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
