import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import "./App.scss";
import WarehouseList from "./pages/WarehouseList/WarehouseList";
import WarehouseDetails from "./pages/WarehouseDetails/WarehouseDetails";
import WarehouseEdit from "./pages/WarehouseEdit/WarehouseEdit";
import InventoryList from "./pages/InventoryList/InventoryList";
import InventoryDetail from "./pages/InventoryDetail/InventoryDetail";
import InventoryEdit from "./pages/InventoryEdit/InventoryEdit";
import warehousesJSON from "./warehous.json";
import { useState } from "react";
// const baseURL = "http://localhost:5050";

function App() {
  const [warehouseDetails, setWarehouseDetails] = useState(warehousesJSON);
  const [warehouseList, setWarehouseList] = useState(warehousesJSON);

  function selectWarehouse(id) {
    const selectedWarehouse = warehouseDetails.find(
      (warehouse) => warehouse.id === id
    );

    setWarehouseList(selectedWarehouse);
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<WarehouseList warehouseList={warehouseList} />}
          />
          <Route path="/details" element={<WarehouseDetails />} />
          <Route path="/edit" element={<WarehouseEdit />} />
          <Route path="/inventory/list" element={<InventoryList />} />
          <Route path="/inventory/detail" element={<InventoryDetail />} />
          <Route path="/inventory/edit" element={<InventoryEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
