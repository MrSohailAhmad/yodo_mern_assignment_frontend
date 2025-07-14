import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Users from "./pages/Users";

import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import Home from "./pages/Home";
import Verifiy from "./pages/Verifiy";

const AppRoutes = () => {
  const { user, loading } = useAuth();
  console.log("user", user);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={!user ? <Login /> : <Navigate to={user ? "/home" : "/"} />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}
      />
      <Route
        path="/verify"
        element={!user ? <Verifiy /> : <Navigate to="/" />}
      />

      {/* User Dashboard Routes */}
      {/* {user?.role === UserRole.USER && ( */}
      <Route path="/" element={<Dashboard />}>
        <Route path="home" element={<Home />}></Route>

        <Route path="user" element={<Users />}></Route>
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      {/* )} */}

      {/* Fallbacks */}
    </Routes>
  );
};

export default AppRoutes;
