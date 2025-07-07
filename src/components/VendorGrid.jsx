// 

// import { useRef } from "react";
// import { motion, useInView } from "framer-motion";

// function VendorGrid({ vendors, setSelectedVendor }) {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: false, amount: 0.2 });

//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const item = {
//     hidden: { opacity: 0, y: 30 },
//     show: { opacity: 1, y: 0 },
//   };

//   return (
//     <div className="py-16 bg-gradient-to-b from-white via-sky-50 to-white min-h-screen">
//       <motion.h2
//         className="text-4xl font-bold text-sky-800 mb-4 text-center"
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         Explore Our Trusted Vendors
//       </motion.h2>

//       <motion.p
//         className="text-gray-600 mb-12 text-center text-lg"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.6, delay: 0.2 }}
//       >
//        <b>We deliver to your doorstep, not just the main gate — exclusively for Somaiyans.</b><br/> <strong>Quick Delivery:</strong> Arrives ~10 mins
//         after it's ready.<br/> <strong>Pre-Order:</strong> Schedule your order in advance.
//       </motion.p>

//       <motion.div
//         ref={ref}
//         variants={container}
//         initial="hidden"
//         animate={isInView ? "show" : "hidden"}
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6"
//       >
//         {vendors.map((vendor) => (
//           <motion.div
//             key={vendor.name}
//             variants={item}
//             onClick={() => setSelectedVendor(vendor)}
//             className="group relative bg-white border border-sky-100 rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             {/* Top color band */}
//             <div className="h-2 bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-600"></div>

//             {/* Card Content */}
//             <div className="p-6 space-y-4">
//               <h3 className="text-2xl font-semibold text-gray-800">
//                 {vendor.name}
//               </h3>
//               <p className="text-gray-500 italic">{vendor.tagline}</p>

//               <div className="flex flex-wrap gap-2">
//                 {vendor.categories.map((category) => (
//                   <span
//                     key={category.name}
//                     className="text-sm bg-sky-100 text-sky-700 px-3 py-1 rounded-full"
//                   >
//                     {category.name}
//                   </span>
//                 ))}
//               </div>

//               <div className="text-gray-500 text-sm">
//                 {vendor.categories.reduce(
//                   (total, category) => total + category.items.length,
//                   0
//                 )}{" "}
//                 items available
//               </div>
//             </div>

//             {/* Hover-Visible Button */}
//             <motion.div
//               className="absolute bottom-4 right-4 bg-sky-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
//               whileHover={{ x: 4 }}
//             >
//               View Menu →
//             </motion.div>
//           </motion.div>
//         ))}
//       </motion.div>
//     </div>
//   );
// }

// export default VendorGrid;


import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function VendorGrid({ vendors = [], setSelectedVendor }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="py-16 bg-gradient-to-b from-white via-sky-50 to-white min-h-screen">
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-sky-800 mb-4 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Explore Our Trusted Vendors
      </motion.h2>

      <motion.p
        className="text-gray-600 mb-12 text-center text-base sm:text-lg px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <b>We deliver to your doorstep, not just the main gate — exclusively for Somaiyans.</b><br />
        <strong>Quick Delivery:</strong> Arrives ~10 mins after it's ready.<br />
        <strong>Pre-Order:</strong> Schedule your order in advance.
      </motion.p>

      {vendors.length === 0 ? (
        <p className="text-center text-gray-500">No vendors found.</p>
      ) : (
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6"
        >
          {vendors.map((vendor) => (
            <motion.div
              key={vendor.name}
              variants={item}
              onClick={() => setSelectedVendor?.(vendor)}
              className="group relative bg-white border border-sky-100 rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Top color band */}
              <div className="h-2 bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-600"></div>

              {/* Card Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">{vendor.name}</h3>
                <p className="text-gray-500 italic">{vendor.tagline}</p>

                <div className="flex flex-wrap gap-2">
                  {vendor.categories?.map((category) => (
                    <span
                      key={category.name}
                      className="text-sm bg-sky-100 text-sky-700 px-3 py-1 rounded-full"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>

                <div className="text-gray-500 text-sm">
                  {vendor.categories?.reduce(
                    (total, category) => total + (category.items?.length || 0),
                    0
                  )}{" "}
                  items available
                </div>
              </div>

              {/* Hover Button */}
              <motion.div
                className="absolute bottom-4 right-4 bg-sky-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ x: 4 }}
              >
                View Menu →
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default VendorGrid;
