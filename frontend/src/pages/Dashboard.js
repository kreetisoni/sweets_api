import { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import "../styles.css";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { token, user, logout } = useContext(AuthContext);

  const [sweets, setSweets] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // to Fetch all sweets
  const fetchSweets = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get("/sweets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSweets(res.data || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch sweets");
      setSweets([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) fetchSweets();
  }, [token]);

  const addSweet = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/sweets",
        { name, category, price: parseFloat(price), quantity: parseInt(quantity) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setName(""); setCategory(""); setPrice(""); setQuantity("");
      fetchSweets();
    } catch (err) {
      console.error(err);
      setError("Failed to add sweet");
    }
  };

  const deleteSweet = async (id) => {
    try {
      await axios.delete(`/sweets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSweets();
    } catch (err) {
      console.error(err);
      setError("Failed to delete sweet");
    }
  };

  const purchaseSweet = async (id) => {
    try {
      await axios.post(`/sweets/${id}/purchase`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSweets();
    } catch (err) {
      console.error(err);
      setError("Failed to purchase sweet");
    }
  };

  const restockSweet = async (id, restockQty) => {
    try {
      await axios.post(
        `/sweets/${id}/restock`,
        { quantity: parseInt(restockQty) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchSweets();
    } catch (err) {
      console.error(err);
      setError("Failed to restock sweet");
    }
  };

  const searchSweets = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/sweets/search?query=${searchQuery}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSweets(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to search sweets");
    }
  };

  return (
    <div className="dashboard-container">
      {token ? (
        <>
          <h2 className="dashboard-title">
            Sweets Dashboard ({user?.role || "user"})
          </h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Admin Add Sweet Form */}
          {user?.role === "admin" && (
            <form className="add-sweet-form" onSubmit={addSweet}>
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
              <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
              <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
              <button type="submit">Add Sweet</button>
            </form>
          )}

          {/* Search */}
          <form style={{ margin: "1rem 0" }} onSubmit={searchSweets}>
            <input type="text" placeholder="Search sweets..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button type="submit">Search</button>
          </form>

          {/* Sweets List */}
          {loading ? (
            <p>Loading sweets...</p>
          ) : sweets.length > 0 ? (
            <ul className="sweet-list-container">
              {sweets.map((sweet) => (
                <li key={sweet.id}>
                  <span>
                    <strong>{sweet.name}</strong> - {sweet.category} - ${sweet.price} - Qty: {sweet.quantity}
                  </span>
                  <div>
                    <button onClick={() => purchaseSweet(sweet.id)}>Buy</button>
                    {user?.role === "admin" && (
                      <>
                        <button
                          onClick={() => {
                            const restockQty = prompt("Enter quantity to restock:");
                            if (restockQty) restockSweet(sweet.id, restockQty);
                          }}
                        >
                          Restock
                        </button>
                        <button className="delete-btn" onClick={() => deleteSweet(sweet.id)}>🗑️</button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No sweets found.</p>
          )}

          <div className="logout-wrapper">
            <button className="logout-btn" onClick={() => logout()}>Logout</button>
          </div>
        </>
      ) : (
        <p>Please log in to view the dashboard.</p>
      )}
    </div>
  );
}

export default Dashboard;
