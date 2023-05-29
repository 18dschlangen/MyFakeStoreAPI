import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import AddItem from "./components/AddItem";
import DeleteItem from "./components/DeleteItem";
import EditItem from "./components/EditItem";
import ViewItems from "./components/ViewItems";
import Logout from "./components/Logout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/add-item">Add Item</Link>
                </li>
                <li>
                  <Link to="/delete-item">Delete Item</Link>
                </li>
                <li>
                  <Link to="/edit-item">Edit Item</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            <li>
              <Link to="/view-items">View Items</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={() => setIsLoggedIn(true)} />}
          />
          {isLoggedIn && (
            <>
              <Route
                path="/add-item"
                element={<AddItem isLoggedIn={isLoggedIn} />}
              />
              <Route
                path="/delete-item"
                element={<DeleteItem isLoggedIn={isLoggedIn} />}
              />
              <Route
                path="/edit-item"
                element={<EditItem isLoggedIn={isLoggedIn} />}
              />
              <Route
                path="/logout"
                element={<Logout onLogout={() => setIsLoggedIn(false)} />}
              />
            </>
          )}
          <Route path="/view-items" element={<ViewItems />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
