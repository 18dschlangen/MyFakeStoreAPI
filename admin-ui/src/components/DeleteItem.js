import React, { useState, useEffect } from "react";

function DeleteItem() {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchItems();
    }
  }, []);

  const fetchItems = async () => {
    const res = await fetch("http://localhost:3000/items", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    setItems(data);
  };

  const deleteItem = async (id) => {
    await fetch(`http://localhost:3000/items/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    fetchItems(); // Refresh the items after deletion
  };

  if (!token) {
    return <p>You must be logged in to delete items</p>;
  }

  return (
    <div>
      {items.map((item) => (
        <div key={item._id}>
          <span>{item.name}</span>
          <button onClick={() => deleteItem(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default DeleteItem;
