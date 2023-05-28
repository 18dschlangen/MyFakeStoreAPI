import { useNavigate } from "react-router-dom";

function Logout({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/login"); // redirect to login page
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
