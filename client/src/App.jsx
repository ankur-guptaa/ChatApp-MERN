import Signup from "./pages/Signup.jsx";
import { Login } from "./pages/Login.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { useAuthContext } from "./context/AuthContext.jsx";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const { authUser, setAuthUser, setUserId } = useAuthContext();

  const verify = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/me`,
        {
          headers: {
            token: authUser,
          },
        }
      );
      setUserId(res.data.userId);
    } catch (error) {
      localStorage.removeItem("token");
      setAuthUser(null);
      setUserId(null);
    }
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        ></Route>
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        ></Route>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
