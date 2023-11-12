import React, { useEffect, useState } from "react";
import "./WarehouseEdit.scss";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const validator = require("validator");

function isValidPhoneNumber(phoneNumber) {
  const formats = [
    /^\+\d{1,4}\s?\(\d{3}\)\s?\d{3}-\d{4}$/,
    /^1\s?\d{3}\s?\d{3}\s?\d{4}$/,
    /^\d{3}\s?\d{3}\s?\d{4}$/,
  ];
  return formats.some((format) => format.test(phoneNumber));
}

function WarehouseEdit() {
  const params = useParams();
  const navigate = useNavigate();

  const [selectedWarehouse, setSelectedWarehouse] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  });

  // need to add a try/catch below

  useEffect(() => {
    const getSelectedWarehouse = async () => {
      const response = await axios.get(
        `http://localhost:8080/warehouses/${params.id}`
      );
      setSelectedWarehouse(response.data);
      // console.log('response data', response.data);
    };
    getSelectedWarehouse();
  }, [params.id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!isValidPhoneNumber(selectedWarehouse.contact_phone)) {
        alert(
          "Invalid phone number.\nPlease enter a valid phone number.\n(e.g., +1 (646) 123-1234)"
        );
      }

      if (!validator.isEmail(selectedWarehouse.contact_email)) {
        alert(
          "Invalid Email format.\nPlease enter a valid email address. \n(e.g., example@example.com)"
        );
        return;
      }

      await axios.put(`http://localhost:8080/warehouses/${params.id}`, {
        warehouse_name: selectedWarehouse.warehouse_name,
        address: selectedWarehouse.address,
        city: selectedWarehouse.city,
        country: selectedWarehouse.country,
        contact_name: selectedWarehouse.contact_name,
        contact_position: selectedWarehouse.contact_position,
        contact_phone: selectedWarehouse.contact_phone,
        contact_email: selectedWarehouse.contact_email,
      });
      alert("Successfully Edited Warehouse!");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="warehouseedit" onSubmit={handleFormSubmit}>
        <h1 className="warehouseedit__header">Edit Warehouses</h1>
        <div className="warehouseedit__details">
          <h2 className="warehouseedit__details-header">Warehouse Details</h2>
          Warehouse Name
          <input
            className="warehouseedit__name"
            type="text"
            value={selectedWarehouse.warehouse_name}
            onChange={(e) =>
              setSelectedWarehouse({
                ...selectedWarehouse,
                warehouse_name: e.target.value,
              })
            }
            required
          />
          Street Address
          <input
            className="warehouseedit__street"
            type="text"
            value={selectedWarehouse.address}
            onChange={(e) =>
              setSelectedWarehouse({
                ...selectedWarehouse,
                address: e.target.value,
              })
            }
            required
          />
          City
          <input
            className="warehouseedit__cityedit"
            type="text"
            value={selectedWarehouse.city}
            onChange={(e) =>
              setSelectedWarehouse({
                ...selectedWarehouse,
                city: e.target.value,
              })
            }
            required
          />
          Country
          <input
            className="warehouseedit__country"
            type="text"
            value={selectedWarehouse.country}
            onChange={(e) =>
              setSelectedWarehouse({
                ...selectedWarehouse,
                country: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="warehouseedit__contacts">
          <h2 className="warehouseedit__contacts-header">Contact Details</h2>
          Contact Name
          <input
            className="warehouseedit__name"
            type="text"
            value={selectedWarehouse.contact_name}
            onChange={(e) =>
              setSelectedWarehouse({
                ...selectedWarehouse,
                contact_name: e.target.value,
              })
            }
            required
          />
          Position
          <input
            className="warehouseedit__position"
            type="text"
            value={selectedWarehouse.contact_position}
            onChange={(e) =>
              setSelectedWarehouse({
                ...selectedWarehouse,
                contact_position: e.target.value,
              })
            }
            required
          />
          Phone Number
          <input
            className="warehouseedit__phone"
            type="text"
            value={selectedWarehouse.contact_phone}
            onChange={(e) =>
              setSelectedWarehouse({
                ...selectedWarehouse,
                contact_phone: e.target.value,
              })
            }
            required
          />
          Email
          <input
            className="warehouseedit__email"
            type="text"
            value={selectedWarehouse.contact_email}
            onChange={(e) =>
              setSelectedWarehouse({
                ...selectedWarehouse,
                contact_email: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="warehouseedit__button-container">
          <button className="warehouseedit__button warehouseedit__button-cancel">
            Cancel
          </button>
          <button
            className="warehouseedit__button warehouseedit__button-save"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}

export default WarehouseEdit;
