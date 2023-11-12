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
    // console.log(e.target.value);
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
      const response = await axios.put(
        `http://localhost:8080/inventories/${params.id}`,
        {
          warehouse_id: selectedInventory.warehouse_id,
          item_name: selectedInventory.item_name,
          description: selectedInventory.description,
          category: selectedInventory.category,
          status: selectedInventory.status,
          quantity: selectedInventory.quantity,
        }
      );
      navigate("/inventory/list");
    } catch (err) {
      console.log("form not submitted", err);
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

      <form className="inventoryEditForm" onSubmit={handleFormSubmit}>
        <div className="inventoryEditForm-sections">
          <section className="inventoryEditForm-section1">
            <h2 className="inventoryEdit__h2">Item Details</h2>

            <div className="inventoryEditForm__name">
              <label className="inventoryEdit__h3">Item Name</label>
              <input
                className="editInput-name"
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

            <div className="inventoryEditForm__description">
              <label className="inventoryEdit__h3">Description</label>
              <textarea
                className="editInput-description"
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

            <div className="inventoryEditForm__category">
              <label className="inventoryEdit__h3">Category</label>

              <select
                className="editInput__category"
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

          <section className="inventoryEditForm-section2">
            <h2 className="inventoryEdit__h2">Item Availability</h2>

            <div className="inventoryEditForm__status">
              <h3 className="inventoryEdit__h3">Status</h3>

              <div className="inventoryEditForm__radio">
                <section className="inventoryEditForm__radio-input">
                  <input
                    className="editInput__status"
                    type="radio"
                    name="stockStatus"
                    id="in-stock"
                    value="In Stock"
                    checked={selectedInventory.status === "In Stock"}
                    onChange={handleStatusChange}
                  />
                  <label className="editInput__status-label" htmlFor="in-stock">
                    In Stock
                  </label>
                </section>

                <section className="inventoryEditForm__radio-input">
                  <input
                    className="editInput__status"
                    type="radio"
                    name="stockStatus"
                    id="out-of-stock"
                    value="Out of Stock"
                    checked={selectedInventory.status === "Out of Stock"}
                    onChange={handleStatusChange}
                  />
                  <label
                    className="editInput__status-label"
                    htmlFor="out-of-stock"
                  >
                    Out of Stock
                  </label>
                </section>
              </div>
            </div>

            <div className="inventoryEditForm__quantity">
              <label className="inventoryEdit__h3">Quantity</label>
              <input
                className="editInput-quantity"
                type="text"
                name="item-quantity"
                value={selectedInventory.quantity}
                onChange={(e) =>
                  setSelectedInventory({
                    ...selectedInventory,
                    quantity: e.target.value,
                  })
                }
              />
            </div>

            <div className="inventoryEditForm__warehouse">
              <label className="inventoryEdit__h3">Warehouse</label>

              <select
                className="editInput__warehouse"
                onChange={handleWarehouseChange}
                value={selectedInventory.warehouse_id}
              >
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

        <div className="inventoryEditForm__buttons">
          <Link to="/inventory/list" className="inventoryEditButton">
            <input
              className="inventoryEditButton inventoryEditButton__cancel"
              type="button"
              value="Cancel"
            ></input>
          </Link>
          <input
            type="submit"
            className="inventoryEditButton inventoryEditButton__save"
            value="Save"
          ></input>
        </div>
      </form>
    </div>
  );
}

export default InventoryEdit;
