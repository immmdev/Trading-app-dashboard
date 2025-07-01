import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Menu = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const [selectedMenu, setSelectedMenu] = useState(0);

  const handleLogout = () => {
    logout();
  };

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container p-3">
      {/* Logo */}
      <div className="text-center mb-4">
        <img src="logo.png" alt="Logo" style={{ width: "50px" }} />
      </div>

      <ul className="list-unstyled menus mt-4" style={{ fontSize: "18px" }}>
        {/* Dashboard */}
        <li className="nav-item mt-1 ">
          <Link to="/" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(0)}>
            <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
          </Link>
        </li>

        {/* Orders */}
        <li className="nav-item mt-1">
          <Link to="/orders" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(1)}>
            <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
          </Link>
        </li>

        {/* Holdings */}
        <li className="nav-item mt-1 ">
          <Link to="/holdings" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(2)}>
            <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
          </Link>
        </li>

        {/* Positions */}
        <li className="nav-item mt-1">
          <Link to="/positions" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(3)}>
            <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
          </Link>
        </li>

        {/* Funds */}
        <li className="nav-item mt-1">
          <Link to="/funds" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(4)}>
            <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
          </Link>
        </li>

        {/* Apps */}
        <li className="nav-item mt-1">
          <Link to="/apps" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(5)}>
            <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>Apps</p>
          </Link>
        </li>

        {/* Wallet */}
        <li className="nav-item mt-2">
          <Link to="/wallet" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(6)}>
            <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
              <i className="fa-solid fa-wallet me-2 "></i>
            </p>
          </Link>
        </li>

        {/* If not logged in */}
        {!user && (
          <>
            <li className="nav-item mt-1">
              <Link to="/signup" className="nav-link" onClick={() => handleMenuClick(-1)}>
                <p className={menuClass}>Signup</p>
              </Link>
            </li>
            <li className="nav-item mt-1">
              <Link to="/login" className="nav-link" onClick={() => handleMenuClick(-2)}>
                <p className={menuClass}>Login</p>
              </Link>
            </li>
          </>
        )}

        {/* If logged in */}
        {user && (
          <>
            <li className="nav-item mt-1 mb-2">
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-outline-primary btn-sm px-3 py-1 fw-medium rounded logout-btn"
              >
                Logout
              </button>
            </li>

            <li className="nav-item mt-1 mb-2 ">
              <div
                className="d-flex justify-content-center align-items-center rounded-circle text-white fw-bold"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#387ed1",
                  fontSize: "18px",
                }}
              >
                {user.username?.charAt(0).toUpperCase()}
              </div>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Menu;
