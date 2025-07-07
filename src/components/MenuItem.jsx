// "use client"

// import { motion } from "framer-motion"

// function MenuItem({ item, vendor, addToCart }) {
//   const handleAddToCart = () => {
//     addToCart({
//       id: item.id,
//       name: item.name,
//       price: item.price,
//       vendor: vendor,
//       jain: item.jain || false,
//       description: item.description || "",
//     })
//   }

//   return (
//     <motion.div
//       className="bg-white border border-sky-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
//       whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <div className="p-4 flex justify-between items-start">
//         <div className="flex-1">
//           <div className="flex items-center">
//             <h5 className="font-medium text-gray-800">{item.name}</h5>
//             {item.jain && (
//               <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Jain</span>
//             )}
//           </div>
//           {item.description && <p className="text-sm text-gray-500 mt-1">{item.description}</p>}
//           <p className="text-sky-700 font-bold mt-1">₹{item.price}</p>
//         </div>
//         <motion.button
//           className="bg-sky-600 hover:bg-sky-700 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={handleAddToCart}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//           </svg>
//         </motion.button>
//       </div>
//     </motion.div>
//   )
// }

// export default MenuItem
// 

// import { motion } from "framer-motion";
// import { useState } from "react";

// function MenuItem({ item, vendor, addToCart }) {
//   const [selectedJain, setSelectedJain] = useState(item.jain ? "Jain" : "Non-Jain");
//   const [selectedPortion, setSelectedPortion] = useState(item.price.half ? "Full" : "Regular");

//   const handleAddToCart = () => {
//     const selectedItem = {
//       id: `${item.id}-${selectedJain}-${selectedPortion}`, // Unique identifier
//       name: item.name,
//       price: typeof item.price === "object" ? item.price[selectedPortion.toLowerCase()] : item.price,
//       vendor: vendor,
//       jain: selectedJain === "Jain",
//       portion: selectedPortion,
//       description: item.description || "",
//       quantity: 1,  // Default quantity when first adding
//     };

//     addToCart(selectedItem);
//   };

//   return (
//     <motion.div
//       className="bg-white border border-sky-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
//       whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <div className="p-4 flex flex-col gap-3">
//         <div>
//           <h5 className="font-medium text-gray-800">{item.name}</h5>
//           {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
//           <p className="text-sky-700 font-bold">
//             ₹
//             {typeof item.price === "object"
//               ? `${item.price.half} / ₹${item.price.full}`
//               : item.price}
//           </p>
//         </div>
        
//         {item.jain !== undefined && (
//           <div className="flex gap-2">
//             <label className="text-sm font-medium">Preference:</label>
//             <select
//               className="border rounded px-2 py-1"
//               value={selectedJain}
//               onChange={(e) => setSelectedJain(e.target.value)}
//             >
//               <option value="Jain">Jain</option>
//               <option value="Non-Jain">Non-Jain</option>
//             </select>
//           </div>
//         )}

//         {typeof item.price === "object" && (
//           <div className="flex gap-2">
//             <label className="text-sm font-medium">Portion Size:</label>
//             <select
//               className="border rounded px-2 py-1"
//               value={selectedPortion}
//               onChange={(e) => setSelectedPortion(e.target.value)}
//             >
//               <option value="Half">Half</option>
//               <option value="Full">Full</option>
//             </select>
//           </div>
//         )}

//         <motion.button
//           className="bg-sky-600 hover:bg-sky-700 text-white rounded-full w-full py-2 mt-2"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleAddToCart}
//         >
//           Add to Cart
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// }

// export default MenuItem;



import { motion } from "framer-motion";
import { useState } from "react";

function MenuItem({ item, vendor, addToCart }) {
  const priceKeys = typeof item.price === "object" ? Object.keys(item.price) : [];
  const [selectedJain, setSelectedJain] = useState(item.jain ? "Jain" : "Non-Jain");
  const [selectedPortion, setSelectedPortion] = useState(priceKeys.length > 0 ? priceKeys[0] : "");

  const handleAddToCart = () => {
    const selectedItem = {
      id: `${item.id}-${selectedJain}-${selectedPortion}`, // Unique identifier
      name: item.name,
      price: typeof item.price === "object" ? item.price[selectedPortion] : item.price,
      vendor: vendor,
      jain: selectedJain === "Jain",
      portion: selectedPortion,
      description: item.description || "",
      quantity: 1,  // Default quantity
    };

    addToCart(selectedItem);
  };

  return (
    <motion.div
      className="bg-white border border-sky-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 flex flex-col gap-3">
        <div>
          <h5 className="font-medium text-gray-800">{item.name}</h5>
          {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
          <p className="text-sky-700 font-bold">
            {typeof item.price === "object"
              ? Object.entries(item.price)
                  .map(([key, value]) => `${key}: ₹${value}`)
                  .join(" / ")
              : `₹${item.price}`}
          </p>
        </div>

        {item.jain !== undefined && (
          <div className="flex gap-2">
            <label className="text-sm font-medium">Preference:</label>
            <select
              className="border rounded px-2 py-1"
              value={selectedJain}
              onChange={(e) => setSelectedJain(e.target.value)}
            >
              <option value="Jain">Jain</option>
              <option value="Non-Jain">Non-Jain</option>
            </select>
          </div>
        )}

        {priceKeys.length > 0 && (
          <div className="flex gap-2">
            <label className="text-sm font-medium">Portion Size:</label>
            <select
              className="border rounded px-2 py-1"
              value={selectedPortion}
              onChange={(e) => setSelectedPortion(e.target.value)}
            >
              {priceKeys.map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
        )}

        <motion.button
          className="bg-sky-600 hover:bg-sky-700 text-white rounded-full w-full py-2 mt-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}

export default MenuItem;
