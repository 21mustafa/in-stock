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

  const getInventoryList = async () => {
    const response = await axios.get("http://localhost:8080/inventories");
    setInventoryList(response.data);
  };

  const getWarehouseList = async () => {
    const response = await axios.get("http://localhost:8080/warehouses");
    setWarehouseList(response.data);
  };

  useEffect(() => {
    void getInventoryList();
    void getWarehouseList();
  }, []);

  function selectWarehouse(id) {
    const selectedWarehouse = warehouseList.find(
      (warehouse) => warehouse.id === id
    );
    setWarehouseList(selectedWarehouse);
  }

  const refreshInventory = async () => {
    await getInventoryList();
  };

  const refreshWarehouseList = async () => {
    await getWarehouseList();
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
                element={
                  <WarehouseList
                    warehouseList={warehouseList}
                    refreshWarehouseList={refreshWarehouseList}
                  />
                }
              />
              <Route
                path="/details/:id"
                element={
                  <WarehouseDetails refreshInventory={refreshInventory} />
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <WarehouseEdit refreshWarehouseList={refreshWarehouseList} />
                }
              />
              <Route
                path="/add"
                element={
                  <WarehouseAdd refreshWarehouseList={refreshWarehouseList} />
                }
              />
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
                element={
                  <InventoryEdit
                    inventoryList={inventoryList}
                    refreshInventory={refreshInventory}
                  />
                }
              />
              <Route
                path="/inventory/add"
                element={<InventoryAdd />}
                refreshInventory={refreshInventory}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
