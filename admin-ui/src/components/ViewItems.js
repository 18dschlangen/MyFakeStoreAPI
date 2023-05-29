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
    return <div className="text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="border p-4 flex flex-col items-center justify-between bg-white shadow-lg rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <img
              src={item.picture}
              alt={item.name}
              className="mb-2 object-cover w-full h-32"
            />
            <p>Price: {item.price}</p>
            <p>Category: {item.category}</p>
            <p>Description: {item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewItems;
