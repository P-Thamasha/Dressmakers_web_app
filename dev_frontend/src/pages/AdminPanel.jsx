import { useState, useEffect } from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";
import axios from "axios";
// Import Recharts components at the top
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { orderTrendData, productDemandData, revenueData } from "../assets/analyticsData";


const AdminPanel = () => {
  // Color palette for pie chart
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    _id: "",
    img: "",
    type: "",
    title: "",
    price: "",
    description: "",
  });
  const [updateProduct, setUpdateProduct] = useState({
    img: "",
    type: "",
    title: "",
    price: "",
    description: "",
  });
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Fetch products and orders from MongoDB
  useEffect(() => {
    if (token) {
      fetchProducts();
      fetchOrders();
    }
  }, [token]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const fetchOrders = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/orders/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrders(response.data);
    console.log("Fetched all orders:", response.data);
  } catch (err) {
    console.error("Failed to fetch orders:", err.response?.data || err.message);
  }
};


  // Handle form input changes for add
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle form input changes for update
  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct({ ...updateProduct, [name]: value });
  };

  // Save new product to MongoDB
  const handleAddProduct = async () => {
    try {
      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price),
      };
      await axios.post("http://localhost:5000/api/products", productData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
      setIsAddFormOpen(false);
      setNewProduct({ _id: "", img: "", type: "", title: "", price: "", description: "" });
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  // Update existing product
  const handleUpdateProduct = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/products/${selectedProductId}`,
        {
          img: updateProduct.img,
          type: updateProduct.type,
          title: updateProduct.title,
          price: parseFloat(updateProduct.price),
          description: updateProduct.description,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProducts();
      setIsUpdateFormOpen(false);
      setUpdateProduct({ img: "", type: "", title: "", price: "", description: "" });
      setSelectedProductId(null);
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  // Update order status
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders(); // Refresh the orders list
    } catch (err) {
      console.error("Failed to update order status:", err);
    }
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
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">
            Admin Panel - Manage Products
          </h2>
          <button
            onClick={() => setIsAddFormOpen(true)}
            className="mb-6 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-lg"
          >
            Add Product
          </button>
          {/* Product Table */}
          <div className="overflow-x-auto mb-10">
            <table className="w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  <th className="p-3 text-left">No</th>
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id} className="border-t dark:border-gray-700">
                    <td className="p-3 dark:text-gray-300">{index + 1}</td>
                    <td className="p-3">
                      <img
                        src={product.img}
                        alt={product.title}
                        className="w-16 h-16 object-contain"
                      />
                    </td>
                    <td className="p-3 dark:text-gray-300">{product.type}</td>
                    <td className="p-3 dark:text-gray-300">{product.title}</td>
                    <td className="p-3 dark:text-gray-300">
                      ${typeof product.price === "number" ? product.price.toFixed(2) : "N/A"}
                    </td>
                    <td className="p-3 dark:text-gray-300">{product.description}</td>
                    <td className="p-3">
                      <button
                        onClick={() => {
                          setSelectedProductId(product._id);
                          setUpdateProduct({
                            img: product.img,
                            type: product.type,
                            title: product.title,
                            price: product.price.toString(),
                            description: product.description,
                          });
                          setIsUpdateFormOpen(true);
                        }}
                        className="mr-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Order Details Table */}
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">
            Manage Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  <th className="p-3 text-left">Order ID</th>
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Total Price</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                 
                  <tr key={order._id} className="border-t dark:border-gray-700">
                    <td className="p-3 dark:text-gray-300">{order._id}</td>
                    <td className="p-3 dark:text-gray-300">
                      {order.userDetails.name} ({order.userDetails.email})
                    </td>
                    <td className="p-3 dark:text-gray-300">
                      ${typeof order.totalPrice === "number" ? order.totalPrice.toFixed(2) : "N/A"}
                    </td>
                    <td className="p-3 dark:text-gray-300">{order.status}</td>
                    <td className="p-3">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                        className="p-1 border rounded dark:bg-gray-700 dark:text-white"
                      >
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          {/* ==================== AI ANALYTICS DASHBOARD ==================== */}
<h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mt-10 mb-6">
  AI Insights & Analytics
</h2>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
  
  {/* Order Trends Line Chart */}
  <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
    <h3 className="text-lg font-semibold mb-3 dark:text-white">📈 Order Trends</h3>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={orderTrendData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke="#ccc" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>

  {/* Product Demand Bar Chart */}
  <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
    <h3 className="text-lg font-semibold mb-3 dark:text-white">🛍️ Product Demand</h3>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={productDemandData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#ccc" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="orders" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* Revenue Distribution Pie Chart */}
  <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
    <h3 className="text-lg font-semibold mb-3 dark:text-white">💰 Revenue by Status</h3>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={revenueData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {revenueData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>


          {/* Add Product Popup Form */}
          {isAddFormOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-xl font-bold dark:text-white mb-4">Add New Product</h3>
                <input
                  type="text"
                  name="_id"
                  value={newProduct._id}
                  onChange={handleInputChange}
                  placeholder="ID (e.g., 1)"
                  className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  name="img"
                  value={newProduct.img}
                  onChange={handleInputChange}
                  placeholder="Image URL"
                  className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  name="type"
                  value={newProduct.type}
                  onChange={handleInputChange}
                  placeholder="Type (e.g., tshirt)"
                  className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  name="title"
                  value={newProduct.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                  className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                  className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
                <div className="flex justify-between">
                  <button
                    onClick={handleAddProduct}
                    className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsAddFormOpen(false)}
                    className="px-6 py-2 bg-gray-500 text-white rounded-full"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Update Product Popup Form */}
          {isUpdateFormOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-xl font-bold dark:text-white mb-4">Update Product</h3>
                <input
                  type="text"
                  name="img"
                  value={updateProduct.img}
                  onChange={handleUpdateInputChange}
                  placeholder="Image URL"
                  className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  name="type"
                  value={updateProduct.type}
                  onChange={handleUpdateInputChange}
                  placeholder="Type (e.g., tshirt)"
                  className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  name="title"
                  value={updateProduct.title}
                  onChange={handleUpdateInputChange}
                  placeholder="Title"
                  className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="number"
                  name="price"
                  value={updateProduct.price}
                  onChange={handleUpdateInputChange}
                  placeholder="Price"
                  className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  name="description"
                  value={updateProduct.description}
                  onChange={handleUpdateInputChange}
                  placeholder="Description"
                  className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
                <div className="flex justify-between">
                  <button
                    onClick={handleUpdateProduct}
                    className="px-6 py-2 bg-blue-500 text-white rounded-full"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      setIsUpdateFormOpen(false);
                      setUpdateProduct({ img: "", type: "", title: "", price: "", description: "" });
                      setSelectedProductId(null);
                    }}
                    className="px-6 py-2 bg-gray-500 text-white rounded-full"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default AdminPanel;