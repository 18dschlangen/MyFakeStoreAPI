import React, { useState } from "react";

function AddItem({ isLoggedIn }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Only allow a logged in user to add items
    if (!isLoggedIn) {
      setError("You must be logged in to add items.");
      return;
    }

    const response = await fetch("http://localhost:3000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: name,
        price: price,
        category: category,
        description: description,
        picture: picture,
      }),
    });

    if (response.ok) {
      const item = await response.json();
      setSuccess(true);
    } else {
      const errorMsg = await response.text();
      setError(errorMsg);
    }
  };

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
    >
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
        type="number"
        placeholder="Price"
        value={price === 0 ? "" : price} // This will ensure that 0 is displayed as an empty string
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
        type="text"
        placeholder="Picture URL"
        value={picture}
        onChange={(e) => setPicture(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6"
        type="submit"
      >
        Add item
      </button>
      {success && (
        <p className="text-green-500 pt-4">Item added successfully!</p>
      )}
      {error && <p className="text-red-500 pt-4">Error: {error}</p>}
    </form>
  );
}

export default AddItem;
