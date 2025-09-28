import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ✅ Load user info from localStorage initially
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [shippingInfo, setShippingInfo] = useState({
    name: savedUser.name || "",
    email: savedUser.email || "",
  });

  // ✅ Persist changes to localStorage when shippingInfo updates
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(shippingInfo));
  }, [shippingInfo]);

  const handleOrderSubmit = async () => {
    if (!shippingInfo.name || !shippingInfo.email) {
      alert("Please fill in your name and email in the shipping step.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to proceed with checkout.");
      return;
    }

    const orderData = {
      items: cart.map((item) => ({
        productId: item.id,
        size: item.measurements || {},
        color: item.color || "N/A",
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: total,
      userDetails: {
        name: shippingInfo.name,
        email: shippingInfo.email,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders/checkout",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.message === "Order saved successfully") {
        alert("Order placed successfully!");
        setCart([]); // Clear cart after successful order
        navigate("/");
      } else {
        alert("Error saving order: " + response.data.message);
      }
    } catch (err) {
      console.error("Checkout failed:", err.response?.data || err.message);
      alert("Checkout failed. Please check the console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <Header />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-20 pb-10"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">
            Checkout
          </h2>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4">
              {[1, 2, 3].map((n) => (
                <span
                  key={n}
                  className={`px-4 py-2 rounded-full ${
                    step >= n ? "bg-black text-white" : "bg-gray-200"
                  }`}
                >
                  {n}
                </span>
              ))}
            </div>
          </div>

          {/* Step 1: Shipping Info */}
          {step === 1 && (
            <div className="max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold dark:text-white mb-4">Shipping Info</h3>
              <input
                type="text"
                placeholder="Full Name"
                value={shippingInfo.name}
                onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
              <input
                type="email"
                placeholder="Email"
                value={shippingInfo.email}
                onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={() => setStep(2)}
                className="w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-lg"
              >
                Next
              </button>
            </div>
          )}

          {/* Step 2: Payment Info */}
          {step === 2 && (
            <div className="max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold dark:text-white mb-4">Payment Info</h3>
              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={() => setStep(3)}
                className="w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-lg"
              >
                Next
              </button>
            </div>
          )}

          {/* Step 3: Order Confirmation */}
          {step === 3 && (
            <div className="max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold dark:text-white mb-4">Order Confirmation</h3>
              <ul className="mb-4">
                {cart.map((item) => (
                  <li key={item.id} className="dark:text-gray-300">
                    {item.title} - ${item.price.toFixed(2)} x {item.quantity}
                  </li>
                ))}
              </ul>
              <p className="dark:text-gray-300 font-semibold">Total: ${total.toFixed(2)}</p>
              <button
                onClick={handleOrderSubmit}
                className="w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-lg mt-4"
              >
                Submit Order
              </button>
            </div>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default Checkout;
