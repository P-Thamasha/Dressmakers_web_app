import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";

const measurementFields = {
  tshirt: [
    { label: "Neck Opening (in)", key: "neckOpening", placeholder: "e.g., 14" },
    { label: "Sleeve Opening (in)", key: "sleeveOpening", placeholder: "e.g., 8" },
    { label: "Chest (in)", key: "chest", placeholder: "e.g., 38" },
    { label: "Body Length (in)", key: "bodyLength", placeholder: "e.g., 28" },
  ],
  trouser: [
    { label: "Waist (in)", key: "waist", placeholder: "e.g., 30" },
    { label: "Inseam (in)", key: "inseam", placeholder: "e.g., 32" },
    { label: "Hip (in)", key: "hip", placeholder: "e.g., 40" },
    { label: "Thigh (in)", key: "thigh", placeholder: "e.g., 22" },
  ],
  frocks: [
    { label: "Bust (in)", key: "bust", placeholder: "e.g., 34" },
    { label: "Waist (in)", key: "waist", placeholder: "e.g., 28" },
    { label: "Hip (in)", key: "hip", placeholder: "e.g., 36" },
    { label: "Length (in)", key: "length", placeholder: "e.g., 50" },
  ],
};

const colorOptions = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Red", value: "#FF0000" },
  { name: "Blue", value: "#0000FF" },
  { name: "Green", value: "#00FF00" },
];

const ProductDetail = () => {
  const { name } = useParams();
  const location = useLocation();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(location.state?.product || null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [measurements, setMeasurements] = useState({});
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].value);

  // 🆕 Track validation errors
  const [errors, setErrors] = useState({});

  // Fetch product details if not passed through state
  useEffect(() => {
    if (!product) {
      const fetchProduct = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            console.error("No token found. Please log in.");
            return;
          }
          const response = await axios.get("http://localhost:5000/api/products", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const foundProduct = response.data.find(
            (p) => p.title.toLowerCase().replace(/\s+/g, "-") === name
          );
          if (foundProduct) {
            setProduct(foundProduct);
          }
        } catch (err) {
          console.error("Failed to fetch product:", err);
        }
      };
      fetchProduct();
    }
  }, [name, product]);

  // Initialize measurements based on product type
  useEffect(() => {
    if (product) {
      const fields = measurementFields[product.type];
      const initialMeasurements = {};
      fields.forEach((field) => {
        initialMeasurements[field.key] = "";
      });
      setMeasurements(initialMeasurements);
    }
  }, [product]);

  const handleMeasurementChange = (field, value) => {
    // Clear error when user updates value
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setMeasurements((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 🆕 Validate all measurements before adding to cart
  const validateMeasurements = () => {
    const newErrors = {};
    measurementFields[product.type].forEach((field) => {
      const val = measurements[field.key];
      if (!val) {
        newErrors[field.key] = "This field is required.";
      } else if (Number(val) <= 0) {
        newErrors[field.key] = "Value must be greater than 0.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddToCart = () => {
    if (!product) return;

    // ✅ Run validation
    if (!validateMeasurements()) {
      alert("Please fix the highlighted errors before adding to cart.");
      return;
    }

    const validMeasurements = Object.keys(measurements).length > 0 ? measurements : {};
    const cartItem = {
      id: product._id,
      title: product.title,
      price: product.price,
      img: product.img,
      measurements: validMeasurements,
      color: selectedColor,
      quantity: 1,
    };
    addToCart(cartItem);
    alert(`${product.title} (Color: ${colorOptions.find((c) => c.value === selectedColor).name}) added to cart!`);
    setShowSizeGuide(false);
  };

  if (!product) return <div>Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-40 pb-10 flex-grow"
      >
        <div className="container mx-auto flex flex-col lg:flex-row gap-10 items-start">
          {/* Product Card */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl bg-gray-800 shadow-lg p-3 flex flex-col items-center justify-between h-[300px] max-w-[200px] text-white hover:bg-gray-700 duration-300"
          >
            <motion.div
              className="flex items-center justify-center mb-2"
              whileHover={{ scale: 1.2 }}
            >
              <img
                src={product.img}
                alt={`${product.title} - ${product.type}`}
                className="max-w-[100px] object-contain drop-shadow-md"
              />
            </motion.div>
            <div className="text-center">
              <h1 className="text-xl font-bold">{product.title}</h1>
              <p className="text-yellow-400 font-semibold">${product.price.toFixed(2)}</p>
            </div>
          </motion.div>

          {/* Size Guide Button */}
          <div className="flex-1">
            <div className="space-y-4">
              <button
                onClick={() => setShowSizeGuide(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full font-semibold shadow-md hover:shadow-lg duration-300"
              >
                Enter Custom Sizes
              </button>
            </div>
          </div>

          {/* Size Guide Modal */}
          {showSizeGuide && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Enter Your Measurements</h3>
                
                {/* Color Selector */}
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-200 mb-2">
                    Select Color:
                  </label>
                  <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  >
                    {colorOptions.map((color) => (
                      <option key={color.name} value={color.value}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Measurement Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  {measurementFields[product.type].map((field) => (
                    <div key={field.key}>
                      <label className="block text-gray-700 dark:text-gray-200 mb-1">
                        {field.label}
                      </label>
                      <input
                        type="number"
                        value={measurements[field.key] || ""}
                        onChange={(e) => handleMeasurementChange(field.key, e.target.value)}
                        className={`w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
                          errors[field.key] ? "border-red-500" : ""
                        }`}
                        placeholder={field.placeholder}
                        min="0"
                        required
                      />
                      {/* 🆕 Error message */}
                      {errors[field.key] && (
                        <p className="text-red-500 text-sm mt-1">{errors[field.key]}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setShowSizeGuide(false)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default ProductDetail;
