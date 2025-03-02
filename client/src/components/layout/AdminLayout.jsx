import { Navigate, NavLink, Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useAuth } from "../../store/auth";
import { FaUserLarge, FaMessage, FaHouse, FaUsersGear } from "react-icons/fa6";

export const AdminLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <div className="admin-container">
        <nav>
          <ul>
            <li>
              <NavLink to="/admin/users">
                <FaUserLarge />
                users
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/contacts">
                <FaMessage />
                contacts
              </NavLink>
            </li>
            <li>
              <NavLink to="/services">
                <FaUsersGear />
                services
              </NavLink>
            </li>
            <li>
              <NavLink to="/">
                <FaHouse />
                Home
              </NavLink>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
