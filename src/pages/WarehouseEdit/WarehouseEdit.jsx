import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import requiredError from "../../components/FormfieldError/Error";
import back from "../../assets/icons/arrow_back-24px.svg";
import "./WarehouseEdit.scss";

const validator = require("validator");

function isValidPhoneNumber(phoneNumber) {
  const formats = [
    /^\+\d{1,4}\s?\(\d{3}\)\s?\d{3}-\d{4}$/,
    /^1\s?\d{3}\s?\d{3}\s?\d{4}$/,
    /^\d{3}\s?\d{3}\s?\d{4}$/,
  ];
  return formats.some((format) => format.test(phoneNumber));
}

function WarehouseEdit(props) {
  const params = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState({
    warehouse_name: false,
    address: false,
    city: false,
    country: false,
    contact_name: false,
    contact_position: false,
    contact_phone: false,
    contact_email: false,
  });

  const [_formData, setFormData] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  });

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

  const handleInputChange = (field, value) => {
    setError((prevError) => ({
      ...prevError,
      [field]: value === "",
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
    setSelectedWarehouse((prevWarehouse) => ({
      ...prevWarehouse,
      [field]: value,
    }));
  };

  useEffect(() => {
    try {
      const getSelectedWarehouse = async () => {
        const response = await axios.get(
          `http://localhost:8080/warehouses/${params.id}`
        );
        setSelectedWarehouse(response.data);
      };
      getSelectedWarehouse();
    } catch (err) {
      console.log("Error fetching warehouse data:", err);
    }
  }, [params.id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const fieldErrors = {
        warehouse_name: !selectedWarehouse.warehouse_name,
        address: !selectedWarehouse.address,
        city: !selectedWarehouse.city,
        country: !selectedWarehouse.country,
        contact_name: !selectedWarehouse.contact_name,
        contact_position: !selectedWarehouse.contact_position,
        contact_phone: !selectedWarehouse.contact_phone,
        contact_email: !selectedWarehouse.contact_email,
      };

      setError(fieldErrors);

      if (Object.values(fieldErrors).some((fieldError) => fieldError)) {
        return;
      }

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
      await props.refreshWarehouseList();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="warehouseedit" onSubmit={handleFormSubmit}>
        <Link to="/">
          <label htmlFor="back-button" className="warehouseadd__header-label">
            <img src={back} alt="back icon" />
          </label>
        </Link>
        <h1 className="warehouseedit__header">Edit Warehouses</h1>
        <div className="warehouseedit__container">
          <div className="warehouseedit__details">
            <h2 className="warehouseedit__details-header">Warehouse Details</h2>
            Warehouse Name
            <input
              className={
                error.warehouse_name
                  ? "warehouseedit__input warehouseedit__name warehouseedit__input--error"
                  : "warehouseedit__input warehouseedit__name "
              }
              type="text"
              value={selectedWarehouse.warehouse_name}
              onChange={(e) =>
                handleInputChange("warehouse_name", e.target.value)
              }
            />
            {error.warehouse_name && requiredError()}
            Street Address
            <input
              className={
                error.address
                  ? "warehouseedit__input warehouseedit__address warehouseedit__input--error"
                  : "warehouseedit__input warehouseedit__address "
              }
              type="text"
              value={selectedWarehouse.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
            {error.address && requiredError()}
            City
            <input
              className={
                error.city
                  ? "warehouseedit__input warehouseedit__cityedit warehouseedit__input--error"
                  : "warehouseedit__input warehouseedit__cityedit "
              }
              type="text"
              value={selectedWarehouse.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
            {error.city && requiredError()}
            Country
            <input
              className={
                error.country
                  ? "warehouseedit__input warehouseedit__country warehouseedit__input--error"
                  : "warehouseedit__input warehouseedit__country "
              }
              type="text"
              value={selectedWarehouse.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
            />
            {error.country && requiredError()}
          </div>
          <div className="warehouseedit__contacts">
            <h2 className="warehouseedit__contacts-header">Contact Details</h2>
            Contact Name
            <input
              className={
                error.contact_name
                  ? "warehouseedit__input warehouseedit__name warehouseedit__input--error"
                  : "warehouseedit__input warehouseedit__name "
              }
              type="text"
              value={selectedWarehouse.contact_name}
              onChange={(e) =>
                handleInputChange("contact_name", e.target.value)
              }
            />
            {error.contact_name && requiredError()}
            Position
            <input
              className={
                error.contact_position
                  ? "warehouseedit__input warehouseedit__position warehouseedit__input--error"
                  : "warehouseedit__input warehouseedit__position "
              }
              type="text"
              value={selectedWarehouse.contact_position}
              onChange={(e) =>
                handleInputChange("contact_position", e.target.value)
              }
            />
            {error.contact_position && requiredError()}
            Phone Number
            <input
              className={
                error.contact_phone
                  ? "warehouseedit__input warehouseedit__phone warehouseedit__input--error"
                  : "warehouseedit__input warehouseedit__phone "
              }
              type="text"
              value={selectedWarehouse.contact_phone}
              onChange={(e) =>
                handleInputChange("contact_phone", e.target.value)
              }
            />
            {error.contact_phone && requiredError()}
            Email
            <input
              className={
                error.contact_email
                  ? "warehouseedit__input warehouseedit__email warehouseedit__input--error"
                  : "warehouseedit__input warehouseedit__email "
              }
              type="text"
              value={selectedWarehouse.contact_email}
              onChange={(e) =>
                handleInputChange("contact_email", e.target.value)
              }
            />
            {error.contact_email && requiredError()}
          </div>
        </div>

        <div className="warehouseedit__button-container">
          <Link
            className="warehouseedit__button warehouseedit__button-cancel"
            to={"/"}
          >
            Cancel
            <button type="button"></button>
          </Link>
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
