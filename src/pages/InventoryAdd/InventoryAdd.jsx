import React, { useEffect, useState } from "react";
import "./InventoryAdd.scss";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

//images
import back from "../../assets/icons/arrow_back-24px.svg";

function InventoryAdd(props) {
  <div className="inventoryAdd">
    <div className="inventoryAdd-header">
      <Link to="./inventory/list">
        <label htmlFor="back-button" className="inventoryAdd-header__label">
          <img src={back} alt="back icon" />
        </label>
      </Link>
      <h1 className="inventoryEdit__h1">Add New Inventory Item</h1>
    </div>
  </div>;
}
export default InventoryAdd;
