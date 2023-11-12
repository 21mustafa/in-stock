import React, { useEffect, useState } from "react";
import "./InventoryList.scss";
import axios from "axios";
import searchIcon from "../../assets/icons/search-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import forwardIcon from "../../assets/icons/chevron_right-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";

import { Link } from "react-router-dom";
import Popup from "../../components/Popup/Popup";

const sortOrder = ["ASC", "DES"];

function InventoryList(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState({ order: null, field: null });
  const [selectedItem, setSelectedItem] = useState("");

  const filteredInventoryList = props.inventoryList
    .map((item) => ({
      ...item,
      warehouse: props.warehouseList.find(
        (warehouse) => warehouse.id === item.warehouse_id
      ).warehouse_name,
    }))
    .filter((item) => item.item_name.toLowerCase().includes(searchTerm));

  let inventoryList;
  if (sort.order !== null && sort.field) {
    inventoryList = filteredInventoryList.sort((a, b) => {
      if (sortOrder[sort.order] === "ASC") {
        if (typeof a[sort.field] === "number") {
          return a[sort.field] > b[sort.field] ? 1 : -1;
        } else {
          return a[sort.field].localeCompare(b[sort.field]);
        }
      } else {
        if (typeof a[sort.field] === "number") {
          return a[sort.field] < b[sort.field] ? 1 : -1;
        } else {
          return b[sort.field].localeCompare(a[sort.field]);
        }
      }
    });
  } else {
    inventoryList = filteredInventoryList;
  }

  const onSort = (field) => {
    const nextSort = (sort.order + 1) % 2;
    setSort({
      field,
      order: nextSort,
    });
  };

  const getTableRows = () => {
    return inventoryList.map((item) => {
      return (
        <tr className="list__table-row">
          <td className="list__table-data--first">
            <Link
              className="list__value--link"
              to={`/inventory/detail/${item.id}`}
            >
              {item.item_name}
              <img className="list__icon" src={forwardIcon} alt="icon" />
            </Link>
          </td>
          <td className="list__table-data">{item.category}</td>
          <td className="list__table-data">
            <div
              className={
                item.status.toLowerCase().includes("in stock")
                  ? "list__tag--success"
                  : "list__tag--fail"
              }
            >
              {item.status}
            </div>
          </td>
          <td className="list__table-data">{item.quantity}</td>
          <td className="list__table-data">{item.warehouse}</td>
          <td className="list__table-data--icon">
            <button
              className="list__table-icon"
              onClick={() => {
                setIsPopupOpen(true);
                setSelectedItem(item.item_name);
              }}
            >
              <img src={deleteIcon} alt="delete icon" />
            </button>
            <Link to={`/inventory/edit/${item.id}`}>
              <img
                className="list__table-icon"
                src={editIcon}
                alt="edit icon"
              />
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
                  className="list__value--link"
                  to={`/inventory/detail/${item.id}`}
                >
                  {item.item_name}
                  <img className="list__icon" src={forwardIcon} alt="icon" />
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
                <div
                  className={
                    item.status.toLowerCase().includes("in stock")
                      ? "list__tag--success"
                      : "list__tag--fail"
                  }
                >
                  {item.status}
                </div>
              </div>
              <div className="list__row-item">
                <div className="list__row-label">QTY</div>
                <div className="list__row-value">{item.quantity}</div>
              </div>
              <div className="list__row-item">
                <div className="list__row-label">WAREHOUSE</div>
                <div className="list__row-value">{item.warehouse}</div>
              </div>
            </div>
          </div>

          <div className="list__row-actions">
            <button
              className="list__row-action"
              onClick={() => {
                setIsPopupOpen(true);
                setSelectedItem(item.item_name);
              }}
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
          title={`Delete ${selectedItem} inventory item?`}
          text={`Please confirm that you’d like to delete ${selectedItem} from the inventory list. You won’t be able to undo this action.`}
          onCancel={() => {
            setIsPopupOpen(false);
          }}
          onDelete={() => {}}
        />
      )}

      <div className="list__header">
        <h1 className="list__head">Inventory</h1>
        <div className="list__action">
          <div className="list__search">
            <input
              type="text"
              className="list__search-input"
              placeholder="Search..."
              onChange={(event) =>
                setSearchTerm(event.target.value.toLowerCase())
              }
            />
            <img
              src={searchIcon}
              className="list__search-icon"
              alt="search icon"
            />
          </div>

          <Link className="list__search-link" to={`/inventory/add`}>
            + Add New Item
          </Link>
        </div>
      </div>

      <table className="list__table--large">
        <tr className="list__table-row--header">
          <th className="list__table-header--first">
            <button
              className="list__table-header-content"
              onClick={() => {
                onSort("item_name");
              }}
            >
              <span>Inventory Item</span>
              <img
                className="list__table-header-icon"
                src={sortIcon}
                alt="sort icon"
              />
            </button>
          </th>
          <th className="list__table-header">
            <button
              className="list__table-header-content"
              onClick={() => {
                onSort("category");
              }}
            >
              <span>Category</span>
              <img
                className="list__table-header-icon"
                src={sortIcon}
                alt="sort icon"
              />
            </button>
          </th>
          <th className="list__table-header">
            <button
              className="list__table-header-content"
              onClick={() => {
                onSort("status");
              }}
            >
              <span>Status</span>
              <img
                className="list__table-header-icon"
                src={sortIcon}
                alt="sort icon"
              />
            </button>
          </th>
          <th className="list__table-header">
            <button
              className="list__table-header-content"
              onClick={() => {
                onSort("quantity");
              }}
            >
              <span>Qty</span>
              <img
                className="list__table-header-icon"
                src={sortIcon}
                alt="sort icon"
              />
            </button>
          </th>
          <th className="list__table-header">
            <button
              className="list__table-header-content"
              onClick={() => {
                onSort("warehouse");
              }}
            >
              <span>Warehouse</span>
              <img
                className="list__table-header-icon"
                src={sortIcon}
                alt="sort icon"
              />
            </button>
          </th>
          <th className="list__table-header--last">Actions</th>
        </tr>
        {getTableRows()}
      </table>

      <ul className="list__table--small">{getListItems()}</ul>
    </div>
  );
}

export default InventoryList;
