import './WarehouseAdd.scss';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import back from '../../assets/icons/arrow_back-24px.svg';
// import add from "../../assets/icons/add_white_24dp.svg";

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
  const [error, setError] = useState(true);
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
      if (
        !formData.warehouse_name ||
        !formData.address ||
        !formData.city ||
        !formData.country ||
        !formData.contact_name ||
        !formData.contact_position ||
        !formData.contact_phone ||
        !formData.contact_email
      ) {
        alert('Please fill in all fields.');
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
                error
                  ? 'warehouseadd__input warehouseadd__name warehouseadd__name--error'
                  : 'warehouseadd__name '
              }
              type="text"
              placeholder="Warehouse Name"
              value={formData.warehouse_name}
              onChange={(e) => {
                e.target.value !== '' ? setError(false) : setError(true);

                setFormData({
                  ...formData,
                  warehouse_name: e.target.value,
                });
              }}
            />
            {error && <p>Error</p>}
            Street Address
            <input
              className="warehouseadd__input warehouseadd__street"
              type="text"
              placeholder="Street Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: e.target.value,
                })
              }
            />
            City
            <input
              className="warehouseadd__input warehouseadd__cityedit"
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  city: e.target.value,
                })
              }
            />
            Country
            <input
              className="warehouseadd__input warehouseadd__country"
              type="text"
              placeholder="Country"
              value={formData.country}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  country: e.target.value,
                })
              }
            />
          </div>
          <div className="warehouseadd__contacts">
            <h2 className="warehouseadd__contacts-header">Contact Details</h2>
            Contact Name
            <input
              className="warehouseadd__input warehouseadd__name"
              type="text"
              placeholder="Contact Name"
              value={formData.contact_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact_name: e.target.value,
                })
              }
            />
            Position
            <input
              className="warehouseadd__input warehouseadd__position"
              type="text"
              placeholder="Position"
              value={formData.contact_position}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact_position: e.target.value,
                })
              }
            />
            Phone Number
            <input
              className="warehouseadd__input warehouseadd__phone"
              type="text"
              placeholder="Phone Number"
              value={formData.contact_phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact_phone: e.target.value,
                })
              }
            />
            Email
            <input
              className="warehouseadd__input warehouseadd__email"
              type="text"
              placeholder="Email"
              value={formData.contact_email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact_email: e.target.value,
                })
              }
            />
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
