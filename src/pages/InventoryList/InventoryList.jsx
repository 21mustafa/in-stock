import React, { useEffect, useState } from "react";
import "./InventoryList.scss";
import axios from "axios";
import searchIcon from "../../assets/icons/search-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import forwardIcon from "../../assets/icons/chevron_right-24px.svg";
import { Link } from "react-router-dom";
import Popup from "../../components/Popup/Popup";

function InventoryList(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const inventoryList = props.inventoryList.filter((item) =>
    item.item_name.toLowerCase().includes(searchTerm)
  );

  const getTableRows = () => {
    return inventoryList.map((item) => {
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
            <button onClick={() => setIsPopupOpen(true)}>
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
    return inventoryList.map((item) => {
      return (
        <li className="list__row">
          <div className="list__row-info">
            <div className="list__row-items">
              <div className="list__row-item">
                <div className="list__row-label">INVENTORY ITEM</div>
                <Link
                  className="list__row-value"
                  to={`/inventory/detail/${item.id}`}
                >
                  {item.item_name}
                </Link>
              </div>
              <div className="list__row-item">
                <div className="list__row-label">CATEGORY</div>
                <div className="list__row-value">{item.category}</div>
              </div>
            </div>
            <div className="list__row-items">
              <div className="list__row-item">
                <div className="list__row-label">STATUS</div>
                <div className="list__row-value">{item.status}</div>
              </div>
              <div className="list__row-item">
                <div className="list__row-label">QTY</div>
                <div className="list__row-value">{item.quantity}</div>
              </div>
              <div className="list__row-item">
                <div className="list__row-label">WAREHOUSE</div>
                <div className="list__row-value">{item.warehouse_id}</div>
              </div>
            </div>
          </div>

          <div className="list__row-actions">
            <button
              className="list__row-action"
              onClick={() => setIsPopupOpen(true)}
            >
              <img className="icons" src={deleteIcon} alt="delete icon" />
            </button>
            <Link
              className="list__row-action"
              to={`/inventory/edit/${item.id}`}
            >
              <img className="icons" src={editIcon} alt="edit icon" />
            </Link>
          </div>
        </li>
      );
    });
  };

  return (
    <div className="list">
      {isPopupOpen && (
        <Popup
          title="Delete Television inventory item?"
          text="Please confirm that you’d like to delete Television from the inventory list. You won’t be able to undo this action."
          onCancel={() => {
            setIsPopupOpen(false);
          }}
          onDelete={() => {}}
        />
      )}

      <h1 className="list__header">Inventory</h1>
      <div className="list__search">
        <input
          type="text"
          className="list__search-input"
          onChange={(event) => setSearchTerm(event.target.value.toLowerCase())}
        />
        <img src={searchIcon} className="list__search-icon" alt="search icon" />
      </div>

      <Link to={`/inventory/edit`}>+ Add New Item</Link>

      <table className="list__table--large">
        <tr className="list__table-row">
          <th className="list__table-header">Inventory Item</th>
          <th className="list__table-header">Category</th>
          <th className="list__table-header">Status</th>
          <th className="list__table-header">Qty</th>
          <th className="list__table-header">Warehouse</th>
          <th className="list__table-header">Actions</th>
        </tr>
        {getTableRows()}
      </table>

      <ul className="list__table--small">{getListItems()}</ul>
    </div>
  );
}

export default InventoryList;
