import './WarehouseAdd.scss';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import requiredError from '../../components/FormfieldError/Error';
import back from '../../assets/icons/arrow_back-24px.svg';

const validator = require('validator');

function isValidPhoneNumber(phoneNumber) {
  const formats = [
    /^\+\d{1,4}\s?\(\d{3}\)\s?\d{3}-\d{4}$/,
    /^1\s?\d{3}\s?\d{3}\s?\d{4}$/,
    /^\d{3}\s?\d{3}\s?\d{4}$/,
  ];
  return formats.some((format) => format.test(phoneNumber));
}

function WarehouseAdd() {
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

  const [formData, setFormData] = useState({
    warehouse_name: '',
    address: '',
    city: '',
    country: '',
    contact_name: '',
    contact_position: '',
    contact_phone: '',
    contact_email: '',
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const fieldErrors = {
        warehouse_name: !formData.warehouse_name,
        address: !formData.address,
        city: !formData.city,
        country: !formData.country,
        contact_name: !formData.contact_name,
        contact_position: !formData.contact_position,
        contact_phone: !formData.contact_phone,
        contact_email: !formData.contact_email,
      };

      setError(fieldErrors);

      if (Object.values(fieldErrors).some((fieldError) => fieldError)) {
        return;
      }

      if (!isValidPhoneNumber(formData.contact_phone)) {
        alert(
          'Invalid phone number.\nPlease enter a valid phone number.\n(e.g., +1 (646) 123-1234)'
        );
      }

      if (!validator.isEmail(formData.contact_email)) {
        alert(
          'Invalid Email format.\nPlease enter a valid email address. \n(e.g., example@example.com)'
        );
        return;
      }

      await axios.post(`http://localhost:8080/warehouses`, formData);
      alert('Successfully Added Warehouse!');
      navigate('/');
    } catch (err) {
      console.log('Failed to add warehouse', err);
    }
  };

  return (
    <>
      <form className="warehouseadd" onSubmit={handleFormSubmit}>
        <Link to="/">
          <label htmlFor="back-button" className="warehouseadd__header-label">
            <img src={back} alt="back icon" />
          </label>
        </Link>
        <h1 className="warehouseadd__header">Add New Warehouse</h1>
        <div className="warehouseadd__container">
          <div className="warehouseadd__details">
            <h2 className="warehouseadd__details-header">Warehouse Details</h2>
            Warehouse Name
            <input
              className={
                error.warehouse_name
                  ? 'warehouseadd__input warehouseadd__name warehouseadd__input--error'
                  : 'warehouseadd__input warehouseadd__name '
              }
              type="text"
              placeholder="Warehouse Name"
              value={formData.warehouse_name}
              onChange={(e) => {
                setError({
                  ...error,
                  warehouse_name: e.target.value === '',
                });
                setFormData({
                  ...formData,
                  warehouse_name: e.target.value,
                });
              }}
            />
            {error.warehouse_name && requiredError()}
            Street Address
            <input
              className={
                error.address
                  ? 'warehouseadd__input warehouseadd__street warehouseadd__input--error'
                  : 'warehouseadd__input warehouseadd__street '
              }
              type="text"
              placeholder="Street Address"
              value={formData.address}
              onChange={(e) => {
                setError({
                  ...error,
                  address: e.target.value === '',
                });
                setFormData({
                  ...formData,
                  address: e.target.value,
                });
              }}
            />
            {error.address && requiredError()}
            City
            <input
              className={
                error.city
                  ? 'warehouseadd__input warehouseadd__cityedit warehouseadd__input--error'
                  : 'warehouseadd__input warehouseadd__cityedit '
              }
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) => {
                setError({
                  ...error,
                  city: e.target.value === '',
                });
                setFormData({
                  ...formData,
                  city: e.target.value,
                });
              }}
            />
            {error.city && requiredError()}
            Country
            <input
              className={
                error.country
                  ? 'warehouseadd__input warehouseadd__country warehouseadd__input--error'
                  : 'warehouseadd__input warehouseadd__country '
              }
              type="text"
              placeholder="Country"
              value={formData.country}
              onChange={(e) => {
                setError({
                  ...error,
                  country: e.target.value === '',
                });
                setFormData({
                  ...formData,
                  country: e.target.value,
                });
              }}
            />
            {error.country && requiredError()}
          </div>
          <div className="warehouseadd__contacts">
            <h2 className="warehouseadd__contacts-header">Contact Details</h2>
            Contact Name
            <input
              className={
                error.contact_name
                  ? 'warehouseadd__input warehouseadd__name warehouseadd__input--error'
                  : 'warehouseadd__input warehouseadd__name '
              }
              type="text"
              placeholder="Contact Name"
              value={formData.contact_name}
              onChange={(e) => {
                setError({
                  ...error,
                  contact_name: e.target.value === '',
                });
                setFormData({
                  ...formData,
                  contact_name: e.target.value,
                });
              }}
            />
            {error.contact_name && requiredError()}
            Position
            <input
              className={
                error.contact_position
                  ? 'warehouseadd__input warehouseadd__position warehouseadd__input--error'
                  : 'warehouseadd__input warehouseadd__position '
              }
              type="text"
              placeholder="Position"
              value={formData.contact_position}
              onChange={(e) => {
                setError({
                  ...error,
                  contact_position: e.target.value === '',
                });
                setFormData({
                  ...formData,
                  contact_position: e.target.value,
                });
              }}
            />
            {error.contact_position && requiredError()}
            Phone Number
            <input
              className={
                error.contact_phone
                  ? 'warehouseadd__input warehouseadd__phone warehouseadd__input--error'
                  : 'warehouseadd__input warehouseadd__phone '
              }
              type="text"
              placeholder="Phone Number"
              value={formData.contact_phone}
              onChange={(e) => {
                setError({
                  ...error,
                  contact_phone: e.target.value === '',
                });
                setFormData({
                  ...formData,
                  contact_phone: e.target.value,
                });
              }}
            />
            {error.contact_phone && requiredError()}
            Email
            <input
              className={
                error.contact_email
                  ? 'warehouseadd__input warehouseadd__email warehouseadd__input--error'
                  : 'warehouseadd__input warehouseadd__email '
              }
              type="text"
              placeholder="Email"
              value={formData.contact_email}
              onChange={(e) => {
                setError({
                  ...error,
                  contact_email: e.target.value === '',
                });
                setFormData({
                  ...formData,
                  contact_email: e.target.value,
                });
              }}
            />
            {error.contact_email && requiredError()}
          </div>
        </div>
        <div className="warehouseadd__button-container">
          <Link to={'/'}>
            <button
              className="warehouseadd__button warehouseadd__button-cancel"
              type="button"
            >
              Cancel
            </button>
          </Link>
          <button
            className="warehouseadd__button warehouseadd__button-add"
            type="submit"
          >
            + Add Warehouse
          </button>
        </div>
      </form>
    </>
  );
}

export default WarehouseAdd;
