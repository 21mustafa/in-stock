import React, { useEffect, useState } from "react";
import "./InventoryList.scss";
import axios from "axios";
import searchIcon from "../../assets/icons/search-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import forwardIcon from "../../assets/icons/chevron_right-24px.svg";
import { Link } from "react-router-dom";

function InventoryList(props) {
  const getTableRows = () => {
    return props.inventoryList.map((item) => {
      return (
        <tr className="list__table-row">
          <td className="list__table-data">
            <Link to={`/inventory/detail/${item.id}`}>{item.item_name}</Link>
          </td>
          <td className="list__table-data">{item.category}</td>
          <td className="list__table-data">{item.status}</td>
          <td className="list__table-data">{item.quantity}</td>
          <td className="list__table-data">{item.warehouse_id}</td>
          <td className="list__table-data--icon">
            <button>
              <img className="icons" src={deleteIcon} alt="delete icon" />
            </button>
            <Link to={`/inventory/edit/${item.id}`}>
              <img className="icons" src={editIcon} alt="edit icon" />
            </Link>
          </td>
        </tr>
      );
    });
  };

  const getListItems = () => {
    return props.inventoryList.map((item) => {
      return (
        <li>
          <div>
            <div>
              <div>INVENTORY ITEM</div>
              <Link to={`/inventory/detail/${item.id}`}>{item.item_name}</Link>
              <div>CATEGORY</div>
              <div>{item.category}</div>
            </div>
            <div>
              <div>STATUS</div>
              <div>{item.status}</div>
              <div>QTY</div>
              <div>{item.quantity}</div>
              <div>WAREHOUSE</div>
              <div>{item.warehouse_id}</div>
            </div>
          </div>

          <div>
            <button>
              <img className="icons" src={deleteIcon} alt="delete icon" />
            </button>
            <Link to={`/inventory/edit/${item.id}`}>
              <img className="icons" src={editIcon} alt="edit icon" />
            </Link>
          </div>
        </li>
      );
    });
  };

  return (
    <div className="list">
      <h1 className="list__header">Inventory</h1>
      <input type="text" />
      <Link to={`/inventory/edit`}>+ Add New Item</Link>

      <table className="list__table--large">
        <tr>
          <th>Inventory Item</th>
          <th>Category</th>
          <th>Status</th>
          <th>Qty</th>
          <th>Warehouse</th>
          <th>Actions</th>
        </tr>
        {getTableRows()}
      </table>

      <ul className="list__table--small">{getListItems()}</ul>
    </div>
  );
}

export default InventoryList;
