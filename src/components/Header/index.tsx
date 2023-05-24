import React, { useEffect, useState } from "react";

import {NavLink} from "react-router-dom"
import "./styles.css";

const Header = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };
  useEffect(() => {
    document.body.classList.toggle("lock", isActive);
  }, [isActive]);
  return (
    <header className="main-header">
      <div className="menu-header">
        {/* <nav className={`navbar-link body ${isActive ? "active" : ""}`}>
          <ul className="navbar-link">
          <NavLink
              className="navbar-link-button"
              // to={routeMainPage()}
              activeClassName={"linkActive"}
              onClick={toggleActive}
            >
              Список постов
            </NavLink>

            <NavLink
              className="navbar-link-button"
              // to={routeSearchPage()}
              activeClassName={"linkActive"}
              onClick={toggleActive}
            >
              Обо мне
            </NavLink>
          </ul>
        </nav> */}
        <div
          className={`header-burger body ${isActive ? "active" : ""}`}
          onClick={toggleActive}
        >
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
