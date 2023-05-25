import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    // Only try to parse as JSON if the response is ok
    if (response.ok) {
      const token = await response.text(); // Get the token as text, not JSON

      localStorage.setItem("token", token);
      setLoggedIn(true);
    } else {
      // If there was an error, get the error message as text and set it as the error
      const errorMsg = await response.text();
      setError(errorMsg);
    }
  };

  return (
    <>
      {loggedIn ? (
        <p>Successfully logged in</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log in</button>
          {error && <p>Error: {error}</p>}
        </form>
      )}
    </>
  );
}

export default Login;
