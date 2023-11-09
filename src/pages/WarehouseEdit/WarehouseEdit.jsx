import React, { useEffect, useState } from "react";
import "./WarehouseEdit.scss";
import { useParams } from "react-router-dom";
import axios from "axios";

function WarehouseEdit(props) {
  const params = useParams();

  // console.log('this is params:id', params.id);

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

  return (
    <>
      <form className="warehouse">
        <h1 className="warehouse__header">Edit Warehouses</h1>
        <div className="warehouse__details">
          <h2 className="warehouse__details-header">Warehouse Details</h2>
          Warehouse Name
          <input
            className="warehouse__name"
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
            className="warehouse__street"
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
            className="warehouse__city"
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
            className="warehouse__country"
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
        <div className="warehouse__contacts">
          <h2 className="warehouse__contacts-header">Contact Details</h2>
          Contact Name
          <input
            className="warehouse__name"
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
            className="warehouse__position"
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
            className="warehouse__city"
            type="text"
            value={selectedWarehouse.contact_phone}
            onChange={(e) =>
              setSelectedWarehouse({
                ...selectedWarehouse,
                city: e.target.value,
              })
            }
            required
          />
          Email
          <input
            className="warehouse__country"
            type="text"
            value={selectedWarehouse.contact_email}
            onChange={(e) =>
              setSelectedWarehouse({
                ...selectedWarehouse,
                country: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="warehouse_button">
          <button>CANCEL</button>
          <button>SAVE</button>
        </div>
      </form>
      ;
    </>
  );
}

export default WarehouseEdit;
