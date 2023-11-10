import React, { useEffect } from "react";
import "./WarehouseDetails.scss";
import editIcon from "../../assets/icons/edit-24px.svg";
import arrowBackIcon from "../../assets/icons/arrow_back-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function WarehouseDetails() {
  const params = useParams();

  const [warehouseDetails, setWarehouseDetails] = useState({});
  const [inventoryDetails, setInventoryDetails] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/warehouses/${params.id}`)
      .then((response) => {
        setWarehouseDetails(response.data);
        // console.log(response.data);
      });
  }, [params.id]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/warehouses/${params.id}/inventories`)
      .then((response) => {
        setInventoryDetails(response.dat);
        // console.log(response.data);
      });
  }, [params.id]);

  {
    // props.warehouseDetails.map((warehouse) => {
    // console.log("props:", props);
    // console.log("hello:", props.warehouseList[0]);
    return (
      <>
        <div className="warehouse-details">
          <div className="warehouse-details__header">
            <img className="arrowback-icon" src={arrowBackIcon} />
            <h1 className="warehouse-details__title">
              {warehouseDetails.warehouse_name}
            </h1>
          </div>
          <div className="edit-icon">
            <img className="edit-icon__img" src={editIcon} alt="edit icon" />
          </div>
        </div>
        <ul className="warehouse-info__list">
          <li className="warehouse-info__list-item">
            <span className="warehouse__label">WAREHOUSE ADDRESS</span>
            <span>
              {warehouseDetails.address},{warehouseDetails.city},
              {warehouseDetails.country}
            </span>
          </li>
          <li className="warehouse-info__list-item2">
            <div className="warehouse-info__flexbox1">
              <span className="warehouse__label">CONTACT NAME</span>
              <span>{warehouseDetails.contact_name}</span>
              <span className="warehouse__label-item">
                {warehouseDetails.contact_position}
              </span>
            </div>
            <div className="warehouse-info__flexbox2">
              <span className="warehouse__label">CONTACT INFORMATION</span>
              <span>{warehouseDetails.contact_phone}</span>
              <span>{warehouseDetails.contact_email}</span>
            </div>
          </li>
        </ul>
        <ul className="toolbar">
          <li className="toolbar__container">
            <div className="toolbar__box1">
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
              <span className="toolbar__item">
                QUANTITY
                <img src={sortIcon} alt="sort icon" />
              </span>
              <span className="toolbar__item">
                ACTIONS
                <img src={sortIcon} alt="sort icon" />
              </span>
            </div>
          </li>
        </ul>
        {/* <ul className="warehouse__list warehouse__list--tablet">
        {props.warehouseDetails.map((warehouse) => {
          // console.log("props:", props);
          // console.log("warehouse:", warehouse);
          return;
          // <li key={index} className="warehouse__inventory">
          //   <div className="inventory-row">
          //     <div className="inventory-row__container">
          //           <span className="warehouse__label warehouse__label--tablet">INVENTORY ITEM</span>
          //           <span className="warehouse__label-item warehouse__label-item--blue">{}</span>
          //     </div>
          //   </div>
          // </li>
        })}
      </ul> */}
      </>
    );
    // });
  }
}

export default WarehouseDetails;
