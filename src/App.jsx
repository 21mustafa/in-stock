import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import WarehouseList from "./pages/WarehouseList/WarehouseList";
import WarehouseDetails from "./pages/WarehouseDetails/WarehouseDetails";
import WarehouseEdit from "./pages/WarehouseEdit/WarehouseEdit";
import WarehouseAdd from "./pages/WarehouseAdd/WarehouseAdd";
import InventoryList from "./pages/InventoryList/InventoryList";
import InventoryDetail from "./pages/InventoryDetail/InventoryDetail";
import InventoryEdit from "./pages/InventoryEdit/InventoryEdit";
import InventoryAdd from "./pages/InventoryAdd/InventoryAdd";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import axios from "axios";

function App() {
  const [warehouseDetails, setWarehouseDetails] = useState();
  const [warehouseList, setWarehouseList] = useState([]);
  const [inventoryList, setInventoryList] = useState([]);

  function selectWarehouse(id) {
    const selectedWarehouse = warehouseDetails.find(
      (warehouse) => warehouse.id === id
    );

    setWarehouseList(selectedWarehouse);
  }

  useEffect(() => {
    void getInventoryList();
    void getWarehouseList();
  }, []);

  const getInventoryList = async () => {
    const response = await axios.get("http://localhost:8080/inventories");
    setInventoryList(response.data);
  };

  const getWarehouseList = async () => {
    const response = await axios.get("http://localhost:8080/warehouses");
    setWarehouseList(response.data);
  };

  const refreshInventory = async () => {
    await getInventoryList();
  };

  const getWarehouse = (id) => {
    return warehouseList.length > 0
      ? warehouseList.find((warehouse) => warehouse.id === id).warehouse_name
      : "";
  };

  return (
    <div className="app">
      <div className="app__background" />
      <BrowserRouter>
        <div className="content">
          <Header />
          <main className="content__main">
            <Routes>
              <Route
                path="/"
                element={<WarehouseList warehouseList={warehouseList} />}
              />
              <Route path="/details" element={<WarehouseDetails />} />
              <Route path="/edit/:id" element={<WarehouseEdit />} />

              <Route path="/add" element={<WarehouseAdd />} />

              <Route
                path="/inventory/list"
                element={
                  <InventoryList
                    inventoryList={inventoryList}
                    getWarehouse={getWarehouse}
                    refreshInventory={refreshInventory}
                  />
                }
              />
              <Route
                path="/inventory/detail/:id"
                element={
                  <InventoryDetail
                    inventoryList={inventoryList}
                    getWarehouse={getWarehouse}
                  />
                }
              />
              <Route
                path="/inventory/edit/:id"
                element={<InventoryEdit inventoryList={inventoryList} />}
              />
              <Route path="/inventory/add" element={<InventoryAdd />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
