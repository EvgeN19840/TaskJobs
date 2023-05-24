import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import avatar from "../picturs/avatar.jpg"

import "./styles.css";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
    setIsInfoVisible(!isInfoVisible);
  };

  useEffect(() => {
    document.body.classList.toggle("lock", isActive);
  }, [isActive]);

  return (
    <Router>
      <header className="main-header">
        <div className="menu-header">
       
          <nav className={`navbar-link body ${isActive ? "active" : ""}`}>
          {isInfoVisible && (
            <div className="user-info">
              <img src={avatar} alt="Avatar" />
              <div>
                <p>Евгений</p>
                <p>example@mail.com</p>
              </div>
            </div>
          )}
            <ul className="navbar-link">
              <NavLink
                className="navbar-link-button"
                to="/posts"
                activeClassName={"linkActive"}
                onClick={toggleActive}
              >
                Список постов
              </NavLink>

              <NavLink
                className="navbar-link-button"
                to="/about"
                activeClassName={"linkActive"}
                onClick={toggleActive}
              >
                Обо мне
              </NavLink>
            </ul>
          </nav>
          <div
            className={`header-burger body ${isActive ? "active" : ""}`}
            onClick={toggleActive}
          >
            <span></span>
          </div>
        </div>
      </header>
    </Router>
  );
};

export default Header;
