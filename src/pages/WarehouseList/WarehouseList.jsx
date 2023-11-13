import React from "react";
import "./WarehouseList.scss";
import searchIcon from "../../assets/icons/search-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import forwardIcon from "../../assets/icons/chevron_right-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import { Link } from "react-router-dom";

function WarehouseList(props) {
  return (
    <>
      <div className="warehouse">
        <h1 className="warehouse__header">Warehouses</h1>
        <div className="searchbar-container">
          <input
            className="search"
            type="text"
            placeholder="Search..."
            required
          />
          <img src={searchIcon} className="search-icon" alt="search icon" />
        </div>
        <Link to={`/add`}>
          <button className="warehouse__add-button">+Add New Warehouse</button>
        </Link>
      </div>
      <ul className="warehouse__list">
        {props.warehouseList.map((warehouse) => {
          return (
            <li key={warehouse.id} className="warehouse__list-item">
              <div className="parent-container">
                <div className="flexbox1">
                  <div className="warehouse__description-container">
                    <span className="warehouse__label">Warehouse</span>
                    <Link to={`/details/${warehouse.id}`}>
                      <p className="warehouse__city">
                        {warehouse.city}
                        <img src={forwardIcon} alt="link icon" />
                      </p>
                    </Link>
                  </div>
                  <div className="warehouse__description-container">
                    <span className="warehouse__label">Address</span>
                    <p>{warehouse.address}</p>
                  </div>
                </div>
                <div className="flexbox2">
                  <div className="warehouse__description-container">
                    <span className="warehouse__label">Contact Name</span>
                    <p className="warehouse__contact-item">
                      {warehouse.contact_name}
                    </p>
                  </div>
                  <div className="warehouse__description-container">
                    <span className="warehouse__label">
                      Contact Information
                    </span>
                    <p className="warehouse__info">{warehouse.contact_phone}</p>
                    <p className="warehouse__info">{warehouse.contact_email}</p>
                  </div>
                </div>
              </div>
              <div className="icon-container">
                <img className="icons" src={deleteIcon} alt="delete icon" />
                <Link to={`/edit/${warehouse.id}`}>
                  <img className="icons" src={editIcon} alt="edit icon" />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
      <ul className="warehouse__list-row">
        <li className="warehouse__label">
          WAREHOUSE <img src={sortIcon} />
        </li>
        <li className="warehouse__label">
          ADDRESS <img src={sortIcon} />
        </li>
        <li className="warehouse__label">
          CONTACT NAME <img src={sortIcon} />
        </li>
        <li className="warehouse__label">
          CONTACT INFORMATION <img src={sortIcon} />
        </li>
        <li className="warehouse__label">ACTIONS</li>
      </ul>
    </>
  );
}

export default WarehouseList;
