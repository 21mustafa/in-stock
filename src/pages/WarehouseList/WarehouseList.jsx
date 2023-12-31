import React, { useState } from "react";
import axios from "axios";
import "./WarehouseList.scss";
import Popup from "../../components/Popup/Popup";
import searchIcon from "../../assets/icons/search-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import forwardIcon from "../../assets/icons/chevron_right-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import { Link } from "react-router-dom";

function WarehouseList(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  const openPopup = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedWarehouse(null);
    setIsPopupOpen(false);
  };

  const handleDelete = async (selectedWarehouse) => {
    setIsPopupOpen(false);
    await axios.delete(
      `http://localhost:8080/warehouses/${selectedWarehouse.id}`
    );
    await props.refreshWarehouseList();
  };

  return (
    <>
      {isPopupOpen && (
        <Popup
          title={`Delete ${selectedWarehouse.city} warehouse?`}
          text={`Please confirm that you'd like to delete the ${selectedWarehouse.city} from the list of warehouses. You won't be able to undo this action.`}
          onCancel={closePopup}
          onDelete={() => {
            void handleDelete(selectedWarehouse);
          }}
        />
      )}

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
          <Link to={`/add`}>
            <button className="warehouse__add-button">
              +Add New Warehouse
            </button>
          </Link>
        </div>
      </div>
      <ul className="warehouse__list-row">
        <li className="warehouse__label">
          <div className="warehouse__label-container1">
            <span className="warehouse__span">
              {" "}
              WAREHOUSE{" "}
              <img
                className="warehouse__sort-icon"
                src={sortIcon}
                alt="sort icon"
              />
            </span>
            <span className="warehouse__span">
              ADDRESS{" "}
              <img
                className="warehouse__sort-icon"
                src={sortIcon}
                alt="sort icon"
              />
            </span>
            <span className="warehouse__span">
              CONTACT NAME{" "}
              <img
                className="warehouse__sort-icon"
                src={sortIcon}
                alt="sort icon"
              />
            </span>
          </div>
          <div className="warehouse__label-container2">
            <span className="warehouse__span">
              CONTACT INFORMATION{" "}
              <img
                className="warehouse__sort-icon"
                src={sortIcon}
                alt="sort icon"
              />
            </span>
            <span className="warehouse__span">ACTIONS </span>
          </div>
        </li>
      </ul>

      <ul className="warehouse__list">
        {props.warehouseList.map((warehouse) => (
          <li key={warehouse.id} className="warehouse__list-item">
            <div className="parent-container">
              <div className="flexbox1">
                <div className="warehouse__description-container">
                  <span className="warehouse__label-mobile">Warehouse</span>
                  <Link to={`/details/${warehouse.id}`}>
                    <p className="warehouse__city">
                      {warehouse.city}
                      <img src={forwardIcon} alt="link icon" />
                    </p>
                  </Link>
                </div>
                <div className="warehouse__description-container">
                  <span className="warehouse__label-mobile">Address</span>
                  <p className="warehouse__address">
                    {warehouse.address}, {warehouse.city}, {warehouse.country}
                  </p>
                </div>
              </div>
              <div className="flexbox2">
                <div className="warehouse__description-container">
                  <span className="warehouse__label-mobile">Contact Name</span>
                  <p className="warehouse__contact-item">
                    {warehouse.contact_name}
                  </p>
                </div>
                <div className="warehouse__description-container">
                  <span className="warehouse__label-mobile">
                    Contact Information
                  </span>
                  <p className="warehouse__span">{warehouse.contact_phone}</p>
                  <p className="warehouse__span">{warehouse.contact_email}</p>
                </div>
              </div>
            </div>
            <div className="icon-container">
              <img
                className="icons"
                src={deleteIcon}
                alt="delete icon"
                onClick={() => openPopup(warehouse)}
              />
              <Link to={`/edit/${warehouse.id}`}>
                <img className="icons" src={editIcon} alt="edit icon" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default WarehouseList;
