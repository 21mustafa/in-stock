import React, { useEffect, useState } from "react";
import "./InventoryEdit.scss";
import { useParams } from "react-router-dom";
import axios from "axios";

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

  // const warehouseMapping = {
  //   1: "New York",
  // };

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
      <h1 className="inventory__h1">Edit Inventory Item</h1>

      <form>
        <section className="inventory-details">
          <h2 className="inventory__h2">Item Details</h2>

          <h3 className="inventory__h3">Item Name</h3>
          <input
            className="item-name"
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

          <h3 className="inventory__h3">Description</h3>
          <textarea
            className="item-description"
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

          <h3 className="inventory__h3">Category</h3>
          <select>
            {categories.map((category) => {
              return (
                <option
                  // key={categories.index}
                  selected={selectedInventory.category === category}
                >
                  {category}
                </option>
              );
            })}
          </select>
        </section>

        <section className="invetory-availability">
          <h2 className="inventory__h2">Item Availability</h2>
          <h3 className="inventory__h3">Status</h3>
          <label>
            <input
              type="radio"
              name="stockStatus"
              value="In Stock"
              checked={setSelectedInventory === "In Stock"}
              onChange={handleStatusChange}
            />
            In Stock
          </label>
          <label>
            <input
              type="radio"
              name="stockStatus"
              value="Out of Stock"
              checked={setSelectedInventory === "Out of Stock"}
              onChange={handleStatusChange}
            />
            Out of Stock
          </label>

          <div>
            <h3 className="inventory__h3">Warehouse</h3>
            <select name="warehouse">
              {props.inventoryList.map((warehouse) => {
                return (
                  <option key={warehouse.id}>{warehouse.warehouse_id}</option>
                );
              })}
            </select>
          </div>
        </section>

        <div>
          <button>Cancel</button>
          <button>Save</button>
        </div>
      </form>
    </div>
  );
}

export default InventoryEdit;
