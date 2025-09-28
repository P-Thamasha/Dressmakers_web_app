import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminPanel from './pages/AdminPanel';
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import Profile from './pages/Profile';
import Layout from './components/Layout';
import { CartProvider } from './context/CartContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  }, []);

  return (
    <Router>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={isLoggedIn ? <Categories /> : <Navigate to="/login" />} />
            <Route path="/product/:name" element={isLoggedIn ? <ProductDetail /> : <Navigate to="/login" />} />
            <Route path="/cart" element={isLoggedIn ? <Cart /> : <Navigate to="/login" />} />
            <Route path="/checkout" element={isLoggedIn ? <Checkout /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={isLoggedIn ? <AdminPanel /> : <Navigate to="/login" />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/profile" element={<Profile />} /> {/* No login check here */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </Layout>
      </CartProvider>
    </Router>
  );
}

export default App;