import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  // Calculate the total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col">
      <Header />
      <section className="pt-40 pb-10 flex-grow">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">
            Your Cart
          </h2>
          {cart.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-300">
              Your cart is empty. <Link to="/categories" className="text-blue-500">Shop now!</Link>
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg"
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-20 h-20 object-contain mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Measurements: {JSON.stringify(item.measurements)}
                      </p>
                      <p className="text-yellow-400 font-semibold">
                        ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                        >
                          -
                        </button>
                        <span className="mx-2 dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <p className="text-xl font-semibold dark:text-white">
                  Total: ${total.toFixed(2)}
                </p>
                <Link
                  to="/checkout"
                  className="inline-block mt-4 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-lg"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Cart;