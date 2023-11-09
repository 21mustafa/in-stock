import React, { useState } from "react";
import "./Header.scss";
import logo from "../../assets/logo/InStock-Logo_1x.png";
import { Link } from "react-router-dom";

function Header(props) {
  const [active, setActive] = useState("warehouse");
  return (
    <header className="header">
      <Link
        to={"/"}
        className="header__logo"
        onClick={() => {
          setActive("warehouse");
        }}
      >
        <img src={logo} alt="Logo"></img>
      </Link>
      <div className="header__links">
        <Link
          to={"/"}
          className={
            active === "warehouse"
              ? "header__link header__link--active"
              : "header__link"
          }
          onClick={() => {
            setActive("warehouse");
          }}
        >
          Warehouses
        </Link>

        <Link
          to={"/inventory/list"}
          className={
            active === "inventory"
              ? "header__link header__link--active"
              : "header__link"
          }
          onClick={() => {
            setActive("inventory");
          }}
        >
          Inventory
        </Link>
      </div>
    </header>
  );
}

export default Header;
