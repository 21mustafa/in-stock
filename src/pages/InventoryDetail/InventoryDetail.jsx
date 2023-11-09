import React from "react";
import "./InventoryDetail.scss";
import { useParams } from "react-router-dom";

function InventoryDetail(props) {
  const params = useParams();

  return (
    <div className="inventory-detail">
      <h1>{params.id}</h1>
    </div>
  );
}

export default InventoryDetail;
