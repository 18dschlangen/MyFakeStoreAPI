import React, { useState, useEffect } from "react";

function ViewItems() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/items");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Items</h2>
      {items.map((item) => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <p>Price: {item.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
}

export default ViewItems;
