import { motion } from "framer-motion";
import Header from "../components/Header";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Categories = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // Add error state for better UX

  // Fetch products from the database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage
        if (!token) {
          setError("Please log in to view products.");
          return;
        }
        const response = await axios.get("http://localhost:5000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });
        setProducts(response.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to fetch products. Please try again.");
      }
    };
    fetchProducts();
  }, []);

  // Navigate to Product Detail page
  const handleOrder = (product) => {
    const productName = product.title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/product/${productName}`, { state: { product } });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col">
      <Header />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-40 pb-10 flex-grow"
      >
        <div className="container mx-auto">
          <div className="flex justify-center">
            {error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-5 place-items-center max-w-4xl w-full">
                {products.map((data) => (
                  <motion.div
                    key={data._id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="rounded-2xl bg-gray-800 shadow-lg p-4 flex flex-col items-center justify-between h-[400px] max-w-[300px] text-white hover:bg-gray-700 duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="flex items-center justify-center mb-4"
                      whileHover={{ scale: 1.2 }}
                    >
                      <img
                        src={data.img}
                        alt={`${data.title} - ${data.type} by Your Tailor`}
                        className="max-w-[150px] object-contain drop-shadow-md"
                      />
                    </motion.div>
                    <div
                      className="flex items-center justify-center mb-2"
                      aria-label={`${data.title} rated 4 out of 5 stars`}
                    >
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                    </div>
                    <div className="text-center flex-grow">
                      <h1 className="text-xl font-bold mb-2">{data.title}</h1>
                      <p className="text-gray-300 text-sm line-clamp-2">{data.description}</p>
                      <p className="text-yellow-400 font-semibold">${data.price.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full font-semibold shadow-md hover:shadow-lg duration-300"
                        onClick={() => handleOrder(data)}
                        aria-label={`View details of ${data.title}`}
                      >
                        Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Categories;