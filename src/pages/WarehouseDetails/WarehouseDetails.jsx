import React, { useEffect } from "react";
import "./WarehouseDetails.scss";
import editIcon from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import arrowBackIcon from "../../assets/icons/arrow_back-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import chevronIcon from "../../assets/icons/chevron_right-24px.svg";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function WarehouseDetails() {
  const inStock = "In Stock";
  const params = useParams();

  const [warehouseDetails, setWarehouseDetails] = useState({});
  const [inventoryDetails, setInventoryDetails] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/warehouses/${params.id}`)
      .then((response) => {
        setWarehouseDetails(response.data);
        // console.log(response.data);
      });

    axios
      .get(`http://localhost:8080/warehouses/${params.id}/inventories`)
      .then((response) => {
        setInventoryDetails(response.data);
        // console.log(response.data);
      });
  }, [params.id]);

  {
    return (
      <>
        <div className="warehouse-details">
          <div className="warehouse-details__header">
            <Link to="/">
              <img className="arrowback-icon" src={arrowBackIcon} />
            </Link>
            <h1 className="warehouse-details__title">
              {warehouseDetails.warehouse_name}
            </h1>
          </div>
          <Link to="/edit/:id">
            <button className="edit-button">
              <img
                className="edit-button__img"
                src={editIcon}
                alt="edit icon"
              />
              <span className="edit-button__text">Edit</span>
            </button>
          </Link>
        </div>
        <ul className="warehouse-info__list">
          <li className="warehouse-info__list-item">
            <span className="warehouse__info">WAREHOUSE ADDRESS</span>
            <span className="warehouse__label-item">
              {warehouseDetails.address},{warehouseDetails.city},
              {warehouseDetails.country}
            </span>
          </li>
          <li className="warehouse-info__list-item2">
            <div className="warehouse-info__flexbox1">
              <span className="warehouse__info">CONTACT NAME</span>
              <span className="warehouse__label-item">
                {warehouseDetails.contact_name}
              </span>
              <span className="warehouse__label-item">
                {warehouseDetails.contact_position}
              </span>
            </div>
            <div className="warehouse-info__flexbox2">
              <span className="warehouse__info">CONTACT INFORMATION</span>
              <span className="warehouse__label-item">
                {warehouseDetails.contact_phone}
              </span>
              <span className="warehouse__label-item">
                {warehouseDetails.contact_email}
              </span>
            </div>
          </li>
        </ul>
        <ul className="toolbar">
          <li className="toolbar__container">
            <div className="toolbar__box">
              <div className="toolbar__flex1">
                <span className="toolbar__item">
                  INVENTORY ITEM
                  <img src={sortIcon} alt="sort icon" />
                </span>
                <span className="toolbar__item">
                  CATEGORY
                  <img src={sortIcon} alt="sort icon" />
                </span>
                <span className="toolbar__item">
                  STATUS
                  <img src={sortIcon} alt="sort icon" />
                </span>
              </div>
              <div className="toolbar__flex2">
                <span className="toolbar__item">
                  QUANTITY
                  <img src={sortIcon} alt="sort icon" />
                </span>
                <span className="toolbar__item">ACTIONS</span>
              </div>
            </div>
          </li>
        </ul>
        <ul className="warehouse__inventory-list">
          {inventoryDetails.map((inventory, index) => {
            return (
              <li key={index} className="warehouse__inventory">
                <div className="warehouse__inventory-row">
                  <div className="inventory-row__container">
                    <span className="warehouse__label-mobile">
                      INVENTORY ITEM
                    </span>
                    <Link to="/inventory/detail/:id">
                      <span className="warehouse__label-item warehouse__label-item--blue">
                        {inventory.item_name}
                        <img src={chevronIcon} alt="chevron icon"></img>
                      </span>
                    </Link>
                    <span className="warehouse__label-mobile">CATEGORY</span>
                    <span className="warehouse__label-item warehouse__label-item--width">
                      {inventory.category}
                    </span>
                  </div>
                  <div className="inventory-row__container inventory-row__container--table">
                    <span className="warehouse__label-mobile">STATUS</span>
                    <button
                      className={`${
                        inventory.status === inStock
                          ? "inventory-row__list-instock"
                          : "inventory-row__list-outstock"
                      }`}
                    >
                      {inventory.status}
                    </button>
                    <span className="warehouse__label-mobile">QTY</span>
                    <span className="warehouse__label-item warehouse__label-item--width2">
                      {inventory.quantity}
                    </span>
                  </div>
                </div>
                <div className="icon__container">
                  <img
                    className="icons"
                    src={deleteIcon}
                    alt="delete icon"
                  ></img>
                  <Link to="/edit/:id">
                    <img className="icons" src={editIcon} alt="edit icon"></img>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default WarehouseDetails;
