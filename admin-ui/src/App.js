import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
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
            {!isLoggedIn ? (
              <>
                <li>
                  <Link to="/login">Admin Login</Link>
                </li>
                <li>
                  <Link to="/view-items">View Items</Link>
                </li>
              </>
            ) : (
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
                  <Logout onLogout={() => setIsLoggedIn(false)} />
                </li>
              </>
            )}
          </ul>
        </nav>

        <div>{isLoggedIn ? "Logged In" : "Not Logged In"}</div>

        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/add-item"
            element={<AddItem isLoggedIn={isLoggedIn} />}
          />
          <Route path="/delete-item" element={<DeleteItem />} />
          <Route
            path="/edit-item"
            element={<EditItem isLoggedIn={isLoggedIn} />}
          />
          <Route path="/view-items" element={<ViewItems />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
