import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import avatar from "../picturs/avatar.jpg";
import { routecontact as routecontactPage } from "../pages/contactPage";
import { routelistPosts as routelistPostsPage } from "../pages/listpostsPage";

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
    <header className="main-header">
      <div className="menu-header">
        <nav className={`navbar-link body ${isActive ? "active" : ""}`}>
          {isInfoVisible && (
            <div className="user-info">
              <img src={avatar} alt="Avatar" />
              <div>
                <p>Евгений</p>
                <p>example@gmail.com</p>
              </div>
            </div>
          )}
          <div className="nav-container">
            {isActive && (
              <ul className="navbar-link">
                <NavLink
                  className="navbar-link-button"
                  to={routelistPostsPage()}
                  activeClassName={"linkActive"}
                  onClick={toggleActive}
                >
                  Список постов
                </NavLink>

                <NavLink
                  className="navbar-link-button"
                  to={routecontactPage()}
                  activeClassName={"linkActive"}
                  onClick={toggleActive}
                >
                  Обо мне
                </NavLink>
              </ul>
            )}
          </div>
        </nav>
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
