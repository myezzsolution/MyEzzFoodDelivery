"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Cart from "./components/Cart";
import OrderForm from "./components/OrderForm";
import Header from "./components/Header";
import OrderSuccess from "./components/OrderSuccess";
import VendorGrid from "./components/VendorGrid";
import VendorMenu from "./components/VendorMenu";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import menuData from "./data/menuData";

function App() {
  const [cart, setCart] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderResponse, setOrderResponse] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const appRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: appRef,
    offset: ["start start", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  // Close vendor menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectedVendor &&
        !event.target.closest(".vendor-menu") &&
        !event.target.closest(".vendor-card")
      ) {
        setSelectedVendor(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedVendor]);

  // Toggle body scroll when vendor menu is open
  useEffect(() => {
    if (selectedVendor) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedVendor]);

  const addToCart = (item) => {
    const existingItem = cart.find(
      (cartItem) => cartItem.id === item.id && cartItem.vendor === item.vendor
    );

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id && cartItem.vendor === item.vendor
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }

    // Show cart when adding items
    setShowCart(true);
  };

  const removeFromCart = (item) => {
    const existingItem = cart.find(
      (cartItem) => cartItem.id === item.id && cartItem.vendor === item.vendor
    );

    if (existingItem.quantity === 1) {
      setCart(
        cart.filter(
          (cartItem) =>
            !(cartItem.id === item.id && cartItem.vendor === item.vendor)
        )
      );
    } else {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id && cartItem.vendor === item.vendor
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const handlePlaceOrder = async (customerInfo) => {
    setIsSubmitting(true);

    try {
      // Prepare order data for Google Sheets
      const orderItems = cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        vendor: item.vendor,
        total: item.price * item.quantity,
      }));

      const orderTotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const orderData = {
        customer: customerInfo,
        items: orderItems,
        total: orderTotal,
        orderDate: new Date().toISOString(),
      };

      // Send to Google Apps Script
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbz8cKWVFAV99qU1zE2de6DYoSff0iRXhOrgCOmEV5c3P_Lu7fJobvrMe1zbloNi8tan/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
          mode: "no-cors", // Google Apps Script requires this
        }
      );

      setOrderResponse({
        success: true,
        message:
          "Your order has been placed successfully! Check your email for confirmation.",
      });

      setOrderPlaced(true);
      setShowOrderForm(false);
      clearCart();
    } catch (error) {
      console.error("Error placing order:", error);
      setOrderResponse({
        success: false,
        message: "There was an error placing your order. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-white to-sky-50"
      ref={appRef}
    >
      <motion.div
        style={{ opacity: headerOpacity, scale: headerScale }}
        className="sticky top-0 z-10"
      >
        <Header cartItemCount={cartItemCount} toggleCart={toggleCart} />
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
                        onSubmit={handlePlaceOrder}
                        onCancel={() => setShowOrderForm(false)}
                        isSubmitting={isSubmitting}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {orderPlaced && (
                    <motion.div className="p-4 border-t border-gray-200">
                      <OrderSuccess response={orderResponse} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FloatingWhatsApp
        phoneNumber="+918097021356"
        accountName="MyEzz Support"
      />

      <footer className="bg-sky-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold">⚡ MyEzz ⚡</p>
          <p className="mt-2">Good food, good mood — only at MyEzz.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
