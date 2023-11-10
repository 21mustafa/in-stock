import React, { useEffect, useState } from "react";
import "./InventoryEdit.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

//images
import back from "../../assets/icons/arrow_back-24px.svg";

function InventoryEdit(props) {
  const params = useParams();

  // console.log(params.id);

  const [selectedInventory, setSelectedInventory] = useState({
    warehouse_id: "",
    item_name: "",
    description: "",
    category: "",
    status: "",
    quantity: "",
  });

  const categories = [
    "Accessories",
    "Apparel",
    "Electronics",
    "Health",
    "Gear",
  ];

  const warehouseMapping = {
    1: "New York",
    2: "Washington",
    3: "Jersey",
    4: "SF",
    5: "Santa Monica",
    6: "Miami",
    7: "Boston",
  };

  useEffect(() => {
    const getSelectedInventory = async () => {
      const response = await axios.get(
        `http://localhost:8080/inventories/${params.id}`
      );
      setSelectedInventory(response.data);
      console.log(response.data);
    };
    getSelectedInventory();
  }, [params.id]);

  //
  const handleStatusChange = (e) => {
    setSelectedInventory(e.target.value);
  };
  //
  return (
    <div className="inventory">
      <div className="inventory-header">
        <Link to="/inventory/list">
          <label htmlFor="back-button" className="inventory-header__label">
            <img src={back} alt="back icon" />
          </label>
        </Link>
        <h1 className="inventory__h1">Edit Inventory Item</h1>
      </div>

      <form className="form">
        <section className="form-section1">
          <h2 className="inventory__h2">Item Details</h2>

          <div className="form__name">
            <label className="inventory__h3">Item Name</label>
            <input
              className="input-name"
              type="text"
              name="item-name"
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

          <div className="form__description">
            <label className="inventory__h3">Description</label>
            <textarea
              className="input-description"
              name="item-description"
              cols="30"
              rows="10"
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

          <div className="form__category">
            <label className="inventory__h3">Category</label>
            <select className="input__category">
              {categories.map((category, index) => {
                return (
                  <option
                    key={categories.index}
                    selected={selectedInventory.category === category}
                  >
                    {category}
                  </option>
                );
              })}
            </select>
          </div>
        </section>
        <section className="form-section2">
          <h2 className="inventory__h2">Item Availability</h2>

          <div className="form__status">
            <h3 className="inventory__h3">Status</h3>

            <div className="form__radio">
              <section className="form__radio-input">
                <input
                  className="input__status"
                  type="radio"
                  name="stockStatus"
                  id="in-stock"
                  value="In Stock"
                  checked={setSelectedInventory === "In Stock"}
                  onChange={handleStatusChange}
                />
                <label className="input__status-label" id="in-stock">
                  In Stock
                </label>
              </section>

              <section className="form__radio-input">
                <input
                  className="input__status"
                  type="radio"
                  name="stockStatus"
                  id="out-of-stock"
                  value="Out of Stock"
                  checked={setSelectedInventory === "Out of Stock"}
                  onChange={handleStatusChange}
                />
                <label className="input__status-label" id="out-of-stock">
                  Out of Stock
                </label>
              </section>
            </div>
          </div>

          <div className="form__warehouse">
            <label className="inventory__h3">Warehouse</label>
            <select className="input__warehouse">
              {props.inventoryList.map((warehouse) => {
                return (
                  <option key={warehouse.id}>{warehouse.warehouse_id}</option>
                );
              })}
            </select>

            {/* <aside>
              <select className="input__warehouse">
                return (
                <option selected={selectedInventory.warehouse_id === warehouse.id}>
                  {warehouse}
                </option>
                );
              </select>
            </aside> */}
          </div>
        </section>
        {/* <select className="input__category">
          {categories.map((category, index) => {
            return (
              <option
                key={categories.index}
                selected={selectedInventory.category === category}
              >
                {category}
              </option>
            );
          })}
        </select> */}

        <div className="form__buttons">
          <button className="button button__cancel">Cancel</button>
          <button className="button button__save">Save</button>
        </div>
      </form>
    </div>
  );
}

export default InventoryEdit;
