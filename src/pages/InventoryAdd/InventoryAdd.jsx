import React, { useEffect, useState } from "react";
import "./InventoryAdd.scss";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

//images
import back from "../../assets/icons/arrow_back-24px.svg";
import add from "../../assets/icons/add_white_24dp.svg";

function InventoryAdd() {
  const params = useParams();

  const [selectedInventory, setSelectedInventory] = useState({
    warehouse_id: "",
    item_name: "",
    description: "",
    category: "",
    status: "",
    quantity: "0",
  });
  const [warehouseList, setWarehouseList] = useState([]);

  const [error, setError] = useState({
    warehouse_id: false,
    item_name: false,
    description: false,
    category: false,
    status: false,
    quantity: false,
  });

  const categories = [
    "Accessories",
    "Apparel",
    "Electronics",
    "Health",
    "Gear",
  ];

  useEffect(() => {
    const getWarehouseList = async () => {
      const response = await axios.get(`http://localhost:8080/warehouses`);

      setWarehouseList(response.data);
    };
    getWarehouseList();
  }, []);

  //
  const handleStatusChange = (e) => {
    setSelectedInventory({
      ...selectedInventory,
      status: e.target.value,
    });
  };
  const handleWarehouseChange = (e) => {
    setSelectedInventory({
      ...selectedInventory,
      warehouse_id: e.target.value,
    });
  };
  //

  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedInventory.warehouse_id);
    try {
      const response = await axios.post(`http://localhost:8080/inventories`, {
        warehouse_id: selectedInventory.warehouse_id,
        item_name: selectedInventory.item_name,
        description: selectedInventory.description,
        category: selectedInventory.category,
        status: selectedInventory.status,
        quantity: selectedInventory.quantity,
      });
      navigate("/inventory/list");
    } catch (err) {
      console.log("error: ", err);
      alert("Please fill out all the information");
    }
  };

  return (
    <div className="inventoryAdd">
      <div className="inventoryAdd-header">
        <Link to="/inventory/list">
          <label htmlFor="back-button" className="inventoryAdd-header__label">
            <img src={back} alt="back icon" />
          </label>
        </Link>
        <h1 className="inventoryAdd__h1">Add New Inventory Item</h1>
      </div>

      <form className="inventoryAddForm" onSubmit={handleFormSubmit}>
        <div className="inventoryAddForm-sections">
          <section className="inventoryAddForm-section1">
            <h2 className="inventoryAdd__h2">Item Details</h2>

            <div className="inventoryAddForm__name">
              <label className="inventoryAdd__h3">Item Name</label>
              <input
                className="input-name"
                type="text"
                name="item-name"
                placeholder="Item Name"
                value={selectedInventory.item_name}
                onChange={(e) =>
                  setSelectedInventory({
                    ...selectedInventory,
                    item_name: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="inventoryAddForm__description">
              <label className="inventoryAdd__h3">Description</label>
              <textarea
                className="input-description"
                name="item-description"
                cols="30"
                rows="10"
                placeholder="Please enter a brief item description..."
                value={selectedInventory.description}
                onChange={(e) =>
                  setSelectedInventory({
                    ...selectedInventory,
                    description: e.target.value,
                  })
                }
                required
              ></textarea>
            </div>

            <div className="inventoryAddForm__category">
              <label className="inventoryAdd__h3">Category</label>
              <select
                className="input__category"
                value={selectedInventory.category}
                onChange={(e) =>
                  setSelectedInventory({
                    ...selectedInventory,
                    category: e.target.value,
                  })
                }
              >
                {/* <option value="" disabled selected>
                  Please select
                </option> */}
                {categories.map((category, index) => (
                  <option
                    key={index}
                    value={category}
                    placeholder="Please select"
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section className="inventoryAddForm-section2">
            <h2 className="inventoryEdit__h2">Item Availability</h2>

            <div className="inventoryAddForm__status">
              <h3 className="inventoryEdit__h3">Status</h3>

              <div className="inventoryAddForm__radio">
                <section className="inventoryAddForm__radio-input">
                  <input
                    className="input__status"
                    type="radio"
                    name="stockStatus"
                    id="in-stock"
                    value="In Stock"
                    checked={selectedInventory.status === "In Stock"}
                    onChange={handleStatusChange}
                  />
                  <label className="input__status-label" htmlFor="in-stock">
                    In Stock
                  </label>
                </section>

                <section className="inventoryAddForm__radio-input">
                  <input
                    className="input__status"
                    type="radio"
                    name="stockStatus"
                    id="out-of-stock"
                    value="Out of Stock"
                    checked={selectedInventory.status === "Out of Stock"}
                    onChange={handleStatusChange}
                  />
                  <label className="input__status-label" htmlFor="out-of-stock">
                    Out of Stock
                  </label>
                </section>
              </div>
            </div>

            <div className="inventoryAddForm__quantity">
              <label className="inventoryAdd__h3">Quantity</label>
              <input
                className="input-quantity"
                type="text"
                name="item-quantity"
                value={selectedInventory.quantity}
                onChange={(e) =>
                  setSelectedInventory({
                    ...selectedInventory,
                    quantity: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="inventoryAddForm__warehouse">
              <label className="inventoryAdd__h3">Warehouse</label>
              <select
                className="input__warehouse"
                onChange={handleWarehouseChange}
                value={selectedInventory.warehouse_id}
              >
                {/* <option value="" disabled selected>
                  Please select
                </option> */}
                {warehouseList.map((warehouse) => {
                  return (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.warehouse_name}
                    </option>
                  );
                })}
              </select>
            </div>
          </section>
        </div>

        <div className="inventoryAddForm__buttons">
          <Link to="/inventory/list" className="inventoryAddButton">
            <input
              className="inventoryAddButton inventoryAddButton__cancel"
              type="button"
              value="Cancel"
            ></input>
          </Link>

          <div className="inventoryAddButton inventoryAddButton-btn">
            <label htmlFor="add" className="inventoryAddButton__add-label">
              <img
                src={add}
                alt="add icon"
                className="inventoryAddButton__add-label-icon"
              />
            </label>
            <input
              type="submit"
              className="inventoryAddButton inventoryAddButton__add"
              value="Add Item"
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
}
export default InventoryAdd;
