import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; 

export default function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <button onClick={logout} style={{ cursor: "pointer" }}>
        Logout
      </button>
    </nav>
  );
}
