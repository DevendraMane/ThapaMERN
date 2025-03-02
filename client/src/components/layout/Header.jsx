import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Header.css";
import { useAuth } from "../../store/auth";

export const Header = () => {
  const { isLoggedIn, user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  // Check for saved theme preference on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (darkMode) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">devaMERN</NavLink>
          </div>

          <nav>
            <ul className="nav_ul_list">
              <li>
                <NavLink to="/"> Home </NavLink>
              </li>
              <li>
                <NavLink to="/about"> About </NavLink>
              </li>
              <li>
                <NavLink to="/services"> Services </NavLink>
              </li>
              <li>
                <NavLink to="/contact"> Contact </NavLink>
              </li>

              {isLoggedIn ? (
                <>
                  {/* ✅ Show "Admin" link if the user is an admin */}
                  {user.isAdmin ? (
                    <li>
                      <NavLink to="/admin"> Admin </NavLink>
                    </li>
                  ) : null}

                  <li>
                    <NavLink to="/logout"> Logout </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/signup"> Register </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login"> Login </NavLink>
                  </li>
                </>
              )}

              {/* Dark Mode Toggle */}
              <li className="theme-toggle-container">
                <button
                  onClick={toggleDarkMode}
                  className="theme-toggle"
                  aria-label={
                    darkMode ? "Switch to light mode" : "Switch to dark mode"
                  }
                >
                  {darkMode ? "☀️" : "🌙"}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

// ?Just use <NavLink></NavLink> instead of <a></a> and to="" instead of href=""
// *↑↑↑We use this to avoid automatic re-rendering↑↑↑

//* React-Router automatically adds class="active to the page we are on"
