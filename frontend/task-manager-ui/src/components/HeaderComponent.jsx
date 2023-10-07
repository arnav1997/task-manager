import React from "react";
import { NavLink } from "react-router-dom";
import { isUserLoggedIn, logout } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const navigator = useNavigate();
  const isAuth = isUserLoggedIn();
  const handleLogout = () => {
    logout();
    navigator("/login");
  };
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div>
            <a className="navbar-brand m-3">Task Management System</a>
          </div>
          <div>
            <ul className="navbar-nav">
              {isAuth && (
                <li className="nav-item">
                  <NavLink to="/tasks" className="nav-link">
                    Tasks
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          {!isAuth && (
            <ul className="navbar-nav ms-auto me-3">
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </li>
            </ul>
          )}
          {isAuth && (
            <ul className="navbar-nav ms-auto me-3">
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className="nav-link"
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          )}
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;