

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import MenuItem from "./MenuItem";

function VendorMenu({ vendor, closeMenu, addToCart }) {
  const [activeCategory, setActiveCategory] = useState(
    vendor.categories[0]?.name || ""
  );
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef(null);
  const categoryRefs = useRef({});

  // Initialize category refs
  useEffect(() => {
    vendor.categories.forEach((category) => {
      categoryRefs.current[category.name] =
        categoryRefs.current[category.name] || React.createRef();
    });
  }, [vendor.categories]);

  // Scroll to category when active category changes
  useEffect(() => {
    if (activeCategory && categoryRefs.current[activeCategory]?.current) {
      categoryRefs.current[activeCategory].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activeCategory]);

  const handleScroll = () => {
    if (!menuRef.current) return;

    const scrollPosition = menuRef.current.scrollTop;
    let currentCategory = activeCategory;

    for (const [name, ref] of Object.entries(categoryRefs.current)) {
      if (!ref.current) continue;

      const element = ref.current;
      const elementTop = element.offsetTop;
      const elementBottom = elementTop + element.offsetHeight;

      if (
        elementTop <= scrollPosition + 100 &&
        elementBottom > scrollPosition
      ) {
        currentCategory = name;
        break;
      }
    }

    if (currentCategory !== activeCategory) {
      setActiveCategory(currentCategory);
    }
  };

  const filteredCategories = vendor.categories
    .map((category) => ({
      ...category,
      items: category.items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-transparent backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeMenu}
    >
      <motion.div
        className="vendor-menu bg-white w-full max-w-4xl max-h-screen rounded-xl overflow-hidden shadow-2xl flex flex-col"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-sky-500 to-sky-700 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{vendor.name}</h2>
              <p className="text-sky-100 italic mt-1">{vendor.tagline}</p>
            </div>
            <motion.button
              className="p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-70 transition-colors flex items-center justify-center"
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={closeMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-sky-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
          </div>

          {/* Search */}
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-white bg-opacity-20 text-black placeholder-gray-500 border border-white border-opacity-20 focus:outline-none focus:bg-opacity-30"
            />
            <div className="absolute right-3 top-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500 opacity-70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-md">
          <div className="flex space-x-1 p-2 min-w-max">
            {vendor.categories.map((category) => (
              <motion.button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all text-base ${
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

        {/* Menu Items */}
        <div
          className="flex-1 overflow-y-auto p-4"
          ref={menuRef}
          onScroll={handleScroll}
        >
          {searchQuery && filteredCategories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No items found matching "{searchQuery}"
              </p>
              <button
                className="mt-2 text-sky-600 hover:underline"
                onClick={() => setSearchQuery("")}
              >
                Clear search
              </button>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div
                key={category.name}
                ref={categoryRefs.current[category.name]}
                className="mb-8"
              >
                <h3 className="text-lg font-bold text-sky-800 mb-4 sticky -top-5 bg-white shadow-md py-3 z-50 border-b border-gray-300">
                  {category.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items.map((item) => (
                    <MenuItem
                      key={item.id}
                      item={item}
                      vendor={vendor.name}
                      addToCart={addToCart}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default VendorMenu;
