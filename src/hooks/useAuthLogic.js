// // src/hooks/useAuthLogic.js
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function useAuthLogic() {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token") || "");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   // --- Login handler ---
//   const handleLogin = async () => {
//     try {
//       console.log("Sending login request with:", email, password);
//       const res = await fetch("http://localhost:5000/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password })
//       });

//       if (!res.ok) {
//         throw new Error("Invalid credentials");
//       }

//       const data = await res.json();
//       localStorage.setItem("user", JSON.stringify(data.user));
//       localStorage.setItem("token", data.token);
//       setToken(data.token);
//       setUser(data.user);
//       navigate("/");

//     } catch (err) {
//       console.error("Login failed:", err.message);
//     }
//   };

//   // --- Logout handler ---
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setToken("");
//     setUser(null);
//     navigate("/login");
//   };

//   // --- Check logged-in user on page load / token change ---
//   useEffect(() => {
//     if (token) {
//       fetch("http://localhost:5000/api/me", {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//         .then(res => {
//           if (!res.ok) throw new Error("Unauthorized");
//           return res.json();
//         })
//         .then(data => setUser(data.user))
//         .catch(() => {
//           handleLogout(); // token invalid → logout
//         });
//     }
//   }, [token]);
//   useEffect(() => {
//   const storedUser = localStorage.getItem("user");
//   const storedToken = localStorage.getItem("token");
//   if (storedUser && storedToken) {
//     setUser(JSON.parse(storedUser));
//     setToken(storedToken);
//   }
// }, []);


//   return {
//     user,
//     token,
//     email,
//     password,
//     setEmail,
//     setPassword,
//     handleLogin,
//     handleLogout

//   };
// }

// export default useAuthLogic;
// src/hooks/useAuthLogic.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useAuthLogic() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // --- Login handler ---
  const handleLogin = async () => {
    try {
      console.log("Sending login request with:", email, password);
      const res = await fetch("/api/login", {  // proxy use ho rha hai, isliye full URL ki need nahi
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err.message);
    }
  };

  // --- Logout handler ---
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    navigate("/login");
  };

  // --- Auto-login from localStorage on first load ---
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // --- Verify token with backend whenever it changes ---
  useEffect(() => {
    if (token) {
      fetch("/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then((data) => setUser(data.user))
        .catch(() => {
          handleLogout(); // token invalid → logout
        });
    }
  }, [token]);

  return {
    user,
    token,
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    handleLogout,
  };
}

export default useAuthLogic;
