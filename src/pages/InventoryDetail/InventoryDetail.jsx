import React, { useEffect, useState } from "react";
import "./InventoryDetail.scss";
import { Link, useNavigate, useNavigation, useParams } from "react-router-dom";
import axios from "axios";
import backImage from "../../assets/icons/arrow_back-24px.svg";
import editImage from "../../assets/icons/Vector.svg";
import { Tag } from "../../components/Tag/Tag";

function InventoryDetail(props) {
  const params = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    void getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(
      `http://localhost:8080/inventories/${params.id}`
    );
    setItem(response.data);
  };

  return (
    <div className="inventory-detail">
      {!item ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="inventory-detail__head">
            <div className="inventory-detail__head-label">
              <Link to={`/inventory/list`}>
                <img
                  className="inventory-detail__head-icon--back"
                  src={backImage}
                  alt="back button"
                />
              </Link>

              <h1 className="inventory-detail__head-text">{item.item_name}</h1>
            </div>

            <Link
              className="inventory-detail__edit"
              to={`/inventory/edit/${item.id}`}
            >
              <img
                className="inventory-detail__edit-icon"
                src={editImage}
                alt="edit button"
              />
              <span className="inventory-detail__edit-text">Edit</span>
            </Link>
          </div>
          <div className="inventory-detail__content">
            <div className="inventory-detail__content-left">
              <div className="inventory-detail__info">
                <div className="inventory-detail__info-label">
                  Item Description
                </div>
                <div className="inventory-detail__info-value">
                  {item.description}
                </div>
              </div>

              <div className="inventory-detail__info">
                <div className="inventory-detail__info-label">Category</div>
                <div className="inventory-detail__info-value">
                  {item.category}
                </div>
              </div>
            </div>
            <div className="inventory-detail__content-right">
              <div className="inventory-detail__content-small">
                <div className="inventory-detail__info">
                  <div className="inventory-detail__info-label">Status</div>
                  <div className="inventory-detail__info-value">
                    <Tag
                      text={item.status}
                      status={
                        item.status.toLowerCase().includes("in stock")
                          ? "success"
                          : "fail"
                      }
                    />
                  </div>
                </div>
                <div className="inventory-detail__info">
                  <div className="inventory-detail__info-label">Quantity</div>
                  <div className="inventory-detail__info-value">
                    {item.quantity}
                  </div>
                </div>
              </div>

              <div className="inventory-detail__info">
                <div className="inventory-detail__info-label">Warehouse</div>
                <div className="inventory-detail__info-value">
                  {props.getWarehouse(item.warehouse_id)}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default InventoryDetail;
