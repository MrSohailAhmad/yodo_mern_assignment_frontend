import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  // const location = useLocation();

  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/");
  };

  // const isAdmin = user?.role === UserRole.ADMIN;

  const menuItems = [
    {
      path: "/",
      icon: "",
      label: "Home",
    },
    {
      path: "/user",
      icon: "",
      label: "Users",
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="h-16 flex items-center justify-center font-bold text-xl border-b">
          Dashboard
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              className="block px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium"
              to={`${item.path}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={logout}
          className="absolute bottom-10 left-20 p-2 bg-blue-400 rounded text-white cursor-pointer"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white shadow flex items-center px-6">
          <div className="ml-auto flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.name}</span>
          </div>
        </header>
        <Outlet /> {/* Nested routes render here */}
      </div>
    </div>
  );
};

export default Dashboard;
