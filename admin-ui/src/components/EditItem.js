import React, { useState, useEffect } from "react";

function EditItem({ isLoggedIn }) {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch("http://localhost:3000/items", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    setItems(data);
  };

  const editItem = async (id) => {
    if (!isLoggedIn) {
      setError("You must be logged in to edit items.");
      return;
    }

    const response = await fetch(`http://localhost:3000/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: newName,
      }),
    });

    if (response.ok) {
      fetchItems(); // Refresh the items after editing
    } else {
      const errorMsg = await response.text();
      setError(errorMsg);
    }
  };

  return (
    <div>
      <select onChange={(e) => setSelectedItem(e.target.value)}>
        {items.map((item) => (
          <option value={item._id} key={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="New name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={() => editItem(selectedItem)}>Edit Item</button>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default EditItem;
