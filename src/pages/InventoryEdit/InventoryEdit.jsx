import React, { useEffect, useState } from "react";
import "./InventoryEdit.scss";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

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

  const [warehouseList, setWarehouseList] = useState([]);

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
      // console.log(response.data);
      // console.log(warehouseList);
    };
    getWarehouseList();
  }, []);

  useEffect(() => {
    const getSelectedInventory = async () => {
      const response = await axios.get(
        `http://localhost:8080/inventories/${params.id}`
      );
      setSelectedInventory(response.data);
      // console.log(response.data);
    };
    getSelectedInventory();
  }, [params.id]);

  //
  const handleStatusChange = (e) => {
    setSelectedInventory({
      ...selectedInventory,
      status: e.target.value,
    });
    console.log(e.target.value);
  };
  // const handleWarehouseChange = (e) => {
  //   console.log(e.target.value);
  //   setSelectedInventory(JSON.parse(e.target.value));
  // };
  //

  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5050/inventories/${params.id}`,
        {
          warehouse_id: e.target.warehouse_id.value,
          item_name: e.target.item_name.value,
          description: e.target.description.value,
          category: e.target.category.value,
          status: e.target.status.value,
          quantity: e.target.quantity.value,
        }
      );
      navigate("/");
    } catch (err) {
      console.log("form not submitted");
    }
  };

  return (
    <div className="inventoryEdit">
      <div className="inventoryEdit-header">
        <Link to="/inventory/list">
          <label htmlFor="back-button" className="inventoryEdit-header__label">
            <img src={back} alt="back icon" />
          </label>
        </Link>
        <h1 className="inventoryEdit__h1">Edit Inventory Item</h1>
      </div>

      <form className="form" onSubmit={handleFormSubmit}>
        <section className="form-section1">
          <h2 className="inventoryEdit__h2">Item Details</h2>

          <div className="form__name">
            <label className="inventoryEdit__h3">Item Name</label>
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
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
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
                  checked={selectedInventory.status === "In Stock"}
                  onChange={handleStatusChange}
                />
                <label className="input__status-label" htmlFor="in-stock">
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
                  checked={selectedInventory.status === "Out of Stock"}
                  onChange={handleStatusChange}
                />
                <label className="input__status-label" htmlFor="out-of-stock">
                  Out of Stock
                </label>
              </section>
            </div>
          </div>

          <div className="form__warehouse">
            <label className="inventory__h3">Warehouse</label>

            {/* <select
              className="input__warehouse"
              onChange={handleWarehouseChange}
              // defaultValue={selectedInventory}
            >
              {warehouseList.map((warehouse) => {
                return (
                  <option
                    key={warehouse.id}
                    value={JSON.stringify(warehouse)}
                    // selected={selectedInventory.item_name}
                  >
                    {warehouse.warehouse_name}
                  </option>
                );
              })}
            </select> */}

            <select className="input__warehouse">
              {warehouseList.map((warehouse) => {
                return (
                  <option
                    key={warehouse.id}
                    selected={selectedInventory.warehouse_id === warehouse.id}
                  >
                    {warehouse.warehouse_name}
                  </option>
                );
              })}
            </select>
          </div>
        </section>

        <div className="form__buttons">
          <Link to="/inventory/list" className="button">
            <input
              className="button button__cancel"
              type="button"
              value="Cancel"
            ></input>
          </Link>
          <input
            type="submit"
            className="button button__save"
            value="Save"
          ></input>
        </div>
      </form>
    </div>
  );
}

export default InventoryEdit;
