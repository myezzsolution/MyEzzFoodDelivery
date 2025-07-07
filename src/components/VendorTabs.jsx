

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuCategory from "./MenuCategory";

function VendorTabs({ vendors, activeVendor, setActiveVendor, addToCart }) {
  const [activeCategory, setActiveCategory] = useState(
    vendors.find((v) => v.name === activeVendor)?.categories[0]?.name || ""
  );

  const handleVendorChange = (vendorName) => {
    setActiveVendor(vendorName);
    const newVendor = vendors.find((v) => v.name === vendorName);
    if (newVendor?.categories?.length > 0) {
      setActiveCategory(newVendor.categories[0].name);
    }
  };

  const activeVendorData = vendors.find((v) => v.name === activeVendor);

  return (
    <div>
      {/* Vendor Tabs - Horizontal Scrollable */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-2 p-4 min-w-max">
          {vendors.map((vendor) => (
            <motion.button
              key={vendor.name}
              onClick={() => handleVendorChange(vendor.name)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeVendor === vendor.name
                  ? "bg-sky-600 text-white shadow-md"
                  : "bg-sky-50 text-sky-800 hover:bg-sky-100"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {vendor.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Vendor Info */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeVendor}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="px-6 py-4 border-b border-sky-100"
        >
          <h2 className="text-2xl font-bold text-sky-800">
            {activeVendorData?.name}
          </h2>
          <p className="text-sky-600 italic">{activeVendorData?.tagline}</p>
        </motion.div>
      </AnimatePresence>

      {/* Category Tabs */}
      {activeVendorData?.categories?.length > 0 && (
        <div className="px-6 pt-4 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2 border-b border-sky-100 pb-2 min-w-max">
            {activeVendorData.categories.map((category) => (
              <motion.button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-3 py-1.5 rounded-t-lg whitespace-nowrap transition-all ${
                  activeCategory === category.name
                    ? "bg-sky-100 text-sky-800 font-medium"
                    : "text-sky-600 hover:bg-sky-50"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeVendorData?.categories?.map((category) => (
            <div
              key={category.name}
              style={{
                display: activeCategory === category.name ? "block" : "none",
              }}
            >
              <MenuCategory
                category={category}
                vendor={activeVendorData.name}
                addToCart={addToCart}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default VendorTabs;
