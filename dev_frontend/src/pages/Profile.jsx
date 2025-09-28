import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("iiiiiiiiiii",token);
    // if (!token) {
    //   navigate("/login");
    //   return;
    // }

    // Fetch user profile
    fetch("http://localhost:5000/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.name) {
          setUser(data);
        } else {
         
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
       
      });

    // Fetch user orders
    fetch("http://localhost:5000/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error("Unexpected orders data:", data);
          setOrders([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setOrders([]);
      });
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">My Profile</h2>
        <p className="dark:text-gray-300">Name: {user.name}</p>
        <p className="dark:text-gray-300">Email: {user.email}</p>

        <h3 className="text-xl font-semibold mt-6 mb-4 dark:text-white">Order History</h3>
        {orders.length === 0 ? (
          <p className="dark:text-gray-300">No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="border dark:border-gray-700 p-4 rounded-lg">
                <p className="dark:text-gray-300">
                  <strong>Order ID:</strong> {order._id}
                </p>
                <p className="dark:text-gray-300">
                  <strong>Total Price:</strong> ${order.totalPrice?.toFixed(2) || "N/A"}
                </p>
                <p className="dark:text-gray-300">
                  <strong>Status:</strong> {order.status}
                </p>
                <p className="dark:text-gray-300">
                  <strong>Date:</strong>{" "}
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : new Date(parseInt(order._id.toString().substring(0, 8), 16) * 1000).toLocaleDateString()}
                </p>
                <h4 className="font-semibold mt-2 dark:text-white">Items:</h4>
                <ul className="list-disc ml-5">
                  {order.items.map((item, index) => (
                    <li key={index} className="dark:text-gray-300">
                      <strong>
                        {item.product && item.product.title
                          ? item.product.title
                          : `Unknown Product (ID: ${item.product?._id || item.product || "N/A"})`}
                      </strong>{" "}
                      - $
                      {typeof item.price === "number"
                        ? item.price.toFixed(2)
                        : item.product?.price?.toFixed(2) || "N/A"}
                      {" x "}
                      {item.quantity || "N/A"}
                      <br />
                      <span>Color: {item.color || "N/A"}</span>
                      <br />
                      <span>Measurements:</span>
                      <ul className="ml-4">
                        {item.size &&
                          Object.entries(item.size).map(([key, value]) => (
                            <li key={key}>{key}: {value}</li>
                          ))}
                      </ul>
                      <span>
                        Product Details: {item.product && item.product.description ? item.product.description : "N/A"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate("/categories")}
          className="mt-6 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full"
        >
          Back to Categories
        </button>
      </div>
    </div>
  );
};

export default Profile;