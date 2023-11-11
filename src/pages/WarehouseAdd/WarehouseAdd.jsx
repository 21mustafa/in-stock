import './WarehouseAdd.scss';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import axios from 'axios';

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
      <form className="warehouseedit" onSubmit={handleFormSubmit}>
        <h1 className="warehouseedit__header">Add New Warehouse</h1>
        <div className="warehouseedit__details">
          <h2 className="warehouseedit__details-header">Warehouse Details</h2>
          Warehouse Name
          <input
            className="warehouseedit__name"
            type="text"
            placeholder="Warehouse Name"
            value={formData.warehouse_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                warehouse_name: e.target.value,
              })
            }
          />
          Street Address
          <input
            className="warehouseedit__street"
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
            className="warehouseedit__cityedit"
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
            className="warehouseedit__country"
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
        <div className="warehouseedit__contacts">
          <h2 className="warehouseedit__contacts-header">Contact Details</h2>
          Contact Name
          <input
            className="warehouseedit__name"
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
            className="warehouseedit__position"
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
            className="warehouseedit__phone"
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
            className="warehouseedit__email"
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
        <div className="warehouseedit__button-container">
          <button className="warehouseedit__button warehouseedit__button-cancel">
            Cancel
          </button>
          <button
            className="warehouseedit__button warehouseedit__button-save"
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
