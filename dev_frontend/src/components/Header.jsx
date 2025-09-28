import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md z-50"
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Your Tailor
        </h1>
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
            Home
          </Link>
          <Link to="/categories" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
            Categories
          </Link>
          <Link to="/cart" className="relative text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          <Link to="/checkout" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
            Checkout
          </Link>
          {isLoggedIn && (
            <Link to="/profile" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
              User Profile
            </Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
              Login
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
          <Link to="/cart" className="md:hidden relative text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white dark:bg-gray-900 absolute top-full left-0 w-full shadow-md p-4 space-y-4"
        >
          <Link to="/" className="block text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
            Home
          </Link>
          <Link to="/categories" className="block text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
            Categories
          </Link>
          <Link to="/cart" className="block text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
            Cart
          </Link>
          <Link to="/checkout" className="block text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
            Checkout
          </Link>
          {isLoggedIn && (
            <Link to="/profile" className="block text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
              User Profile
            </Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="block text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="block text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
              Login
            </Link>
          )}
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;